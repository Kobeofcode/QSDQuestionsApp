const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const app = express();

const User = require("./models/user")
const Post = require("./models/posts")
const cors = require("cors");
//DB string to mongo
const db = config.get("mongoString");

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true} ,()=>{
    console.log("Spojeni smo na Atlas")
})
app.use(express.json());
app.use(cors());

/*Post.findOne({_id:"5f8d27351f14952c4c38f9eb"})
    .populate("ownerUserid")
    .then(res=>console.log(res.ownerUserid.name))*/


app.use("/api/users",require("./routes/api/visitingusers"))
app.use("/api/posts",require("./routes/api/questions"))
app.use("/api/auth",require("./routes/api/auth"))

// Heroku
if (process.env.NODE_ENV === 'production') {
    // 
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

const port = process.env.port || 5000;

app.listen(port,()=>{
    console.log(`Listening to port ${port}`)
})