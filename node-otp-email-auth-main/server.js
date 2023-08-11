const { app, db, PORT } = require('./config/config');
const { SERVER_DB_URI } = require('./constants/constants');
const bootstrap = async () => {
  try {
    db.set('strictQuery', true);
    await db.connect(SERVER_DB_URI);
    app.listen(PORT, async () => {
      console.log("database connected... listen on port 3000");
    });
  } catch (error) {
    console.log(error);
  }
};

bootstrap();
