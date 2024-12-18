const express = require("express");
const cors = require("cors");
const cronParser = require("cron-parser");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/parse-cron", (req, res) => {
  const { cronExpression } = req.body;

  try {
    const interval = cronParser.parseExpression(cronExpression);
    const nextExecutions = [];
    
    for (let i = 0; i < 5; i++) {
      nextExecutions.push(interval.next().toString());
    }

    res.json({ message: "Valid cron expression", nextExecutions });
  } catch (error) {
    res.status(400).json({ error: "Invalid cron expression" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
