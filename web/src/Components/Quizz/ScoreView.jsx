import React from "react";

const ScoreView = ({ questions, scoreData, restartQuiz, goHome }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 mt-2 w-full">
      <h3 className="text-2xl font-bold mb-6 text-center">
        You have completed the quiz
      </h3>
      <h3 className="text-2xl font-bold mb-6 text-center">
        {scoreData?.message}
      </h3>
      <img
        src="https://media.tenor.com/REoBdf2ztLEAAAAj/check-mark-good.gif"
        alt=""
        className="h-1/3 rounded-lg mb-6"
      />
      <h3 className="text-2xl font-bold mb-6 text-center">
        Your Score is {scoreData?.score} out of {questions.length}
      </h3>

      <button
        onClick={restartQuiz}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 text-3xl rounded-lg w-full"
      >
        Restart Quiz
      </button>

      <button
        onClick={goHome}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 text-3xl rounded-lg w-full"
      >
        Go Home
      </button>
    </div>
  );
};

export default ScoreView;
