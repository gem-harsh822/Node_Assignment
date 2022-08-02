import UserModel from "../models/User";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
            res.send({
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
}

export default UserController;
