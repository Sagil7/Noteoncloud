// const connctTomongo = require('./db');
const mongoose = require('mongoose');
const uri='mongodb://localhost:27017/';
const DB="mongodb+srv://faraz15799:Sagil15@cluster0.uvwe3yr.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology : true
}).then(()=>{
    console.log("Connected to Database")
}).catch((err)=>{
    console.log(err.message);
})



module.exports=connctTomongo;