import { Conversation } from "../models/conversationSchema.js";
import { Massage } from "../models/massageSchema.js";
import {getReceiverSocketId, io} from '../socket/socket.js';

export let CreateMassage = async (req, res) => {
  try {
    let mass = req.body.input;
    let loggedinUserId = req.id;
    let receiverId = req.params.id;

    if (!mass || !receiverId) {
      return res.status(401).json({
        massage: "receiverId and massage is required",
        success: false,
      });
    }

    let getPeoples = await Conversation.findOne({
      participaints: { $all: [loggedinUserId, receiverId] },
    });

    if (!getPeoples) {
      getPeoples = await Conversation.create({
        participaints: [loggedinUserId, receiverId],
      });
    }

    let massageCreated = await Massage.create({
      senderId: loggedinUserId,
      receiverId,
      massage: mass,
    });

    if (massageCreated) {
      await getPeoples.allMassages.push(massageCreated._id);
    }
    await getPeoples.save(); // if we update then we have to save it

    // let massages = await Conversation.findById(getPeoples).populate(
    //   "allMassages"
    // );
    // if (!getPeoples.massages.includes(massageCreated._id)) {
    //   // push
    //   await Conversation.findByIdAndUpdate(
    //     getPeoples._id,
    //     {
    //       $push: { massages: massageCreated._id },
    //     },
    //     { returnDocument:"after"}
    //   );
    // }

    // socket io

    let receiverSocketId = getReceiverSocketId(receiverId)

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("massageCreated", massageCreated)
    }

    return res.status(201).json({
      massageCreated,
    });
  } catch (error) {
    console.log(error);
  }
};

export let GetAllMassages = async (req, res) => {
  try {
    let loggedinUserId = req.id;
    let receiverId = req.body.id;

    // console.log( receiverId);

    if (!loggedinUserId) {
      return res.status(401).json({
        massage: "you are not authenticated",
        success: false,
      });
    }

    if (!receiverId) {
      return res.status(401).json({
        massage: "please select a user authenticated",
        success: false,
      });
    }

    let matchConversation = await Conversation.findOne({
      participaints: { $all: [loggedinUserId, receiverId] },
    }).populate("allMassages");

    return res.status(200).json({matchConversation});
  } catch (error) {
    console.log(error);
  }
};
