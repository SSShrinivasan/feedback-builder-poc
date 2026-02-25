import '../pages/FeedbackPage.css';
import { GripVertical, Check } from "lucide-react";
import { useState } from "react";
export default function FeedbackPage3({
  data,
  onNext,
})
 {
const emojiList = [
    "https://app.reelo.io/assets/images/feedback/emoji/emoji_1.svg",
    "https://app.reelo.io/assets/images/feedback/emoji/emoji_2.svg",
    "https://app.reelo.io/assets/images/feedback/emoji/emoji_3.svg",
    "https://app.reelo.io/assets/images/feedback/emoji/emoji_4.svg",
    "https://app.reelo.io/assets/images/feedback/emoji/emoji_5.svg",
  ];
  


  const digitList = [
    "https://app.reelo.io/assets/icons/digits/digit_1.svg",
    "https://app.reelo.io/assets/icons/digits/digit_2.svg",
    "https://app.reelo.io/assets/icons/digits/digit_3.svg",
    "https://app.reelo.io/assets/icons/digits/digit_4.svg",
    "https://app.reelo.io/assets/icons/digits/digit_5.svg",
  ];
 const [question, setQuestion] = useState("How did you hear about us?");
const [enabled, setEnabled] = useState(true);
const [newOption, setNewOption] = useState("");

const [options, setOptions] = useState([
  { name: "Zomato / Swiggy", selected: true },
  { name: "Social Media", selected: true }
]);
const toggleOption = (index) => {
    const updated = [...options];
    updated[index].selected = !updated[index].selected;
    setOptions(updated);
  };

  const addOption = () => {
    if (newOption.trim() === "") return;

    setOptions([
      ...options,
      { name: newOption, selected: true }
    ]);

    setNewOption("");
  };

const handleSubmit = async () => {
  try {
    const fullPayload = {
      ...data,
      askCustomers: {
        options: options   
      }
    };

    console.log("======== SENDING TO BACKEND ========");
    console.log(JSON.stringify(fullPayload, null, 2));
    console.log("=====================================");

    const response = await fetch("http://localhost:5000/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(fullPayload)
    });

    const result = await response.json();

    console.log("======== BACKEND RESPONSE ========");
    console.log(JSON.stringify(result, null, 2));
    console.log("==================================");

    onNext();

  } catch (err) {
    console.error(" Error submitting:", err);
  }
};

  return (
    <div className="container">
      
      {/* LEFT PREVIEW */}
      <div className="preview-card">
        <div className="top-card">
          <h3>Hi Jsn, your feedback is important to us!</h3>

          <div className="meta">
            <div>
              <p>Spent</p>
              <strong>{data.preview.spent}</strong>
            </div>
            <div>
              <p>Date</p>
              <strong>{data.preview.date}</strong>
            </div>
            <div>
              <p>Time</p>
              <strong>{data.preview.time}</strong>
            </div>
          </div>
        </div>

        <p className="question">{data.feedbackQuestion}</p>

       

      </div>
       {/* RIGHT SIDE FORM */}
      <div className="form-section">

        <h2>Ask your customers</h2>
        <p className="subtitle">
          Select all the options you want to show your customers.
        </p>

        <div className="category-box">
          {options.map((opt, index) => (
            <div key={index} className="category-row">
              <div className="category-left">
                <GripVertical size={18} />
                <span>{opt.name}</span>
              </div>

              <div
                className={`check-box ${opt.selected ? "active" : ""}`}
                onClick={() => toggleOption(index)}
              >
                {opt.selected && <Check size={16} />}
              </div>
            </div>
          ))}
        </div>

        {/* Add Custom Option */}
        <div style={{ marginTop: "15px" }}>
          <input
            type="text"
            placeholder="Enter new option"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
          />

          <button className="add-btn" onClick={addOption}>
            + Add More
          </button>
          <button onClick={onNext}> Next</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>

      </div>
        
      </div>
  );
}