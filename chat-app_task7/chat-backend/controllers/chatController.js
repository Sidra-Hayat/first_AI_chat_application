const client = require("../config/aiClient");

exports.chat = async (req, res) => {
  try {
    let { message } = req.body;

    // 1. Check if message exists
    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required."
      });
    }

    // 2. Check if it is a string
    if (typeof message !== "string") {
      return res.status(400).json({
        success: false,
        message: "Message must be a string."
      });
    }

    // 3. Remove extra spaces
    message = message.trim();

    // 4. Check if empty after trimming
    if (message.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Message cannot be empty."
      });
    }

    // 5. Maximum length
    if (message.length > 2000) {
      return res.status(400).json({
        success: false,
        message: "Message cannot exceed 2000 characters."
      });
    }

    // ==========================
    // Call Cerebras AI
    // ==========================

   /* const response = await client.chat.completions.create({
      model: "gpt-oss-120b",
      //temperature: 0.1,   //low temperature 
 //temperature: 1.2,
  reasoning_effort: "high",
 //reasoning_effort: "low",

      messages: [
        {
          role: "system",
          content: "You are a helpful assistant."
        },
        {
          role: "user",
          content: message
        }
      ]
    });*/// for non streaming
//for streaming 
    const response = await client.chat.completions.create({
  model: "gpt-oss-120b",
  stream: true,
  messages: [
    {
      role: "system",
      content: "You are a helpful assistant."
    },
    {
      role: "user",
      content: message
    }
  ]
});

   // const aiReply = response.choices[0].message.content;  //only work when streaming is false
 // ==========================
    // Tell Browser that data will stream
    // ==========================

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache");
res.setHeader("Connection", "keep-alive");   // work for streaming

    // ==========================
    //  Read every chunk
    // and send it immediately for streaming
    // ==========================

    for await (const chunk of response) {

      //  Extract text safely
      const content = chunk.choices?.[0]?.delta?.content || "";

      // Send current chunk
      if (content) {
        res.write(content);
      }
    }
    // ==========================
    // Return AI Response
    // ==========================
/*
    return res.status(200).json({
      success: true,
      reply: aiReply
    });*/ //work for non streaming


    res.end();//end stream 
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
      error: error.message
    });
  }
};