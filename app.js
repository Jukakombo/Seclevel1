//jshint esversion:6

const express = require("express");
const app = express();
const bodyparser=require("body-parser");
const ejs =require("ejs");
const mongoose =require("mongoose");

app.set('views engine', 'ejs');
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));



app.get("/", function(req, res){
  res.render("home.ejs");
});


app.get("/register", function(req, res){
  res.render("register.ejs");

});


app.get("/login", function(req, res){
  res.render("login.ejs");
});

app.get("/logout", function(req, res){
  res.redirect("/")
});

app.get("/secrets", function(req, res){
  res.render("secrets");
});

app.post("/register", function(req, res){
  const newUser= new User({
    email:req.body.userName,
    password:req.body.password
  });
  newUser.save(function(err){
    if(err){
      console.log(err);
    }else{
    console.log("you have sucessfully save your data into DB");
    }
  });
  res.redirect("/");
});

app.post("/login", function(req, res){
  const userName=req.body.userName;
  const password=req.body.password;
  User.findOne({email:userName}, function(err, foundUser){
    if(err){console.log(err);
    }else{
      if(foundUser){
        if(foundUser.password === password){
          res.render("secrets.ejs");
        }
      }
    }
  });
});

mongoose.connect('mongodb+srv://User_20:user20@cluster0-fgp1w.mongodb.net/userDB', {useNewUrlParser:true});
const userSchema =new mongoose.Schema({
  email:String,
  password:String
});

//second Schema


const gemdetailSchema =new mongoose.Schema({

firstname:String,
Secondname:String,
dateofbirth:String,
city:String,
university:String,
phone:Number
});
const Gemdetail = new mongoose.model("Gemdetail", gemdetailSchema);


app.get("/congratulation", function(req, res){
  res.render("congratulation.ejs");
});

app.get("/member", function(req, res){
  res.render("member.ejs");
});
app.post("/member", function(req, res){
  const member=new Gemdetail({
  firstname:req.body.firstName,
    Secondname:req.body.Secondname,
    dateofbirth:req.body.birthdate,
    city:req.body.city,
    university:req.body.university,
    phone:req.body.phone
  });
  member.save(function(err){
    if(err){
      console.log(member);
    }else{
      res.render("Congratulation.ejs");
    }
  });
});

const User = new mongoose.model("User", userSchema);



let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
 
app.listen(port , function(){
  console.log("your app is running on port 3000");
});
