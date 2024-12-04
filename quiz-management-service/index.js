const express = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/QuizDB");

const app = express();
app.use(express.json());

const quizAnswersSchema = new mongoose.Schema({
  Answer: String,
  Correct: Boolean,
});

const quizQuestionsSchema = new mongoose.Schema({
  Question: String,
  QuestionAnswers: [quizAnswersSchema],
});

const quizQuestions = mongoose.model("quizQuestions", quizQuestionsSchema);

app.post("/questions", async (req, res) => {
  const { question, answers } = req.body;
  const newQuestion = new quizQuestions({
    Question: question,
    QuestionAnswers: answers,
  });
  await newQuestion.save();
  res.status(201).send("Question added.");
});

app.listen(3003, () => {
  console.log("Quiz Modification Service started on port 3003");
});
