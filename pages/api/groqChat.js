// pages/api/groqChat.js
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.NEXT_PUBLIC__API_KEY });

export default async function handler(req, res) {
    const {title} = req.body;
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: title,
        },
      ],
      model: "llama3-8b-8192",
    });

    const result = chatCompletion.choices[0].message.content.match(/```(.*?)```/s)[1].trim();

    console.log(result);
    

    // console.log(chatCompletion.choices[0].message.content);
    
    
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
