const express = require("express");
const httpProxy = require("http-proxy");

const app = express();
const apiProxy = httpProxy.createProxyServer();

// Routing to microservices
app.all("/quiz/*", (req, res) => {
  apiProxy.web(req, res, { target: "http://localhost:3001" });
});

app.all("/responses/*", (req, res) => {
  apiProxy.web(req, res, { target: "http://localhost:3002" });
});

app.all("/admin/*", (req, res) => {
  apiProxy.web(req, res, { target: "http://localhost:3003" });
});


app.listen(3000, () => {
  console.log("API Gateway running on port 3000");
});
