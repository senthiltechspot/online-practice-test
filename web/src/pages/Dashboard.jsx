import React, { useEffect, useState } from "react";
import { baseAPI } from "../App";
import Question from "../Components/Quizz/Question";
import ScoreView from "../Components/Quizz/ScoreView";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scoreData, setScoreData] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const res = await baseAPI.get("user/details");
      setUserData(res.data);
    };
    getUser();
  }, []);

  const getQuestions = async () => {
    const res = await baseAPI.get("quiz/start");
    setQuestions(res.data);
    setCurrentQuestionIndex(0);
  };
  const handleOptionSelect = (questionId, selectedOptionId) => {
    const updatedAnswers = [...answers];
    const answerIndex = updatedAnswers.findIndex(
      (answer) => answer.questionId === questionId
    );
    if (answerIndex > -1) {
      updatedAnswers[answerIndex] = { questionId, selectedOptionId };
    } else {
      updatedAnswers.push({ questionId, selectedOptionId });
    }
    setAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await baseAPI.post("quiz/evaluate", { answers });
      console.log("Response:", res.data);
      setScoreData(res.data);
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setScoreData(null);
  };

  const goHome = () => {
    // clear all questions and answers and go back to dash
    setCurrentQuestionIndex(null);
    setAnswers([]);
    setScoreData(null);
  };

  return (
    <div className="bg-white flex flex-col justify-center items-center p-8 rounded-lg shadow-lg w-full max-w-[77%] min-h-[77vh]">
      {!currentQuestion && (
        <>
          <h3 className="text-2xl font-bold mb-6 text-center">Dashboard</h3>
          <h3 className="text-2xl font-bold mb-6 text-center">
            Welcome {userData?.name}
          </h3>
          <h3 className="text-2xl mb-6 text-center">
            Your Registered email is {userData?.email}
          </h3>
          <img
            src="https://t3.ftcdn.net/jpg/03/45/97/36/360_F_345973621_sMifpCogXNoIDjmXlbLwx1QZA5ZmQVl8.jpg"
            alt=""
            className="h-1/3 rounded-lg"
          />
          <div className="flex flex-col justify-center items-center gap-2 mt-2">
            <h3 className="text-2xl font-bold mb-6 text-center">
              To Start the Quiz click below
            </h3>
            <button
              onClick={getQuestions}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 text-3xl rounded-lg w-full"
            >
              Start
            </button>
          </div>
        </>
      )}
      {currentQuestion && !scoreData && (
        <Question
          currentQuestion={currentQuestion}
          currentQuestionIndex={currentQuestionIndex}
          questions={questions}
          answers={answers}
          handleOptionSelect={handleOptionSelect}
          handleNextQuestion={handleNextQuestion}
          handlePreviousQuestion={handlePreviousQuestion}
          handleSubmit={handleSubmit}
        />
      )}

      {scoreData && (
        <ScoreView questions={questions} scoreData={scoreData} restartQuiz={restartQuiz} goHome={goHome} />
      )}
    </div>
  );
};

export default Dashboard;
