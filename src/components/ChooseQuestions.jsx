import { useEffect, useState } from "react";

const ChooseQuestions = ({ setCustomQuestions, setQuestionsType }) => {
  const [numOfQuestions, setNumOfQuestions] = useState(0);
  const [allCustomQuestions, setAllCustomQuestions] = useState([]);
  const [isDone, setIsDone] = useState(true);
  const [errorMsg, setErrorMsg] = useState({
    question: false,
    alternatives: false,
    answer: false,
  });

  const [question, setQuestion] = useState("");
  const [alt1, setAlt1] = useState("");
  const [alt2, setAlt2] = useState("");
  const [alt3, setAlt3] = useState("");
  const [answer, setAnswer] = useState("");

  const isValid = !errorMsg.question && !errorMsg.alternatives && !errorMsg.answer;

  const handleAddQuestion = () => {
    if (!isValid) return;
    const alternatives = [alt1, alt2];
    if (alt3.length > 0) alternatives.push(alt3);

    const newQuestion = {
      id: allCustomQuestions.length,
      question,
      alternatives,
      answer,
    };

    setAllCustomQuestions((prev) => [...prev, newQuestion]);
    setNumOfQuestions((n) => n + 1);

    // Clear inputs
    setQuestion("");
    setAlt1("");
    setAlt2("");
    setAlt3("");
    setAnswer("");
  };

  useEffect(() => {
    const alts = alt1 && alt2 ? true : false;
    setErrorMsg({
      question: !question && "Fill in question/statement",
      alternatives: !alts && "Fill in at least 2 alternatives",
      answer: !answer && "Fill in correct answer",
    });
  }, [question, alt1, alt2, answer]);

  return (
    <div className="relative flex text-center flex-col bg-indigo-100 shadow-[0_0_20px_rgba(99,102,241,0.8)] mx-auto px-3 py-6 md:px-10 md:py-8 mt-20 rounded-xl w-[min(90%,700px)] h-[min(auto,700px)]">
      <h1 className="text-5xl lg:text-7xl tracking-tight mb-5 text-gradient">QUIZ</h1>
      <button
        onClick={() => setIsDone(true)}
        className="button bg-transparent py-0.5 px-2 absolute top-1 right-1"
      >
        X
      </button>
      <hr className="h-0.5 bg-black border-0 rounded-2xl" />
      {!isDone && (
        <>
          <h3 className="font-bold text-3xl md:text-4xl tracking-tight my-6">Add Questions:</h3>
          <div className="flex flex-col">
            <p className="error-msg">{errorMsg?.question || ""}</p>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="input-f"
              id="question"
              placeholder="*Question or statement..."
            ></textarea>
            <p className="error-msg">{errorMsg?.alternatives || ""}</p>
            <input
              value={alt1}
              onChange={(e) => setAlt1(e.target.value)}
              className="input-f"
              type="text"
              id="alternative1"
              placeholder="*Alternative 1..."
            />

            <input
              value={alt2}
              onChange={(e) => setAlt2(e.target.value)}
              className="input-f"
              type="text"
              id="alternative2"
              placeholder="*Alternative 2..."
            />

            <input
              value={alt3}
              onChange={(e) => setAlt3(e.target.value)}
              className="input-f"
              type="text"
              id="alternative3"
              placeholder="Alternative 3... (optional)"
            />
            <p className="error-msg">{errorMsg?.answer || ""}</p>
            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="input-f"
              type="text"
              id="answer"
              placeholder="*Correct answer..."
            />
            <p className="text-[calc(0.9rem+0.5vw)] md:text-lg">Created Questions: {numOfQuestions}</p>
          </div>
        </>
      )}
      {isDone ?
        <>
          <button onClick={() => setIsDone(false)} className="button mt-10 md:text-2xl">
            Custom Quiz
          </button>
          <button onClick={() => setQuestionsType("random")} className="button mt-3 md:text-2xl">
            Random Quiz
          </button>
        </>
      : <>
          <button
            onClick={handleAddQuestion}
            className="button mt-10 md:text-2xl if-disabled"
            disabled={!isValid}
          >
            + Add Question
          </button>

          <button
            onClick={() => {
              handleAddQuestion();
              setCustomQuestions(allCustomQuestions);
              setQuestionsType("custom");
            }}
            className="button mt-3 md:text-2xl if-disabled"
            disabled={numOfQuestions <= 0}
          >
            Done
          </button>
        </>
      }
    </div>
  );
};

export default ChooseQuestions;
