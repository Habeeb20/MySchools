import express from "express";
import User from "../../../models/Eschools/user.js";
import School from "../../../models/Eschools/schools/school.schema.js"
import jwt from "jsonwebtoken"
import { roleBasedAccess, Protect, verifyToken } from "../../../middleware/protect.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "cloudinary"
import mongoose from "mongoose";
import SchoolUsers from "../../../models/Eschools/schools/schoolUsers.js";

const schoolrouter = express.Router()



schoolrouter.post(
    "/postschooldata",
    Protect,
    async (req, res) => {
      try {
        const userId = req.user.id; 
        const { schoolName } = req.body;
  
       
        const user = await User.findOne({ _id: userId, });
        if (!user) {
          return res.status(404).json({ message: "User account not found or invalid role" });
        }
  
    
        const existingSchool = await School.findOne({ userId });
        if (existingSchool) {
            console.log( "User has already registered a school")
          return res.status(400).json({ message: "User has already registered a school" });
        }
  
      
        const school = new School({
          userId,
          schoolName,
        });
  
        await school.save();
        return res.status(200).json({ message: "School registered successfully!", school });
  
      } catch (error) {
        console.error("Error registering school:", error);
        return res.status(500).json({ message: "An error occurred" });
      }
    }
  );
  

//get a school for schoolName
schoolrouter.get("/getschooldata", verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const school = await School.findOne({ userId });

        if (!school) {
            return res.status(404).json({ message: "No school registered" });
        }
        console.log("my school!!!!", school)
        return res.status(200).json( school );
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred" });
    }
});


//get all schools 
schoolrouter.get("/getallschools", async(req, res) => {
  try {
    const school = await School.find({})
    return res.status(200).json(school)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
})







schoolrouter.put(
  "/:id",
  Protect,
  roleBasedAccess(["school-administrator"]),
  async (req, res) => {
    const { id } = req.params;

    try {
      console.log("Received ID:", id);

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid school ID format" });
      }

      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User account not found" });
      }

      const school = await School.findById(id);
      if (!school) {
        return res.status(404).json({ message: "School not found" });
      }

      if (school.userId.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not authorized to update this school" });
      }

      const updates = {};
        for (const key in req.body) {
            if (req.body[key] !== undefined && req.body[key] !== "") {
                updates[key] = req.body[key];
            }
        }


      
    const uploadFile = async (file) => {
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "schools",
      });
      return result.secure_url;
    };

    if (req.files) {
      if (req.files.picture) {
        updates.picture = await uploadFile(req.files.picture);
      }
      if (req.files.schoolPicture) {
        updates.schoolPicture = await uploadFile(req.files.schoolPicture);
      }
      if (req.files.coverPicture) {
        updates.coverPicture = await uploadFile(req.files.coverPicture);
      }
      if (req.files.picture1) {
        updates.picture1 = await uploadFile(req.files.picture1);
      }
      if (req.files.picture2) {
        updates.picture2 = await uploadFile(req.files.picture2);
      }
      if (req.files.picture3) {
        updates.picture3 = await uploadFile(req.files.picture3);
      }
      if (req.files.picture4) {
        updates.picture4 = await uploadFile(req.files.picture4);
      }
      if (req.files.vcpicture) {
        updates.vcpicture = await uploadFile(req.files.vcpicture);
      }
    }

      

     

      console.log("Updates to be made:", updates);

      
    // Update the school
    const updatedStore = await Store.findByIdAndUpdate(
      id,
      { $set: updates }, // Only update provided fields
      { new: true, runValidators: true }
  );

    if (!updatedSchool) {
      res.status(500);
      throw new Error("Failed to update school.");
    }
      console.log("School data updated:", updatedSchool);
      res.status(200).json({
        message: "School updated successfully",
        updatedSchool,
      });
    } catch (error) {
      console.error("Update Error:", error);
      res.status(500).json({ message: error.message || "An error occurred" });
    }
  }
);













