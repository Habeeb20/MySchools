import mongoose from "mongoose";
import slugify from "slugify";
const schoolusersSchema = new mongoose.Schema({
    name: {type:String, required: true},
    email:{type:String, required: true, unique: true},
    password:{type:String, required: true},
    sclass: { type:String,  required: true }, 
    role: {type:String, required: true, enum:["teacher", "student", "otherStaff"]},
    createdAt:{type:Date, default: Date.now},
    slug: { type: String, unique: true },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School1",
        required: true,
      },
      isVerified: {type: Boolean,default: false},
      status: { type: String, enum: ['active', 'blocked', 'pending'], default: 'pending' },
      createdAt: { type: Date, default: Date.now },
      registrationDate: { type: Date, default: Date.now },
      uniqueNumber: { type: String, unique: true },
      resetPasswordToken: String,
      resetPasswordExpiresAt: Date,
      verificationToken: String,
      verificationTokenExpiresAt: Date,

}, {timestamps: true})

schoolusersSchema.pre("save", function(next){
  if(!this.slug){
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
})

export default mongoose.model("schooluser", schoolusersSchema)