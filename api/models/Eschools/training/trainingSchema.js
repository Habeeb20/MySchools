import mongoose from "mongoose";
import slugify from "slugify";

const trainingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    trainingName:{type:String, required:true},
    category:String,
    features:String,
    motto:String,
    email:String,
    phone:String,
    state:String,
    LGA:String,
    location:String,
    picture1: String,
    picture2:String,
    picture3: String,
    picture4:String,
    createdAt: { type: Date, default: Date.now },
    uniqueNumber:String,
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
}, {timestamps:true} )


trainingSchema.pre("save", function(next){
    if(!this.slug){
      this.slug = slugify(this.trainingName, { lower: true, strict: true });
    }
    next();
  })
  

export default mongoose.model('Training', trainingSchema)