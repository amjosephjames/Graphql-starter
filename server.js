const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const mongoose = require("mongoose");
const session = require("express-session");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 3007;

const lifeURI =
  "mongodb+srv://joseph4231:Barca4231@cluster0.zrkxc.mongodb.net/qraphqlStarterDb?retryWrites=true&w=majority";
// const url = "mongodb://localhost/qraphqlStarterDb";

mongoose.connect(url).then(() => {
  console.log("database connected");
});
const app = express();
// const port = 3211;
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(lifeURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(` connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.log(error);
  }
};

app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: "Iam",
    name: "session",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      maxAge: 1000 * 60 * 2,
    },
  })
);
app.use(
  "/api",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "welcome home", data: { session: req.session } });
});

app.get("/start", (req, res) => {
  res.json({ message: "welcome home start" });
});

connectDB();
app.listen(port, () => {
  console.log("server is now listening");
});