//get share counts
schoolrouter.get("/:id/shares", async(req, res) => {
    try {
        const { id } = req.params;
    
        const school = await School.findById(id);
    
        if (!school) {
          return res.status(404).json({ message: "School not found" });
        }
        res.status(200).json({ shareCount: school.shares });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
})


//increment share count

schoolrouter.post("/:id/shares", async(req, res) => {
    try {
        const { id } = req.params;
      
        const school = await School.findByIdAndUpdate(
          id,
          { $inc: { shares: 1 } }, 
          { new: true } 
        );
      
        if (!school) {
           return res.status(404).json({ message: "School not found" });
        }
      
        res.status(200).json({ message: "Share count updated.", shareCount: school.shares });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
})

//view more count
//route to increment click count

schoolrouter.post("/:slug/click", async (req, res) => {
  try {
    const { slug } = req.params; 


    const school = await School.findOneAndUpdate(
      { slug: slug }, 
      { $inc: { clicks: 1 } }, 
      { new: true } 
    );

    if (!school) {
      return res.status(404).json({ message: "School not found" });
    }

    res.status(200).json({
      message: "Click count updated",
      clicks: school.clicks
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


schoolrouter.get("/get-clicks/:id", async(req, res) => {
    try {
        const { id } = req.params;
    
        const school = await School.findById(id);
    
        if (!school) {
          return res.status(404).json({ message: "School not found" });
        }
    
        res.status(200).json({ clicks: school.clicks });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
})



// Get click counts for all schools
schoolrouter.get("/get-clicks", async (req, res) => {
    try {
      const schools = await School.find({}, "schoolName clicks"); // Fetch school name and clicks only
  
      res.status(200).json(schools);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

  //add comment
schoolrouter.post("/:id/comments", async (req, res) => {
  const { name, text } = req.body;
  try {
    const school = await School.findById(req.params.id);
    if (!school) {
      return res.status(404).json({ message: "School not found" });
    }
    const newComment = { name, text };
    school.comments.push(newComment);
    await school.save();
    res.status(201).json({ comment: newComment });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//get a single school
schoolrouter.get("/aschool/:slug", async(req, res) => {
  try{
    const school = await School.findOne({slug:req.params.slug})
    if(!school){
      console.log("school not found")
      return res.status(404).json({message: "school not found"})
  
    }
    return res.status(200).json(school)
  }catch{
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
})


  //countSchools

schoolrouter.get("/countSchools", async (req, res) => {
    try {
      const { locations } = req.query;
  
      if (!locations || !Array.isArray(locations)) {
        return res.status(400).json({
          message: "Locations query parameter must be an array of strings",
        });
      }
  
      const counts = await Promise.all(
        locations.map(async (loc) => {
          const count = await School.countDocuments({
            location: { $regex: loc, $options: "i" },
          });
          return { location: loc, count };
        })
      );
  
      res.json(counts);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  });

//count teachers in schools
schoolrouter.get("/countTeacher", async (req, res) => {
  try {
    const teacherCount = await SchoolUsers.countDocuments({ role: "teacher" }); 
    console.log(teacherCount)
    return res.status(200).json({ count: teacherCount });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred with the server" });
  }
});



  //comparison

  schoolrouter.get("/schoolscompare", async (req, res) => {
    try {
      const { location, schoolFees, onBoarding, schoolName } = req.query;
  
      // Construct query to match any of the provided search parameters
      const query = [];
  
      if (location && typeof location === "string") {
        query.push({ location: { $regex: location, $options: "i" } });
      }
      if (schoolFees && !isNaN(parseInt(schoolFees))) {
        query.push({ schoolFees: parseInt(schoolFees) });
      }
      if (onBoarding !== undefined) {
        query.push({ onBoarding: JSON.parse(onBoarding.toLowerCase()) });
      }
      if (schoolName && typeof schoolName === "string") {
        query.push({ name: { $regex: name, $options: "i" } });
      }
  
      const schools = await School.find({ $or: query });
      res.json(schools);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  });
  
  
schoolrouter.get("/comparison", async (req, res) => {
    const { school } = req.query;
    try {
      const school1 = await School.findOne({
        school: new RegExp(`^${school}$`, "i"),
      }); 
      if (school1) {
        res.json(school1);
      } else {
        res.status(404).json({ message: "School not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  


  //category count

  schoolrouter.get('/category/counts', async(req, res) => {
    try {
      const categoryCounts = {
        primary: await School.countDocuments({ category: 'primary' }),
        secondary: await School.countDocuments({ category: 'secondary' }),
        college: await School.countDocuments({ category: 'college' }),
        polytechnic: await School.countDocuments({ category: 'polytechnic' }),
        university: await School.countDocuments({ category: 'university' })
      };
  
      res.json(categoryCounts);
    } catch (error) {
      console.error('Error fetching category counts:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })
  
  
  
  
  schoolrouter.get('/location/counts', async (req, res) => {
    try {
  
      const states = [
        'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
        'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa',
        'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger',
        'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
      ];
  
  
      const stateCounts = {};
  
      for (const state of states) {
        const count = await School.countDocuments({ state: state });
        stateCounts[state] = count;
      }
  
  
      res.json(stateCounts);
  
    } catch (error) {
      console.error('Error fetching state counts:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  export default schoolrouter
  