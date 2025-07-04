const decodeHtmlEntities = (str) => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = str;
  return textarea.value;
};

const formatQuestions = ({ results: questions }) => {
  return questions.map((q, index) => {
    const decodedCorrect = decodeHtmlEntities(q.correct_answer);
    const decodedIncorrects = q.incorrect_answers.map(decodeHtmlEntities);
    const allAlternatives = [...decodedIncorrects];

    // Insert the correct answer at a random index (including the last position)
    const randomIndex = Math.floor(Math.random() * (allAlternatives.length + 1));
    allAlternatives.splice(randomIndex, 0, decodedCorrect);

    return {
      id: index + 1,
      question: decodeHtmlEntities(q.question),
      alternatives: allAlternatives,
      answer: decodedCorrect,
    };
  });
};

export default formatQuestions;

// FORMAT
//    {
//     id: 1,
//     question: "What is the capital of France?",
//     alternatives: ["Berlin", "Paris", "Madrid"],
//     answer: "Paris",
//   },
