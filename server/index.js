const express = require('express');
const cors = require('cors');

const { connect, connection } = require('mongoose');
const { resolve } = require('path');

const ApiRouter = require('./routes/api.routes');


// loading up environment variables for development.
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: resolve(__dirname, '.env') });
}

const PORT = process.env.PORT || 5000;
const MONGOOSE_URI = process.env.MONGO_ATLAS_URI;

// mongo stuff.
connect(MONGOOSE_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
connection.once('open', () => {
  console.log('MongoDB connection established.');
});


// express stuf.
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', ApiRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
