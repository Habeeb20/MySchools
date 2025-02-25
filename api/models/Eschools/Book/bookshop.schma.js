import mongoose from "mongoose";
import slugify from "slugify";
const bookshopSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
  bookshopName:String,
  BookOrLibrary:String,
  email:String,
  phone:String,
  state:String,
  LGA:String,
  location:String,
  picture1: String,
  picture2:String,
  picture3: String,
  picture4:String,
  picture5:String,
  picture6:String,
  picture7:String,
  picture8:String,
  picture9:String,
  picture10:String,
  slug:{type:String, unique: true},
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

bookshopSchema.pre("save", function(next){
    if(!this.slug){
      this.slug = slugify(this.bookshopName, { lower: true, strict: true });
    }
    next();
  })
  

export default mongoose.model('Bookshop', bookshopSchema)