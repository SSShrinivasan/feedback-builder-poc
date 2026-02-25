import { useState } from "react";
import FeedbackPage from "./Main_page/FeedbackPage";
import FeedbackPage2 from "./Main_page/Feedbackpage2";
import FeedbackPage3 from "./Main_page/Feedbackpage3";
import FeedbackPage4 from "./Main_page/Feedbackpage4";
import FeedbackPage5 from "./Main_page/Feedbackpage5";
import FeedbackPage6 from "./Main_page/Feedbackpage6";

function App() {
  const [data, setData] = useState({
    feedbackQuestion: "How was your experience?",
    positive: "Glad to hear that. What did you like?",
    negative: "Sorry to hear. Tell us what went wrong?",
    ratingType: "digit",
    selectedRating: null,
    feedbackTiming: { type: "instant" },
    preview: {
      spent: "₹ 3400",
      date: "02 July 2023",
      time: "12:40 PM"
    }
  });

  const stepMap = {
    1: FeedbackPage,
    2: FeedbackPage2,
    3: FeedbackPage3,
    4: FeedbackPage4,
    5: FeedbackPage5,
    6: FeedbackPage6,
  };

  const totalSteps = Object.keys(stepMap).length;

  const [step, setStep] = useState(1);

  const next = () => {
    setStep(prev => Math.min(prev + 1, totalSteps));
  };

  const prev = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const CurrentComponent = stepMap[step];

  return (
    <div>
      <CurrentComponent
        data={data}
        setData={setData}
        onNext={next}
        onBack={prev}
      />
    </div>
  );
}

export default App;