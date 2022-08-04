import UserModel from "../models/User";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/.env" });
class UserController {
  static userRegistration = async (req: any, res: any) => {
    const { name, email, username, password, confirmpassword } = req.body;
    // console.log(req.body);
    const user = await UserModel.findOne({ email: email });
    if (user) {
      res.send({ status: "failed", message: "Email already exists" });
    } else {
      //   console.log(name, email, username, password, confirmpassword);
      if (name && email && username && password && confirmpassword) {
        if (password === confirmpassword) {
          try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const newUser = new UserModel({
              name: name,
              email: email,
              username: username,
              password: hashPassword,
            });
            await newUser.save();
            const saved_user = await UserModel.findOne({ email: email });
            // Generate JWT token
            const token = jwt.sign(
              { userID: saved_user?._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "30d" }
            );
            const API_KEY = process.env.API_KEY;
            sgMail.setApiKey(API_KEY);
            const message = {
              to: newUser.email,
              from: "hp996847@gmail.com",
              subject: "Registration successfully",
              text: "You have registered successfully",
              html: "<h1>You have registered successfully</h1>",
            };
            sgMail
              .send(message)
              .then((response: any) => console.log("Email Sent"))
              .catch((error: any) => console.log(error));
            res.status(201).send({
              status: "Success",
              message: "User Registered Successfully",
              token: token,
            });
          } catch (error) {
            res.send({ status: "failed", message: "Unable to register" });
          }
        } else {
          res.send({ status: "failed", message: "Password doesn't match" });
        }
      } else {
        res.send({ status: "failed", message: "All fields are required" });
      }
    }
  };

  static loginUser = async (req: any, res: any) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await UserModel.findOne({ email: email });
        if (user != null) {
          const isSame = await bcrypt.compare(password, user.password);
          if (user.email === email && isSame) {
            // Generate JWT token
            const token = jwt.sign(
              { userID: user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "30d" }
            );
            res.status(201).send({
              status: "success",
              message: "Login Success",
              token: token,
            });
          } else {
            res.send({
              status: "failed",
              message: "Email or password is not valid",
            });
          }
        } else {
          res.send({ status: "failed", message: "User Not registerd" });
        }
      } else {
        res.send({ status: "failed", message: "All fields are required" });
      }
    } catch (error) {
      res.send({ status: "failed", message: "Unable to login" });
      console.log(error);
    }
  };
  static getUserProfile =async (req:any,res:any) => {
    try {
      const email = req.params.email;
      const user = await UserModel.findOne({ email: email });
      if(user != null) {
        res.status(200).send({status:"success",message:"user profile",details:user});
      }
      else {
        res.send({ status: "failed", message: "Error in fetching user profile" });
      }
    } catch (error) {
      res.send({ status: "failed", message: "Unable to fetch" });
      console.log(error);
    }
  };
  static updateUserProfile =async (req:any,res:any) => {
    try {
      const email = req.params.email;
      const user = await UserModel.findOne({ email: email });
      if(user != null) {
        res.status(200).send({status:"success",message:"user profile",details:user});
      }
      else {
        res.send({ status: "failed", message: "Error in fetching user profile" });
      }
    } catch (error) {
      res.send({ status: "failed", message: "Unable to fetch" });
      console.log(error);
    }
  };
  static deleteUserProfile =async (req:any,res:any) => {
    try {
      const email = req.params.email;
      const user = await UserModel.findOne({ email: email });
      const result = await UserModel.deleteOne({ email: email });
      if(result.deletedCount === 1) {
        res.status(200).send({status:"success",message:"User deleted Successfully",details:user});
      }
      else {
        res.status(400).send({ status: "failed", message: "Error in deleting user profile" });
      }
    } catch (error) {
      res.status(400).send({ status: "failed", message: "Unable to delete" });
      console.log(error);
    }
  };
}



export default UserController;
