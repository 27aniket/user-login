const express = require('express');
const app = express();
const port = 8000;
const connectDB = require('./db/dbConnection');
const User = require('./db/user')
const cors = require('cors')


//Middleware for parsing json
app.use(express.json());

//Enable cors
app.use(cors());

//Registration
app.post('/register',async(req,res) =>{
    try{
       const {username,password} = req.body;
       console.log(req.body);
       const user = new User ({username,password});
       await user.save();
       return res.status(201).json({message:"Registration Successful"})
    }
    catch(err){
       return res.status(500).json({error:"registation failed"})
    }
})

//Login
app.post('/login',async(req,res) => {
    try{
    const {username,password} = req.body;
    const user = await User.findOne({username});

    if(!user){
        return res.status(401).json({error:"Invalid username and password"});
    }else if(user.password !== password){
        return res.status(401).json({error:"Invalid password"})

    }else{
        return res.status(200).json({message:"Login successful"})
    }
}   catch(error){
    return res.status(500).json({error:"Login Failed"})

}
    
})


connectDB();


app.listen(port,()=> {
    console.log('Server is running on port 8000')
});