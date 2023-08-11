const { encrypt, compare } = require('../services/crypto');
const { generateOTP } = require('../services/OTP');
const { sendMail } = require('../services/MAIL');
const { signToken, verifyToken } = require('../services/JWT');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { JWT_SECRET } = require('../constants/constants');
const jwt = require('jsonwebtoken');
const Model = require('../models/User');
const Modl = require('../models/task');
const task = require('../models/task');



module.exports.createTask = async (req,res) =>{
   const token = req.body.token || req.query.token || req.params.token || req.headers["authorization"]

   if(!token){
    return res.status(403).send("token is required")
   }

   try{
    const decode = jwt.verify(token, JWT_SECRET)
    console.log(decode);
    req.user=decode;
   }catch(error){
    return res.status(402).json("Invalid token");
   }

   const task = new Modl({
    email : req.body.email,
    task: req.body.task,
    status: req.body.status
   })
   console.log(task);
   try {
    const savedata = await task.save();
    res.status(200).json(savedata)
  }
   catch (error){
     res.status(400).json({messege: error.messege})
  } 
}

//router.patch('/update/:id', async(req, res) => {
module.exports.update = async (req,res) => {
  //res.send("update by id")
  //console.log(req)
  const token = req.body.token || req.query.token || req.params.token || req.headers["authorization"]

   if(!token){
    return res.status(403).send("token is required")
   }

   try{
    const decode = jwt.verify(token, JWT_SECRET)
    console.log(decode);
    req.user=decode;                                                           
   }catch(error){
    return res.status(402).json("Invalid token");
   }

  try{
      const id = req.params.id;
      const updatedata = req.body;
      const option = { new: true};
      const result = await Modl.findByIdAndUpdate(id, updatedata, option) 
      res.send(result)
  }
  catch (error){
       res.status(400).json({messege: error.messege})
      console.log(error);
  }
}

//router.delete('/delete/:id', async(req, res) => {
module.exports.delete = async (req,res) => {
  //res.send("deleted")
  const token = req.body.token || req.query.token || req.params.token || req.headers["authorization"]

   if(!token){
    return res.status(403).send("token is required")
   }

   try{
    const decode = jwt.verify(token, JWT_SECRET)
    console.log(decode);
    req.user=decode;
   }catch(error){
    return res.status(402).json("Invalid token");
   }

  try{
      const id = req.params.id;
      const deletedata = await Modl.findByIdAndDelete(id)
      res.send(`document with ${deletedata.name} has been deleted`)
  }
  catch (error){
      //res.status(400).json({messege: error.messege})
      console.log(error);
  }
}

//router.get('/getOne/:id', async (req,res) => {
module.exports.get = async (req,res) => {
  //res.send(req.params.id);
  const token = req.body.token || req.query.token || req.params.token || req.headers["authorization"]

   if(!token){
    return res.status(403).send("token is required")
   }
   
   try{
    const decode = jwt.verify(token, JWT_SECRET)
    console.log(decode);
    req.user=decode;
   }catch(error){
    return res.status(402).json("Invalid token");
   }

  // var va=validToken(token,req,res);
  // console.log(va);
  // if(va === 1)
  //   res.status(403).write("token is required");
  // else if(va === 2)
  //   res.status(402).write("Invalid token");
  try {
      let arr=[];
      const savedata = await Modl.find();
      const eml=req.params.email;
      savedata.filter(function(ele){
        if(eml === ele.email){
           arr.push(ele);
        }
    });
      res.json(arr);      
  }
  catch (error) {
        res.status(500).json({messege: error.messege});
  }
};

 module.exports.getAcc = async (req,res) => {

  const token = req.body.token || req.query.token || req.params.token || req.headers["authorization"]

   if(!token){
    return res.status(403).send("token is required")
   }

   try{
    const decode = jwt.verify(token, JWT_SECRET)
    console.log(decode);
    req.user=decode;
   }catch(error){
    return res.status(402).json("Invalid token");
   }


  try{
    let arr=[];
    const savedata = await Modl.find();
    const eml=req.params.email;
    savedata.filter(function(ele){
      if(eml === ele.email){
         arr.push(ele);
      }
    });
    arr.sort();
    res.json(arr);

  }catch(error){
    res.status(500).json({message: error.message});
  }
}

module.exports.getDec = async (req,res) => {

  const token = req.body.token || req.query.token || req.params.token || req.headers["authorization"]

   if(!token){
    return res.status(403).send("token is required")
   }

   try{
    const decode = jwt.verify(token, JWT_SECRET)
    console.log(decode);
    req.user=decode;
   }catch(error){
    return res.status(402).json("Invalid token");
   }


  try{
    let arr=[];
    const savedata = await Modl.find();
    const eml=req.params.email;
    savedata.filter(function(ele){
      if(eml === ele.email){
         arr.push(ele);
      }
    });
    arr.sort();
    arr.reverse();
    res.json(arr);

  }catch(error){
    res.status(500).json({message: error.message});
  }
}


const findTaskByEmail = async (email) => {
  const user = await task.findOne({
    email,
  });
  if (!user) {
    return false;
  }
  return user;
};


module.exports.login = async (req, res) =>{

    try {
      // check if the user exists
      const { email, password } = req.body;
      const user = await findUserByEmail(email);
      if (user) {
        //check if password matches
        var result = bcrypt.compareSync(
             req.body.password,
             user.password
            );
        if (result) {
          //res.render("secret");
          const token = jwt.sign({email}, JWT_SECRET, {expiresIn:"1h"})
          user.token = token 
          console.log(user) 
          res.status(200).json(user) 
        } else {
          res.status(400).json({ error: "password doesn't match" });
        }
      } else {
        res.status(400).json({ error: "User doesn't exist" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
};

module.exports.signUpUser = async (req, res) => {
  const { email, password } = req.body;
  const isExisting = await findUserByEmail(email);
  if (isExisting) {
    return res.send('Already existing');
  }
  // create new user
  const newUser = await createUser(email, password);
  if (!newUser[0]) {
    return res.status(400).send({
      message: 'Unable to create new user',
    });
  }
  res.send(newUser);
};

module.exports.verifyEmail = async (req, res) => {
  const { email, otp } = req.body;
  const user = await validateUserSignUp(email, otp);
  res.send(user);
};

const findUserByEmail = async (email) => {
  const user = await User.findOne({
    email,
  });
  if (!user) {
    return false;
  }
  return user;
};



const createUser = async (email, password) => {
  const hashedPassword = await encrypt(password);
  const otpGenerated = generateOTP();
  const newUser = await User.create({
    email,
    password: hashedPassword,
    otp: otpGenerated,
  });
  if (!newUser) {
    return [false, 'Unable to sign you up'];
  }
  try {
    await sendMail({
      to: email,
      OTP: otpGenerated,
    });
    return [true, newUser];
  } catch (error) {
    return [false, 'Unable to sign up, Please try again later', error];
  }
};

const validateUserSignUp = async (email, otp) => {
  const user = await User.findOne({
    email,
  });
  if (!user) {
    return [false, 'User not found'];
  }
  if (user && user.otp !== otp) {
    return [false, 'Invalid OTP'];
  }
  const updatedUser = await User.findByIdAndUpdate(user._id, {
    $set: { active: true },
  });
  return [true, updatedUser];
};

function validToken(token,req,res){
  if(!token){
    // return res.status(403).write("token is required");
    return 1;
   }

   try{
    const decode = jwt.verify(token, JWT_SECRET)
    console.log(decode);
    req.user=decode;
   }catch(error){
    //return res.status(402).write("Invalid token");  
     return 2;
   }
}