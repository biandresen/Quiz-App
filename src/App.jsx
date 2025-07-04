import { useState } from "react";
import quizQuestions from "./questions";
import Quiz from "./components/Quiz";
import QuizResult from "./components/QuizResult";
import "./index.css";

function App() {
  const [seeResult, setSeeResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: quizQuestions.length });

  return seeResult ?
      <QuizResult setSeeResult={setSeeResult} score={score} />
    : <Quiz setSeeResult={setSeeResult} qList={quizQuestions} setScore={setScore} />;
}

export default App;
