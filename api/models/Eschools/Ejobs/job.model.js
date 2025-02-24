import mongoose from "mongoose";
import slugify from "slugify";
const jobSchema = new mongoose.Schema({
    employerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    jobseekerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    companyName:{
        type:String,
        required: true
    },
     companyAbout:{
        type:String,
        required:true
     },
    jobTitle:{
        type:String,
        required: true,
    },
    jobType:{
        type:String,
        required: true,
    },
    location:{
        type:String,
        required:true,
    },
    salary:{
        type:String,
        required:true
    },
    requirements:{
        type:String,
        required:String
    },
    duties:{
        type:String,
        required:true
    },
    vacancies:{
        type:String,
        required: true
    },
    experience: {
         type: Number, 
         required: true,
         default: 0
         },

        createdAt:{
            type:Date,
            default:Date.now
        },
}, {Timestamps:true})


jobSchema.pre("save", function(next){
    if(!this.slug){
        this.slug = slugify(this.companyName, { lower: true, strict: true } )
    }
    next()
})

export default mongoose.model("job", jobSchema)