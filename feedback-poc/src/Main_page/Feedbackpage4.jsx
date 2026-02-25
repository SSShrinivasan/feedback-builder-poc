import '../pages/FeedbackPage.css';
import { GripVertical, Check } from "lucide-react";
import { useState } from "react";
export default function FeedbackPage4({
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
    const [rewardEnabled, setRewardEnabled] = useState(false);
  const [points, setPoints] = useState(100);
  const handleSubmit = async () => {
  const feedback = {
    reward: {
      enabled: rewardEnabled,
      points: Number(points)
    }
  };

  console.log("Sending reward JSON:");
  console.log(JSON.stringify(feedback, null, 2));

  await fetch("http://localhost:5000/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(feedback)
  });

  console.log("Sent successfully");
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
       
          <button onClick={onNext}> Next</button>
          <h2>Now, let's give your customers a reward for sharing feedback</h2>

      <div className="reward-box">

        {/* Toggle */}
        <div className="reward-header">
          <h4>Feedback Reward</h4>

          <label className="switch">
            <input
              type="checkbox"
              checked={rewardEnabled}
              onChange={() => setRewardEnabled(!rewardEnabled)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <p className="reward-sub">
          Reward to your customers when they share feedback with you
        </p>

        {/* Points Input */}
        <input
          type="number"
          value={points}
          disabled={!rewardEnabled}
          onChange={(e) => setPoints(e.target.value)}
          className="points-input"
        />

        {/* Dynamic Message */}
        {rewardEnabled && (
          <div className="reward-message">
            🎁 {points} points are awarded to your account
          </div>
        )}

        {!rewardEnabled && (
          <div className="reward-disabled">
            You need to activate loyalty to give bonus points reward for feedback
          </div>
        )}
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onNext}> Next</button>
      </div>
        </div>
      </div>
  );
}