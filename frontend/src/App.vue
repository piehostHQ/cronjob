<template>
  <div class="min-h-screen bg-gray-100 text-gray-800 flex flex-col">
    <!-- Header Section -->
    <header class="bg-blue-600 text-white py-4 text-center shadow-lg">
      <h1 class="text-4xl font-bold">Cron Editor</h1>
      <p class="text-lg mt-2 font-light">The simple cron expression editor</p>
    </header>

    <!-- Main Section -->
    <main class="flex-grow flex flex-col items-center justify-start pt-12">
      <!-- Input Area -->
      <div class=" w-full max-w-3xl px-6">
        <div class="bg-white shadow-md rounded-lg p-6">
          <input
            v-model="cronExpression"
            type="text"
            placeholder="* * * * *"
            class="w-full text-center text-2xl font-mono py-4 border-b border-gray-300 focus:outline-none focus:border-blue-500 transition"
          />
          <p class="text-center text-sm text-gray-500 mt-4">
            Enter your cron expression above and click Parse.
          </p>
        
          <button
            @click="parseCron"
            class="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Parse Expression
          </button>
        </div>
      </div>

      <!-- Output Section -->
      <div v-if="errorMessage" class="w-full max-w-3xl px-6 mt-8">
        <div class="bg-red-100 text-red-600 p-4 rounded-lg shadow-md">
          {{ errorMessage }}
        </div>
      </div>

      <div v-if="nextExecutions.length" class="w-full max-w-3xl px-6 mt-8">
        <div class="bg-green-100 text-green-800 p-4 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold mb-2">Next Executions:</h2>
          <ul class="space-y-2">
            <li
              v-for="(execution, index) in nextExecutions"
              :key="index"
              class="font-mono"
            >
              {{ execution }}
            </li>
          </ul>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-4 text-center text-sm">
      Made with ❤️ using Vue.js & Tailwind CSS
    </footer>
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
  this.errorMessage = "";
  this.nextExecutions = [];

  if (!this.cronExpression.trim()) {
    this.errorMessage = "Please enter a cron expression.";
    return;
  }

  try {
    console.log("Sending cron expression:", this.cronExpression); // Debug
    const response = await axios.post("http://localhost:3000/parse-cron", {
      cronExpression: this.cronExpression,
    });
    console.log("Response:", response.data); // Debug
    this.nextExecutions = response.data.nextExecutions;
  } catch (error) {
    console.error("Error response:", error.response); // Debug
    this.errorMessage =
      error.response?.data?.error || "An unexpected error occurred while parsing.";
  }
},
  },
};
</script>

<style>
/* Add any additional custom styles */
body {
  font-family: 'Inter', sans-serif;
}
</style>
