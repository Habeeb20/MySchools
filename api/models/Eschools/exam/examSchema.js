import mongoose from "mongoose";
import slugify from "slugify";

const examSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    examBody:{type:String, required:true},
    email:{
        type:String
    },
    phone:{
        type:String,
    },
    category:{
        type:String,
    },
    headOffice:{
        type:String
    },
    location:{
        type:String,
    },
    state:{
        type:String,
    },
    LGA:{
        type:String,
    },
    startDate:{
        type:Date,
    },
    endDate:{
        type:Date
    },
    formPrice:{
        type:String
    },
    Deadline:{
        type:Date
    },
    createdAt: {
        type:Date,
        Default:Date.now
    },
    picture1: String,
    picture2:String,
    picture3: String,
    picture4:String,
    slug: { type: String, unique: true },
    comments: [
        {
          name: String,
          text: String,
          createdAt: { type: Date, default: Date.now }
        }
      ],
      clicks: { type: Number, default: 0 }, 
      shares: { type: Number, default: 0 },



}, {timestamps:true})

examSchema.pre("save", function(next){
    if(!this.slug){
      this.slug = slugify(this.examBody, { lower: true, strict: true });
    }
    next();
  })
  

export default mongoose.model("Exam", examSchema)