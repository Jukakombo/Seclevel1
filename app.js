
//jshint esversion:6
const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose= require("mongoose");
const bodyparser=require("body-parser");

app.set('views engine', 'ejs');
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
mongoose.connect('mongodb://localhost:27017/userDB',  { useNewUrlParser: true });

app.get("/", function(req, res){
  res.render("home.ejs");
});

app.get("/register", function(req, res){
  res.render("register.ejs");
});

app.get("/login", function(req, res){
  res.render("login.ejs");
});

const userShema={
  email: String,
  password: String
}

const User = mongoose.model("User", userShema);

app.post("/register", function(req , res){
  const newUser= new User({
    email:req.body.username,
    password:req.body.password
  })
  newUser.save(function(err){
    if(err){
      console.log(err);
    }else{
      res.render("secrets.ejs");
    }
  });
});

app.post("/login", function(req, res){
  username=req.body.username;
  password=req.body.password;
  User.findOne({email:username}, function(err, foundUser){
    if(err){
      console.log(err);
    }else{
      if(foundUser){
        if(foundUser.password === password){
          res.render("secrets.ejs");
        }
      }
    }
  });
});



app.listen(process.env.PORT || 3000, function(req, res){
  console.log("your app is running on port 3000");
});
