import {Request, Response, Router,NextFunction } from "express";
import { prisma } from "../";
import nodemailer from "nodemailer"
// import bcrypt from "bcryptjs"
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: "qteam984@gmail.com",
      pass: "psur zhse xaqp aquu",
    },
  });
const bcrypt = require('bcrypt');
const findOne = async (req:Request,res:Response)=>{
 try{
    const oneUser = await prisma.user.findFirst();
    res.json(oneUser)
 } catch(e){
    throw new Error("Error")
 }
}
const signUpController=async(req:Request,res:Response)=>{
    const { email, password, username } = req.body;
    const isUserExist=await prisma.user.findUnique({
        where:{
            email,
        }
    });
    if(isUserExist){
res.status(202).json({
    success:false,
    message:"User already exists",
    data:null
});return
    }
    // const salt=process.env.Salt
const hashedPass=bcrypt.hashSync(password,10)
    const result=await prisma.user.create({
        data:{
            email:email,
            password: hashedPass,
            username: username,
        }
    });res.status(202).json({
        success:true,
        message:"signed up",
        data:result
    })
}
const signinController = async (req: Request, res: Response) => {
    const { email, password,  } = req.body;
    const isUserExist=await prisma.user.findUnique({
        where:{
            email,
        }
    });
    if(!isUserExist){
        res.status(400).json({
            success:false,
            message:"User doesn't exist",
            code:"User not found",
            data:null
        });return
            }
//isUserExist.password==my pass
//password==hashed pass
const isValid=bcrypt.compareSync(password, isUserExist.password);
         if(isValid){
            res.json({
                success:true,
                    message:"Successfully signed up",
                    code:"Signed up",
                    data:null 
            });
            return
         }   
                res.status(400).json({
                    success:false,
                    message:"check your password",
                    code:"password incorrect",
                    data:null
            })

  };
const fetchUsers = async (req: Request, res: Response) => {
const users = await prisma.user.findMany({});
res.json(users);
};

// forget password

const forgetPassword=async(req:Request,res:Response)=>{
    const { email } = req.body;

    const user = await prisma.user.findUnique({
        where:{
            email,
        }

    });
    if(user){
        //6orontoi too baih ystoi uchras
        const otp=Math.floor(Math.random()*899999+100000)
 await prisma.otp.create({
    data:{
        email,
        otp
    }
 })
 const info = await transporter.sendMail({
    from: '"Buy me coffee" <qteam984@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Buy me a coffee OTP", // Subject line
    text:String(otp), // plain text body
     // html body
  });
 res.json( {
    code:"SENT_OTP",
    data:null,
    message:"Sent-OTP",
    success:true
 })
 
  console.log("Message sent: %s", info.messageId);
        return
    }
    res.status(409).json( {
        code:"USER_NOT_FOUND",
        data:null,
        message:"User does't exist",
        success:false
     })
}

const requestOTP=async(req:Request,res:Response)=>{
    const { email, userOtp, } = req.body;
    console.log(req.body)
    const user = await prisma.user.findUnique({
        where:{
            email,
        }

    });
    if(user){
       const otp=await prisma.otp.findFirst({
        where:{
            otp:Number(userOtp)
        }
       });
     if(email==otp?.email && userOtp==otp?.otp){
        res.json( {
            code:"OTP_Verified",
            data:null,
            message:"Successfully verified OTP",
            success:true
         })
     }else{
        res.status(404).send( {
            code:"OTP_INCORRECT",
            data:null,
            message:"OTP IS INCORRECT",
            success:false
         })
     }
 
        return
    }
    res.status(409).json( {
        code:"USER_NOT_FOUND",
        data:null,
        message:"User does't exist",
        success:false
     })
}



export const user = Router();

user.get("/refresh", fetchUsers);
user.get("/",findOne);
user.post("/update",forgetPassword);



user.post("/verify-otp",requestOTP);

user.post("/sign-up",signUpController );
user.post("/sign-in",signinController );


