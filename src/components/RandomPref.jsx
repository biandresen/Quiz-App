import { useState } from "react";

const RandomPref = ({ setQuestionsType, setQuestionsApi }) => {
  const [quantity, setQuantity] = useState(5);
  const [category, setCategory] = useState(0);

  const handlePref = () => {
    if (category < 0 || quantity < 0 || quantity > 50) return;

    let api;
    if (category === 0) api = `https://opentdb.com/api.php?amount=${quantity}`;
    else api = `https://opentdb.com/api.php?amount=${quantity}&category=${category}`;

    setQuestionsApi(api);
    setQuestionsType("random");
  };

  return (
    <div className="mt-5 text-start bg-indigo-200 p-5 rounded-xl">
      <h2 className="text-[calc(1rem+0.5vw)] md:text-2xl font-bold text-center">RANDOM SETTINGS</h2>
      <div className="flex flex-col mt-8">
        <label className="font-bold" htmlFor="quantity">
          Number of questions (0-50)
        </label>
        <input
          className="input-f w-full "
          type="number"
          min="0"
          max="50"
          id="quantity"
          onChange={(e) => setQuantity(e.target.value)}
          value={quantity}
        />
        <label className="font-bold mt-[-5px]" htmlFor="category">
          Category
        </label>
        <select
          className="input-f w-full"
          name="category"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="0">Any Category</option>
          <option value="9">General Knowledge</option>
          <option value="10">Entertainment: Books</option>
          <option value="11">Entertainment: Film</option>
          <option value="12">Entertainment: Music</option>
          <option value="13">Entertainment: Musicals & Theatres</option>
          <option value="14">Entertainment: Television</option>
          <option value="15">Entertainment: Video Games</option>
          <option value="16">Entertainment: Board Games</option>
          <option value="17">Science & Nature</option>
          <option value="18">Science: Computers</option>
          <option value="19">Science: Mathematics</option>
          <option value="20">Mythology</option>
          <option value="21">Sports</option>
          <option value="22">Geography</option>
          <option value="23">History</option>
          <option value="24">Politics</option>
          <option value="25">Art</option>
          <option value="26">Celebrities</option>
          <option value="27">Animals</option>
        </select>
        <button
          onClick={handlePref}
          className="button mt-3 text-[calc(1rem+0.5vw)] md:text-2xl animate-bounce"
        >
          Start Random Quiz
        </button>
      </div>
    </div>
  );
};

export default RandomPref;
