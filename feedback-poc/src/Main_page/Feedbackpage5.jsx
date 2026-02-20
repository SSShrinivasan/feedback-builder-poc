import "../pages/FeedbackPage.css";
import { useState, useEffect } from "react";
import { Gift, Wallet, Clock } from "lucide-react";

export default function FeedbackPage5({ data, onNext }) {

  const [timing, setTiming] = useState(() => {
    const saved = localStorage.getItem("feedbackTiming");
    return saved ? JSON.parse(saved) : "instant";
  });

  useEffect(() => {
    localStorage.setItem("feedbackTiming", JSON.stringify(timing));
  }, [timing]);

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

      {/* RIGHT SIDE */}
      <div className="form-section">
        <h2>Decide when you want to ask for feedback</h2>

        {/* Immediate */}
        <div
          className={`timing-card ${timing === "instant" ? "active" : ""}`}
          onClick={() => setTiming("instant")}
        >
          <div className="card-header">
            <div className="icon-box">
              <Gift className="gift-icon" />
            </div>
            <h4>Immediately with purchase</h4>
          </div>
          <p>Select this if customers experience your product/service at payment.</p>
        </div>

        {/* Delay */}
        <div
          className={`timing-card ${timing === "delay" ? "active" : ""}`}
          onClick={() => setTiming("delay")}
        >
          <div className="card-header">
            <div className="icon-box">
              <Wallet className="money-icon" />
            </div>
            <h4>After a delay</h4>
          </div>
          <p>Select this if customers pay first and experience later.</p>
        </div>

        {/* Custom */}
        <div
          className={`timing-card ${timing === "custom" ? "active" : ""}`}
          onClick={() => onNext()}
        >
          
       <button onClick={onNext}> Next</button>
        </div>

      </div>
    </div>
  );
}
