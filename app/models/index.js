// Going to create mongoose model (tutorial.model.js)
const dbConfig = require("../config/db.config.js") //include database url
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db={};  
db.mongoose=mongoose;
db.url=dbConfig.url;
db.tutorials=require("./tutorial.model.js")(mongoose);

module.exports=db  //create database on db.url using mongoose using the syntax or schema define in tutorial.model.js
