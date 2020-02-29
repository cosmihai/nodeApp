const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const userRoute = require('./routes/user');

const app = express();
const port = process.env.PORT || 3000;

//DB connection
let db = config.get("db");
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
.then(() => console.log(`connected to ${db} ...`));

app.use(express.json())
app.use('/api/users', userRoute);

app.listen(port, () => console.log(`App listening on port ${port}`));
