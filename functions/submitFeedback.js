const { z } = require("zod");
async function submitFeedback({ message, rating }) {
  return {
    content: [
      {
        type: "text",
        text: `Feedback recorded at ${new Date().toISOString()}: ${message} with rating ${rating}`,
      },
    ],
  };
}

submitFeedback.meta = {
  title: "Feedback Submission Tool",
  description: "Submits feedback",
  inputSchema: {
    message: z.string().min(5, "At least 5 characters long"),
    rating: z.number().min(1).max(5),
  },
};

module.exports = submitFeedback;
