import mongoose from "mongoose";
import slugify from "slugify";

const storeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    storeName:{type:String, required:true},
    email:String,
    phone:String,
    state:String,
    LGA:String,
    location:String,
    category:String,
    picture1: String,
    picture2:String,
    picture3: String,
    picture4:String,
    picture5:String,
    picture6:String,
    picture7:String,
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

storeSchema.pre("save", function(next){
    if(!this.slug){
      this.slug = slugify(this.storeName, { lower: true, strict: true });
    }
    next();
  })
  

export default mongoose.model('Store', storeSchema)