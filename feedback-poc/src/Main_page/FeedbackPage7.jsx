import "../pages/FeedbackPage.css";
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsChatDots } from "react-icons/bs";
import { useState } from "react";

export default function FeedbackPage7({ onNext }) {

  const [channels, setChannels] = useState({
    whatsapp: {
      enabled: true,
      number: ""
    },
    sms: {
      enabled: true,
      number: ""
    },
    email: {
      enabled: true,
      address: ""
    }
  });
  const handleSubmit = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/feedback-channels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        whatsapp: channels.whatsapp.number,
        sms: channels.sms.number,
        email: channels.email.address
      })
    });

    const data = await response.json();
    console.log(data);

    onNext(); // move to next page after success
  } catch (error) {
    console.error("Error:", error);
  }
};

  // Toggle enabled state
  const toggleChannel = (type) => {
    setChannels((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        enabled: !prev[type].enabled
      }
    }));
  };

  // Handle input changes
  const handleInputChange = (type, value) => {
    setChannels((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        ...(type === "email"
          ? { address: value }
          : { number: value })
      }
    }));
  };

  return (
    <div className="container">

      {/* LEFT PREVIEW */}
      <div className="preview-card">
        <div className="top-card">
          <h3>Share your feedback link</h3>
        </div>

        <p className="question">Selected Channels:</p>

        <ul>
          {Object.entries(channels)
            .filter(([_, value]) => value.enabled)
            .map(([key]) => (
              <li key={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </li>
            ))}

          {Object.values(channels).every(
            (channel) => !channel.enabled
          ) && <li>No channels selected</li>}
        </ul>
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="form-section">
        <div className="external-card">

          <div className="external-header">
            <h3>External Link</h3>
            <p>
              Capture feedback through a link sent on Whatsapp,
              SMS or Email
            </p>
          </div>

          {/* WhatsApp */}
          <div className="channel-card">
            <div className="channel-left">
              <FaWhatsapp className="icon whatsapp" />
              <span>Whatsapp Utility</span>
            </div>

            <input
              type="checkbox"
              checked={channels.whatsapp.enabled}
              onChange={() => toggleChannel("whatsapp")}
            />
          </div>

          {channels.whatsapp.enabled && (
            <input
              type="text"
              placeholder="Enter WhatsApp number"
              value={channels.whatsapp.number}
              onChange={(e) =>
                handleInputChange("whatsapp", e.target.value)
              }
            />
          )}

          {/* SMS */}
          <div className="channel-card">
            <div className="channel-left">
              <BsChatDots className="icon" />
              <span>SMS</span>
            </div>

            <input
              type="checkbox"
              checked={channels.sms.enabled}
              onChange={() => toggleChannel("sms")}
            />
          </div>

          {channels.sms.enabled && (
            <input
              type="text"
              placeholder="Enter SMS number"
              value={channels.sms.number}
              onChange={(e) =>
                handleInputChange("sms", e.target.value)
              }
            />
          )}

          {/* Email */}
          <div className="channel-card">
            <div className="channel-left">
              <MdEmail className="icon" />
              <span>Email</span>
            </div>

            <input
              type="checkbox"
              checked={channels.email.enabled}
              onChange={() => toggleChannel("email")}
            />
          </div>

          {channels.email.enabled && (
            <input
              type="email"
              placeholder="Enter email address"
              value={channels.email.address}
              onChange={(e) =>
                handleInputChange("email", e.target.value)
              }
            />
          )}

        </div>
        <button onClick={handleSubmit}>Next</button>

        {/* <button onClick={onNext}>Next</button> */}
      </div>
    </div>
  );
}