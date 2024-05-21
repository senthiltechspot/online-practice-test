import React from "react";

const Question = ({ currentQuestion, currentQuestionIndex, questions, answers, handleOptionSelect, handleNextQuestion, handlePreviousQuestion, handleSubmit }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 mt-2 w-full">
      <h3 className="text-2xl font-bold mb-6 text-center">
        Question {currentQuestionIndex + 1}/{questions.length}
      </h3>
      <h3 className="text-2xl font-bold text-center">
        {currentQuestion.questionText}
      </h3>
      <p className="text-md font-bold text-center mb-4">Tags : {currentQuestion.tags}</p>
      <div className="w-full">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            className={`${
              answers.find(
                (answer) => answer.questionId === currentQuestion._id
              )?.selectedOptionId === option._id
                ? "bg-blue-900"
                : "bg-blue-500"
            } hover:bg-blue-700 text-white font-bold py-4 px-4 text-3xl rounded-lg w-full mb-2`}
            onClick={() => handleOptionSelect(currentQuestion._id, option._id)}
          >
            {option.text}
          </button>
        ))}
      </div>
      <div>
      </div>
      <div className="flex justify-between w-full mt-4">
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 text-3xl rounded-lg ${
            currentQuestionIndex === 0 ? "invisible" : ""
          }`}
          onClick={handlePreviousQuestion}
        >
          Back
        </button>
        {currentQuestionIndex < questions.length - 1 ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 text-3xl rounded-lg"
            onClick={handleNextQuestion}
          >
            Next
          </button>
        ) : (
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-4 text-3xl rounded-lg"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Question;
