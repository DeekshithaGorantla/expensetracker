const mongoose= require('mongoose');
const colors=require('colors');
const { Console } = require('console');
const connectDb=async()=>{
try{
await mongoose.connect(process.env.MONGO_URL);
console.log("mongodb connected")
}
catch(error){
console.log(error)
}
}
module.exports=connectDb;