const express = require('express')
const app = express()
var cors = require('cors')

// cors is used to solve the issue of api calling using local host 
app.use(cors())
const port = 5000

const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/';
const DB = "mongodb+srv://faraz15799:Sagil15@cluster0.uvwe3yr.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to Database")
}).catch((err) => {
    console.log(err.message);
})
app.use(express.json())
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
