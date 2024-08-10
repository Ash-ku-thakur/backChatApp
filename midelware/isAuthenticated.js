import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({});

export let IsAuth = async (req, res, next) => {
  try {
    let token = req.cookies.uid;

    if (!token) {
      return res.status(404).json({
        massage: "you are not authenticated wiyhout cookies",
      });
    }

    let matchToken =await jwt.verify(token, process.env.JWT_SECRET);

    // if (!matchToken) {
    //   return res.status(404).json({
    //     massage: "you are not authenticated",
    //   });
    // }

    // console.log(matchToken);
    req.id = matchToken.userId;

    next();
  } catch (error) {
    console.log(error);
  }
};
