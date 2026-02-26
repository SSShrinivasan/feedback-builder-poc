const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true
}));
const uri = "mongodb+srv://311822104041_db_user:AwUDb1gba4jfHAKa@cluster0.clpetmi.mongodb.net/feedbacksurvey";
mongoose.connect(uri)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.log("Connection error:", err));

const feedbackSchema = new mongoose.Schema({
  feedbackQuestion: String,
  positive: String,
  negative: String,
  ratingType: String,
  selectedRating: Number,

  feedbackTiming: {
    type: {
      type: String
    }
  },

  preview: {
    spent: String,
    date: String,
    time: String
  },

  categories: [
    {
      name: String,
      selected: Boolean
    }
  ],

  askCustomers: {
    options: [
      {
        name: String,
        selected: Boolean
      }
    ]
  },

  reward: {
    enabled: Boolean,
    points: Number
  }

}, { timestamps: true });
const Feedback = mongoose.model("Feedback", feedbackSchema);

// app.post("/feedback", async (req, res) => {
//   try {
//     console.log("======= RECEIVED JSON =======");
//     console.log(JSON.stringify(req.body, null, 2));
//     console.log("=============================");

//     const newFeedback = await Feedback.create(req.body);

//     res.status(201).json({
//       message: "Feedback saved successfully",
//       data: newFeedback
//     });

//   } catch (error) {
//     console.error("Save error:", error);
//     res.status(500).json({ error: error.message });
//   }
// });
app.post("/feedback", async (req, res) => {
  try {
        console.log("======== INCOMING REQUEST ========");
    console.log("Body:", JSON.stringify(req.body, null, 2));
    console.log("==================================");
    const { _id, ...data } = req.body;

    let feedback;

    if (_id) {
      // Update existing document
      feedback = await Feedback.findOneAndUpdate(
        { _id },
        { $set: data },
        { returnDocument: "after" }
      );
    } else {
      // Create new document
      feedback = await Feedback.create(data);
    }

    res.status(200).json(feedback);
    console.log("Sending ID:", storedId);

  } catch (err) {
    console.error("Feedback save error:", err);
    res.status(500).json({ error: err.message });
  }
});
app.post("/api/data-packet", (req, res) => {
  const { whatsapp, sms, email } = req.body;

  console.log("WhatsApp:", whatsapp);
  console.log("SMS:", sms);
  console.log("Email:", email);

  // if (!whatsapp && !sms && !email) {
  //   return res.status(400).json({
  //     message: "At least one contact method is required"
  //   });
  // }

  res.status(200).json({
    message: "Data received successfully",
    data: { whatsapp, sms, email }
  });
});
app.post("/api/feedback-channels", async (req, res) => {
  const { whatsapp, sms, email } = req.body;

  console.log("WhatsApp:", whatsapp);
  console.log("SMS:", sms);
  console.log("Email:", email);

  if (!whatsapp) {
    return res.status(400).json({
      message: "WhatsApp number is required"
    });
  }

  try {
    const response = await axios.post(
      `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: whatsapp,
        type: "text",
        text: {
          body: "Here is your feedback link: https://yourlink.com"
        }
      },
      {
        headers: {
          Authorization: `Bearer ${WHATSAPP_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.status(200).json({
      success: true,
      message: "WhatsApp sent successfully",
      metaResponse: response.data
    });

  } catch (error) {
    console.error("Meta Error:", error.response?.data);

    res.status(500).json({
      success: false,
      error: error.response?.data || error.message
    });
  }
});
//Send mail using amazon email service
const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

app.post("/api/send-email", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const params = {
    Source: "yourverifiedemail@yourdomain.com", // must be verified in SES
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Subject: {
        Data: "Your Feedback Link",
      },
      Body: {
        Text: {
          Data: "Here is your feedback link: https://yourlink.com",
        },
      },
    },
  };

  try {
    const command = new SendEmailCommand(params);
    const response = await sesClient.send(command);

    res.status(200).json({
      success: true,
      messageId: response.MessageId,
    });
  } catch (error) {
    console.error("SES Error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
  //sms using msg91
const MSG91_AUTH_KEY = "YOUR_MSG91_AUTH_KEY";
const SENDER_ID = "YOUR_SENDER_ID"; // example: ABCDEF
const TEMPLATE_ID = "YOUR_DLT_TEMPLATE_ID";

app.post("/api/send-sms", async (req, res) => {
  const { sms } = req.body;

  if (!sms) {
    return res.status(400).json({ message: "SMS number is required" });
  }

  try {
    const response = await axios.post(
      "https://control.msg91.com/api/v5/flow/",
      {
        template_id: TEMPLATE_ID,
        short_url: "0",
        recipients: [
          {
            mobiles: sms, // format: 919876543210
            var1: "https://yourlink.com"
          }
        ]
      },
      {
        headers: {
          authkey: MSG91_AUTH_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    res.status(200).json({
      success: true,
      msg91Response: response.data
    });

  } catch (error) {
    console.error("MSG91 Error:", error.response?.data);
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message
    });
  }
  }); 

app.listen(5000, () => {
  console.log("Server running on port 5000");
});