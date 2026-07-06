import OpenAI from "openai";

export default async ({ req, res }) => {
  return res.json({
    success: true,
    message: "AI Function Working 🚀"
  });
};