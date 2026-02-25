import '../pages/FeedbackPage.css';


export default function FeedbackPage({ data, setData,onNext }) {
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
  const handleSubmit = async () => {
  console.log("Sending data to backend:", data);
  // console.log("Sending ID:", storedId);

  try {
    const response = await fetch("http://localhost:5000/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log("Server response:", result);

    onNext();
  } catch (err) {
    console.error("Error:", err);
  }
};
  const ratingArray =
    data.ratingType === "emoji" ? emojiList : digitList;

  return (
    <div className="container">
      
      {/* LEFT PREVIEW */}
      <div className="preview-card">
        <div className="top-card">
          <h3>Hi John, your feedback is important to us!</h3>

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

        <div className="emoji-row">
          {ratingArray.map((item, index) => (
            <img
              key={index}
              src={item}
              alt="rating"
              className={data.selectedRating === index ? "active" : ""}
            />
          ))}
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="form-section">

        <label>Feedback Question</label>
        <input
          value={data.feedbackQuestion}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              feedbackQuestion: e.target.value
            }))
          }
        />

        <label>Rating Type</label>
        <div className="toggle">
          <button
            onClick={() =>
              setData(prev => ({
                ...prev,
                ratingType: "emoji"
              }))
            }
          >
            Emoji
          </button>

          <button
            onClick={() =>
              setData(prev => ({
                ...prev,
                ratingType: "digit"
              }))
            }
          >
            Digit
          </button>
        </div>

        <div className="emoji-select">
          {ratingArray.map((item, index) => (
            <img
              key={index}
              src={item}
              alt="rating"
              onClick={() =>
                setData(prev => ({
                  ...prev,
                  selectedRating: index
                }))
              }
              className={
                data.selectedRating === index ? "selected" : ""
              }
            />
          ))}
        </div>

        <label>Positive Follow-up</label>
        <input
          value={data.positive}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              positive: e.target.value
            }))
          }
        />

        <label>Negative Follow-up</label>
        <input
          value={data.negative}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              negative: e.target.value
            }))
          }
        />

       
        <button onClick={onNext}> Next</button>
        
      <button onClick={handleSubmit}>2Next</button>

      </div>
    </div>
  );
}
