const express = require("express");

const app = express();
app.use(express.json());

app.post("/evaluate", (req, res) => {
  const { questions, answers } = req.body;
  const feedback = questions.map(question => {
    const correctAnswer = question.QuestionAnswers.find(a => a.Correct);
    const userAnswer = answers[question._id];
    return {
      question: question.Question,
      correctAnswer: correctAnswer.Answer,
      userAnswer,
      isCorrect: correctAnswer.Answer === userAnswer,
    };
  });

  const score = feedback.filter(fb => fb.isCorrect).length;
  res.json({ score, feedback: { questions, details: feedback } });
});

app.listen(3002, () => {
  console.log("User Response Service started on port 3002");
});
