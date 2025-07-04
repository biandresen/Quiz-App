import { useState } from "react";

const Quiz = ({ setSeeResult, qList, setScore, resetQuiz }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const isDone = currentQuestion === qList.length - 1;

  const handleAnswer = (answer) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: answer }));
  };

  const handlePrevious = () => {
    if (currentQuestion !== 0) {
      setCurrentQuestion((c) => c - 1);
    }
    return;
  };

  const handleNext = () => {
    if (currentQuestion < qList.length - 1) {
      setCurrentQuestion((c) => c + 1);
    }
  };

  const handleSeeResult = () => {
    let score = 0;
    const wrongAnswers = [];
    const correctAnswers = [];
    const wrongQuestionNumbers = [];
    for (let i = 0; i < qList.length; i++) {
      if (qList[i].answer === answers[i]) {
        score++;
      } else {
        wrongAnswers.push(answers[i]);
        correctAnswers.push(qList[i].answer);
        wrongQuestionNumbers.push(i);
      }
    }
    setScore({ correct: score, total: qList.length, wrongAnswers, correctAnswers, wrongQuestionNumbers });
    setSeeResult(true);
  };

  return (
    <div className="relative flex text-center flex-col shadow-[0_0_20px_rgba(99,102,241,0.8)] bg-indigo-100 mx-auto px-3 py-6 md:px-10 md:py-8 mt-10 rounded-xl w-[min(90%,700px)] h-[min(auto,700px)]">
      <h1 className="text-5xl md:text-7xl tracking-tight mb-5 text-gradient">
        QUIZz<span className="text-[2rem] md:text-5xl">z</span>
      </h1>
      <button onClick={resetQuiz} className="x-btn">
        X
      </button>
      <hr className="h-0.5 bg-black border-0 rounded-2xl" />
      <h2 className="font-bold mt-5 text-3xl tracking-tight">Question {currentQuestion + 1}</h2>

      <h3 className="mt-3 text-2xl tracking-tight">{qList[currentQuestion].question}</h3>
      <ul className="flex flex-col gap-3 mt-5">
        {qList[currentQuestion].alternatives.map((alternative, index) => (
          <li key={alternative + index}>
            <button
              onClick={() => handleAnswer(alternative)}
              className={`button text-[calc(1rem+0.5vw)] md:text-2xl w-full ${alternative === answers[currentQuestion] ? "bg-indigo-400 border-2 border-indigo-900" : ""}`}
            >
              {alternative}
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-[calc(1rem+0.5vw)] lg:text-2xl">
        Your answer: <br /> <span className="font-bold">{answers[currentQuestion] || "-"}</span>{" "}
      </p>

      <div className="flex justify-between mt-auto pt-8">
        <button
          onClick={handlePrevious}
          className="button text-[calc(1rem+0.5vw)] lg:text-2xl if-disabled"
          disabled={currentQuestion === 0}
        >
          Previous
        </button>

        {isDone ?
          <button
            onClick={handleSeeResult}
            className="button if-disabled text-[calc(1rem+0.5vw)] lg:text-2xl"
            disabled={!answers[currentQuestion]}
          >
            See Result
          </button>
        : <button
            onClick={handleNext}
            className="button text-[calc(1rem+0.5vw)] lg:text-2xl if-disabled"
            disabled={currentQuestion === qList.length - 1 || !answers[currentQuestion]}
          >
            Next
          </button>
        }
      </div>
    </div>
  );
};

export default Quiz;
