const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan")
const config = require("config");
require('express-async-errors');
const usersRoute = require("./routes/users");
const error = require("./middlewares/error");

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

//Middlewares
app.use(express.json());
app.use(morgan('tiny'));

//Routes
app.use('/api/users', usersRoute);
app.use('**', (req, res) => res.status(404).send({message:'Inexistent resource'}));
app.use(error);

//App listening
app.listen(port, () => console.log(`App listening on port ${port}`));
