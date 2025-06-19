async function submitFeedback({ tenantId, message, rating }) {
  return {
    status: "received",
    tenantId,
    message,
    rating,
    receivedAt: new Date().toISOString(),
  };
}

submitFeedback.meta = {
  description: "Submits feedback with an optional rating",
  schema: {
    type: "object",
    properties: {
      message: { type: "string", minLength: 5 },
      rating: { type: "number", minimum: 1, maximum: 5 },
    },
    required: ["message", "rating"],
    additionalProperties: false,
  },
};

module.exports = submitFeedback;
