const { z } = require("zod");
async function ping({ message }) {
  return {
    content: [
      {
        type: "text",
        text: `pong ${message}`,
      },
    ],
  };
}

ping.meta = {
  title: "Ping Tool",
  description: "Responds with a pong message.",
  inputSchema: { message: z.string() },
};

module.exports = ping;
