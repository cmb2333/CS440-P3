const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Setup express app
const app = express();
app.use(bodyParser.json());

// Connect to the QuizDB database
mongoose.connect("mongodb://127.0.0.1:27017/QuizDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Admin Quiz DB connected."))
  .catch((err) => console.log("Database connection error:", err));

// Schema and model
const quizAnswersSchema = new mongoose.Schema({
  Answer: String,
  Correct: Boolean
});

const quizQuestionsSchema = new mongoose.Schema({
  Question: String,
  QuestionAnswers: [quizAnswersSchema]
});

const QuizQuestion = mongoose.model("QuizQuestion", quizQuestionsSchema);

// Add new quiz question
app.post("/admin/addQuestion", async (req, res) => {
  try {
    const { question, answers } = req.body;
    const newQuestion = new QuizQuestion({ Question: question, QuestionAnswers: answers });
    await newQuestion.save();
    res.status(201).send(newQuestion);
  } catch (error) {
    res.status(500).send("Error adding question.");
  }
});

// Update quiz question
app.put("/admin/updateQuestion/:id", async (req, res) => {
  try {
    const updatedQuestion = await QuizQuestion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send(updatedQuestion);
  } catch (error) {
    res.status(500).send("Error updating question.");
  }
});

// Delete quiz question
app.delete("/admin/deleteQuestion/:id", async (req, res) => {
  try {
    await QuizQuestion.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send("Error deleting question.");
  }
});

app.listen(3003, () => {
  console.log("Quiz Modification Service running on port 3003");
});
