async function ping({ tenantId }) {
  return {
    message: `pong from tenant ${tenantId}`,
    timestamp: new Date().toISOString(),
  };
}

ping.meta = {
  description: "Simple health check function. Returns pong and tenant info.",
};

module.exports = ping;
