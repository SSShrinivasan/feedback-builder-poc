// export default function FeedbackPage6({ data, onNext }) {
//   return (
//     <div className="container">

//       {/* LEFT SIDE - MOCKUP */}
//       <div className="preview-card whatsapp-preview">
//         <img
//           src="https://app.reelo.io/assets/images/mockups/whatsapp.png"
//           alt="WhatsApp Preview"
//           className="whatsapp-image"
//         />
//       </div>
//       <h2>tesiuntg</h2>

//       {/* RIGHT SIDE - EMPTY FOR NOW */}
//       <div className="form-section">
//         <h2>Next, let's decide how to collect feedback</h2>

//         <div className="placeholder-box">
//           {/* You will build this later */}
//         </div>
//       </div>
//       <server>
//         console.log("Page 6 rendering");
//       </server>
      


//     </div>
//   );
// }
import "../pages/FeedbackPage.css";
import { useState, useEffect } from "react";
import { Gift, Wallet, Clock } from "lucide-react";

export default function FeedbackPage6({ data, onNext }) {

  const [timing, setTiming] = useState(() => {
    const saved = localStorage.getItem("feedbackTiming");
    return saved ? JSON.parse(saved) : "instant";
  });
  console.log("Page 6 rendering");

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
