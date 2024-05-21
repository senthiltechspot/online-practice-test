import Question from "../models/question.js";

// Start Quiz
const startQuiz = async (req, res) => {
  try {
    // Fetch 20 random questions for demonstration
    const questions = await Question.find().limit(20);

    // Remove 'isCorrect' property from options in the response
    const sanitizedQuestions = questions.map((question) => {
      return {
        ...question._doc,
        options: question.options.map((option) => ({
          text: option.text,
          _id: option._id,
        })),
      };
    });

    res.json(sanitizedQuestions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Evaluate Quiz
const evaluateQuiz = async (req, res) => {
  const { answers } = req.body;
  let score = 0;
  let recommendations = [];

  try {
    // Fetch questions relevant to the provided answers
    const questions = await Question.find();
    if (!questions.length > 0) {
      return res.status(404).json({ msg: "Question not found" });
    }

    // Create a map of question IDs to their corresponding questions for easy lookup
    const questionMap = new Map(
      questions.map((question) => [question._id.toString(), question])
    );

    for (const answer of answers) {
      const question = questionMap.get(answer.questionId);

      const selectedOption = question.options.find(
        (option) => option._id.toString() === answer.selectedOptionId.toString()
      );

      if (selectedOption && selectedOption.isCorrect) {
        score ++;
      } else {
        recommendations.push(`Review topic: ${question.tags.join(", ")}`);
      }
    }

    res.json({
      score,
      total: answers.length,
      recommendations,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export { startQuiz, evaluateQuiz };
