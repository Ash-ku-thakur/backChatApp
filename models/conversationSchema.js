import mongoose from 'mongoose';

let conversationSchema = new mongoose.Schema({
    participaints:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    allMassages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Massage"
        }
    ]
}, {timestamps:true})

export let Conversation = mongoose.model("Conversation", conversationSchema)