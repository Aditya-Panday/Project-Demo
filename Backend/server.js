const express = require('express');
const connectToMongo = require('./config/db');

const cors = require('cors'); // Importing cors module
require('./model/model') 

connectToMongo();
const app = express();
const port = 8000;

app.use(cors())
app.use(express.json()) //ye isliye use hua jo data api ke thru jayega wo json format mai jayega..


// Routes
app.use('/api/auth', require('./routes/auth'))


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
