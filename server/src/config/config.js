module.exports = {
  // [A] PORT ENVs
  port: process.env.PORT,
  
  // [B] DATABASE ENVs
  db: {
    serviceAccountKey: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    storageBucket: process.env.STORAGE_BUCKET_URL,
  },

  // [C] AUTH ENVs
  authentication: {
    jwtSecret: process.env.JWT_SECRET
  },

  // CORS WHITELIST
  corsAllowedOptions: [
    process.env.CORS_WHITELIST_1,
    process.env.CORS_WHITELIST_2
  ]
}