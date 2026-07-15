const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.CEREBRAS_API_KEY,
  baseURL: process.env.CEREBRAS_BASE_URL,
});

module.exports = client;