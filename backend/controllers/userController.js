import UserModel from "../models/user";
import bcrypt from "bcrypt";
import { Jwt } from "jsonwebtoken";

class UserController {
  static userRegistration = async (req, res) => {
    const { name, email, username, password, confirm_password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      res.send({ status: "failed", message: "Email already exists" });
    } else {
      if (name && email && username && password && confirm_password) {
        if (password === confirm_password) {
          const newUser = new UserModel({
            name: name,
            email: email,
            username: username,
            password: password,
          });
          await newUser.save();
        } else {
          res.send({ status: "failed", message: "Password doesn't match" });
        }
      } else {
        res.send({ status: "failed", message: "All fields are required" });
      }
    }
  };
}
