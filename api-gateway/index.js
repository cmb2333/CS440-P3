const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const QUIZ_SERVICE_URL = "http://quiz-management:3001";
const RESPONSE_SERVICE_URL = "http://user-response:3002";
const MODIFICATION_SERVICE_URL = "http://quiz-modification:3003";

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${QUIZ_SERVICE_URL}/questions`);
    const questions = response.data.questions;
    res.render("index", { questions, score: null, feedback: null, turnedIn: false });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).send("Error fetching questions.");
  }
});

app.post("/", async (req, res) => {
  try {
    const userAnswers = req.body;
    const response = await axios.post(`${RESPONSE_SERVICE_URL}/evaluate`, userAnswers);
    const { score, feedback } = response.data;
    res.render("index", { questions: feedback.questions, score, feedback: feedback.details, turnedIn: true });
  } catch (error) {
    console.error("Error evaluating answers:", error);
    res.status(500).send("Error evaluating answers.");
  }
});

app.get("/addQuestion", (req, res) => {
  res.render("addQuestion");
});

app.post("/addQuestion", async (req, res) => {
  try {
    await axios.post(`${MODIFICATION_SERVICE_URL}/questions`, req.body);
    res.redirect("/");
  } catch (error) {
    console.error("Error adding question:", error);
    res.status(500).send("Error adding question.");
  }
});

app.listen(3000, () => {
  console.log("API Gateway started on port 3000");
});
