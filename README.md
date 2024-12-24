# Cron Expression Parser and Scheduler

This project is a web-based tool that helps users parse and understand cron expressions. Built with a **Node.js** backend and a **Vue.js** frontend, it allows users to input a cron expression and view the next 5 execution times. 

## Features

- Parse cron expressions to determine their validity.
- View the next 5 execution times for valid cron expressions.
- User-friendly interface built with **Vue.js** and styled with **Tailwind CSS**.
- Backend powered by **Node.js** and the `cron-parser` library.

## Project Structure

```
cron-expression-parser/
├── backend/
│   ├── server.js        # Node.js backend code
│   ├── package.json     # Backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── App.vue      # Vue.js main component
│   │   ├── main.js      # Vue app initialization
│   ├── package.json     # Frontend dependencies
│
├── README.md            # Project documentation
```

---

## Getting Started

### Prerequisites

- **Node.js**: Install the latest version from [Node.js Official Site](https://nodejs.org/).
- **npm**: Installed automatically with Node.js.

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/cron-expression-parser.git
   cd cron-expression-parser
   ```

2. Set up the backend:
   ```bash
   cd backend
   npm install
   node server.js
   ```
   - The backend server will start on `http://localhost:3000`.

3. Set up the frontend:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
   - The frontend will start on `http://localhost:5173`.

---

## Usage

1. Navigate to the frontend in your browser (`http://localhost:5173`).
2. Enter a cron expression (e.g., `*/5 * * * *`).
3. Click **Parse Expression** to view the next 5 execution times.
4. If the expression is invalid, an error message will be displayed.

---

## Backend Code

The backend is built with **Express.js** and `cron-parser`. It provides a POST endpoint `/parse-cron` to parse the expression.

Example code snippet:

```javascript
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

app.listen(3000, () => {
  console.log("Backend running at http://localhost:3000");
});
```

---

## Frontend Code

The frontend is built with **Vue.js** and styled using **Tailwind CSS**. It includes a simple form to input cron expressions and displays results dynamically.

Example template snippet:

```vue
<template>
  <div>
    <input v-model="cronExpression" type="text" placeholder="* * * * *" />
    <button @click="parseCron">Parse Expression</button>
    <div v-if="errorMessage">{{ errorMessage }}</div>
    <ul v-if="nextExecutions.length">
      <li v-for="(execution, index) in nextExecutions" :key="index">{{ execution }}</li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      cronExpression: "",
      nextExecutions: [],
      errorMessage: "",
    };
  },
  methods: {
    async parseCron() {
      try {
        const response = await axios.post("http://localhost:3000/parse-cron", { cronExpression: this.cronExpression });
        this.nextExecutions = response.data.nextExecutions;
      } catch (error) {
        this.errorMessage = error.response?.data?.error || "Invalid cron expression.";
      }
    },
  },
};
</script>
```

---

## Extending the Project

Here are some ideas to extend this project:

1. **Human-readable Descriptions**:
   - Convert cron expressions into natural language (e.g., "Every 5 minutes").

2. **Integration with Task Schedulers**:
   - Use the backend to schedule actual tasks (e.g., reminders or emails).

3. **Improved Validation**:
   - Add frontend validation for cron expressions before sending them to the backend.

4. **Styling Enhancements**:
   - Use a modern design system like Vuetify or Bootstrap for advanced UI components.

---
