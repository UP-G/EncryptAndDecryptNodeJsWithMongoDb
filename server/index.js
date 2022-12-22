const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const hashMsgRouter = require('./routes/hashMsg.routes');
const corsMiddleware = require('./middleware/cross.middleware');
const privateRouter = require('./routes/private.routes')
const app = express();
const PORT = config.get('serverPort');

app.use(corsMiddleware);
app.use(express.json());
app.use('/api/crypto', hashMsgRouter);

const start = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(config.get('dbCon'));

    app.listen(PORT, () => {
      console.log('Server started on port ', PORT);
    });
  } catch (e) {
    console.log(e);
  }
};

start();