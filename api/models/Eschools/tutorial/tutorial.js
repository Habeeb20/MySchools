import mongoose from "mongoose"
import slugify from "slugify"
const tutorialSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    tutorialName:{type:String, required:true},
    email:String,
    phone:String,
    state:String,
    LGA:String,
    location:String,
    formPrice:String,
    picture1: String,
    picture2:String,
    picture3: String,
    picture4:String,
    exam1:String,
    exam2:String,
    exam3:String,
    exam4:String,
    exam5:String,
    otherclasses:String,
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

tutorialSchema.pre("save", function(next){
    if(!this.slug){
      this.slug = slugify(this.tutorialName, { lower: true, strict: true });
    }
    next();
  })
  

export default mongoose.model('Tutorial', tutorialSchema)