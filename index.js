const morgan = require('morgan');
const express = require('express');
//middlewares
const auth = require('./middleware/auth');
const index = require('./middleware/index');
const notFound = require('./middleware/notfound');
const app = express();
const cors = require('./middleware/cors');
//routers
const usuario = require('./routes/usuario');
const user = require('./routes/user');

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", index);
app.use("/user", user)
app.use(auth);
app.use("/usuario",usuario);
app.use(notFound);

app.listen(process.env.PORT || 3000, () =>{
    console.log("server is running...")
});

