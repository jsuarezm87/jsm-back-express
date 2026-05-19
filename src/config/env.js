const requiredEnv = ['PORT', 'CONNECTION_STRING', 'SECRET_JWT'];

const validateEnv = () => {
  const missingEnv = requiredEnv.filter((envVar) => !process.env[envVar]);
  if (missingEnv.length > 0) {
    throw new Error(`Missing required environment variables: ${missingEnv.join(', ')}`);
  }
};

module.exports = { validateEnv };
