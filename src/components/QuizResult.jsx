const QuizResult = ({ setSeeResult, score }) => {
  return (
    <div className="flex text-center flex-col bg-indigo-100 shadow-[0_0_20px_rgba(99,102,241,0.8)] mx-auto px-3 py-6 md:px-10 md:py-8 mt-20 rounded-xl w-[min(90%,700px)] h-[min(auto,700px)]">
      <h1 className="text-5xl tracking-tight mb-5 text-gradient">RESULT</h1>
      <hr className="h-0.5 bg-black border-0 rounded-2xl" />
      <h3 className="font-bold mt-5 text-3xl md:text-4xl tracking-tight">
        Score:{" "}
        <span>
          {score.correct} / {score.total}
        </span>
      </h3>
      {score.wrongAnswers.length !== 0 ?
        <div>
          <h3 className=" mt-10 mb-[-10px] text-2xl md:text-3xl">Wrong answers:</h3>
          <div className="w-full flex justify-center">
            <div className="grid grid-cols-2 w-full text-start place-items-start gap-x-4 mt-6">
              {score.wrongAnswers.map((wrong, index) => (
                <div
                  key={`row-${index}`}
                  className={`col-span-2 grid grid-cols-2 w-full rounded-md px-2 py-1 ${index % 2 === 0 ? "bg-gray-300" : ""}`}
                >
                  <div className="text-[calc(0.5rem+1.2vw)] md:text-[1.2rem]">
                    <span className="font-bold">{score.wrongQuestionNumbers[index] + 1}. ❌</span> {wrong}
                  </div>
                  <div className="text-end text-[calc(0.5rem+1.2vw)] md:text-[1.2rem]">
                    {score.correctAnswers[index]} ✅
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      : <div className="text-5xl mt-6">🎉</div>}
      <button onClick={() => setSeeResult(false)} className="button mt-10 md:text-2xl">
        Play Again
      </button>
    </div>
  );
};

export default QuizResult;
