import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import Quiz from "./components/Quiz";
import QuizResult from "./components/QuizResult";
import "./index.css";
import ChooseQuestions from "./components/ChooseQuestions";
import formatQuestions from "./formatQuestions";

const QUESTIONS_API = "https://opentdb.com/api.php?amount=10";

function App() {
  const [questionsType, setQuestionsType] = useState(null);
  const [customQuestions, setCustomQuestions] = useState([]);
  const [questionTypeIsSelected, setQuestionTypeIsSelected] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [seeResult, setSeeResult] = useState(false);
  const [score, setScore] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const resetQuiz = () => {
    setQuestionsType(null);
    setQuestionTypeIsSelected(false);
    setCustomQuestions([]);
    setQuizQuestions([]);
    setSeeResult(false);
    setScore({});
    setIsLoading(true);
  };

  const decideQuestionType = () => {
    if (questionsType === "custom") {
      setQuizQuestions(customQuestions);
      setIsLoading(false);
    } else {
      fetchRandomQuestions();
    }
    setQuestionTypeIsSelected(true);
  };

  const fetchRandomQuestions = async () => {
    try {
      const res = await fetch(QUESTIONS_API);
      if (!res.ok) throw new Error("Error fetching random questions");
      const data = await res.json();
      const formattedQuestions = formatQuestions(data);
      setQuizQuestions(formattedQuestions);
    } catch (error) {
      console.error("Error while fetching random questions. ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (questionsType) {
      decideQuestionType();
    }
  }, [questionsType]);

  return (
    <>
      {!questionTypeIsSelected && (
        <ChooseQuestions setCustomQuestions={setCustomQuestions} setQuestionsType={setQuestionsType} />
      )}
      {questionTypeIsSelected && seeResult && (
        <QuizResult setSeeResult={setSeeResult} score={score} resetQuiz={resetQuiz} />
      )}
      {questionTypeIsSelected && !seeResult ?
        isLoading ?
          <HashLoader className="mx-auto mt-50" color="#615fff" size={120} />
        : <Quiz setSeeResult={setSeeResult} qList={quizQuestions} setScore={setScore} resetQuiz={resetQuiz} />
      : null}
    </>
  );
}

export default App;
