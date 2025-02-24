import mongoose from "mongoose";
import slugify from "slugify";
const messageSchema = new mongoose.Schema({
    employerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    jobseekerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    jobId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'job',
        required: true
    },
    applicantId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Applicant',
    },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", }, 
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", }, 
    message: {
        type:String,
        required: true
    },
    date: {
        type:Date,
        default: Date.now()
    }
}, {timestamps: true})
messageSchema.pre("save", function(next){
    if(!this.slug){
        this.slug = slugify(this.message, { lower: true, strict: true });
      }
      next();
})

export default mongoose.model("Message1", messageSchema)