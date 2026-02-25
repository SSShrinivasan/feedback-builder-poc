import '../pages/FeedbackPage.css';
import { GripVertical, Check } from "lucide-react";
import { useState } from "react";
export default function FeedbackPage2({
  data,
  onNext,
  onBack
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
  const [items, setItems] = useState([
  { name: "Food", selected: true },
  { name: "Service", selected: true },
  { name: "Ambience", selected: true },
  { name: "Cleanliness", selected: true },
  { name: "Value for money", selected: true }
]);

  const ratingArray =
    data.ratingType === "emoji" ? emojiList : digitList;
    // Toggle category selection
  const toggleCategory = (index) => {
    const updated = [...items];
    updated[index].selected = !updated[index].selected;
    setItems(updated);
  };

  // Add new category
  const addCategory = () => {
    setItems([
      ...items,
      { name: `New Category ${items.length + 1}`, selected: true }
    ]);
  };
  const handleSubmit = async () => {
  try {
    const fullPayload = {
      ...data,
      categories: items   // include items here
    };

    console.log("Sending JSON:");
    console.log(JSON.stringify(fullPayload, null, 2));

    await fetch("http://localhost:5000/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(fullPayload)
    });

    onNext();

  } catch (err) {
    console.error("Error:", err);
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
        <div className="form-section">

      <h2>Choose the categories for feedback rating</h2>
      <p className="subtitle">
        After your customer gives their rating, they will be asked to
        choose the reason from these categories.
      </p>

      <div className="category-box">
        {items.map((cat, index) => (
          <div key={index} className="category-row">
            <div className="category-left">
              <GripVertical size={18} />
              <span>{cat.name}</span>
            </div>

            <div
              className={`check-box ${cat.selected ? "active" : ""}`}
              onClick={() => toggleCategory(index)}
            >
              {cat.selected && <Check size={16} />}
            </div>
          </div>
        ))}
      </div>

      <button className="add-btn" onClick={addCategory}>
        + Add More
      </button>
      <button onClick={handleSubmit}>3Next</button>
      <button onClick={onNext}> Next</button>
    </div>
      </div>
  );
}