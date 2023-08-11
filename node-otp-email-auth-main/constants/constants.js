require('dotenv').config();
module.exports = {
  allowedOrigins: ['http://localhost:3000/'],
  SERVER_PORT: process.env.PORT || 3000,
  SERVER_DB_URI: process.env.DB_URI || "mongodb+srv://himanshu:keshri@cluster0.jq5ilvq.mongodb.net/?retryWrites=true&w=majority" ,
  JWT_SECRET: 'thisIsASimpleTest',
  OTP_LENGTH: 10,
  OTP_CONFIG: {
    upperCaseAlphabets: false,
    specialChars: false,
  },
  MAIL_SETTINGS: {
    service: 'smtp.ethereal.email',
    host:'smtp.gmail.com',
    port:587,
    auth: {
      user: process.env.MAIL_EMAIL || 'himanshukeshri0412001@gmail.com',
      pass: process.env.MAIL_PASSWORD || 'kuiwhyagoovozvix',
    },
  },
};
