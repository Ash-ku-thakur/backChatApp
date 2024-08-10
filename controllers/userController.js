import { User } from "../models/userSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export let Register = async (req, res) => {
  try {
    let { firstname, username, email, password, confirmPassword, gender } =
      req.body;

    //   if something is missing than we dont move a head
    if (
      !firstname ||
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !gender
    ) {
      return res.status(404).json({
        massage: "something is missing",
        success: false,
      });
    }

    if (password != confirmPassword) {
      return res.status(404).json({
        massage: "password and confirmPAssword is not same",
        success: false,
      });
    }

    let findUser = await User.findOne({ email });

    // if we can'nt find than we have to create
    if (findUser) {
      return res.status(404).json({
        massage: "user is already exist try to create new user account",
        success: false,
      });
    }

    // plain password converted into hash password
    let hashPassword = await bcryptjs.hash(password, 10);

    // this is for randam user profilePhoto
    let mailProfile = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    let girlProfile = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    let userCreated = await User.create({
      firstname,
      username,
      email,
      password: hashPassword,
      gender,
      profilePhoto: gender == "mail" ? mailProfile : girlProfile,
    });

    return res.status(201).json({
      massage: "Account created successfully",
      success: true,
      firstname,
      username,
      email,
      gender,
      profilePhoto: userCreated.profilePhoto,
    });
  } catch (error) {
    console.log(error);
  }
};

export let Login = async (req, res) => {
  try {
    let { password, email } = req.body;

    //   if something is missing than we dont move a head
    if (!email || !password) {
      return res.status(404).json({
        massage: "email or password is incorrect",
        success: false,
      });
    }

    // find the user
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        massage: "this user is not available",
        success: false,
      });
    }

    // check the password is correct or not without this user can find also but this is not write
    let checkPassword = await bcryptjs.compare(password, user.password);
    // console.log(checkPassword);

    if (!checkPassword) {
      return res.status(404).json({
        massage: "you are not authenticated",
        success: false,
      });
    }

    // after checking all config we have to send a user token
    let token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("uid", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        user,
        massage: `welcome back ${user.firstname}`,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export let Logout = async (req, res) => {
  try {
    return res.status(200).cookie("uid", "", { maxAge: 0 }).json({
      massage: "user logout successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export let GetotherUsers = async (req, res) => {
  try {
    let loggedinUserId = req.id;

    if (!loggedinUserId) {
      return res.status(404).json({
        massage: "you are not authenticated",
        success: false,
      });
    }

    let otherusers = await User.find({ _id: { $ne: loggedinUserId } });
    return res.status(200).json(otherusers);
  } catch (error) {
    console.log(error);
  }
};
