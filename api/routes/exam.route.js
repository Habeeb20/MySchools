import express from "express";
import User from "../models/Eschools/user.js";
import jwt from "jsonwebtoken"
import { verifyToken } from "../middleware/protect.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "cloudinary"
import mongoose from "mongoose";
import Exam from "../models/Eschools/exam/examSchema.js";


const examrouter = express.Router()

examrouter.get("/dashboard", verifyToken, async(req, res) => {
    const userId = req.user.id;

    const user = await User.findById(userId)
    if(!user){
        return res.status(404).json({message: "not found"})

    }

    return res.status(200).json(user)
})


///post data
examrouter.post("/postexamdata", verifyToken, async(req, res) => {
    try {
        const userId = req.user.id; 
        const { examBody } = req.body;
        const user = await User.findOne({ _id: userId, });
        if (!user) {
          return res.status(404).json({ message: "User account not found or invalid role" });
        }

        const existingExam = await Exam.findOne({ userId });
        if (existingExam) {
            console.log( "User has already registered a school")
          return res.status(400).json({ message: "User has already registered a school" });
        }
  
        const exam = new Exam({
            userId,
            examBody,
          });

          await exam.save();
          return res.status(200).json(exam)
    
      
  
    } catch (error) {
        console.error("Error registering school:", error);
        return res.status(500).json({ message: "An error occurred" });
    }
})


//get exam data
examrouter.get("/getexamdata", verifyToken, async(req, res) => {
    try {
       
        console.log("User ID:", req.user?.id);

        const exam = await Exam.findOne({ userId: req.user.id });
        if (!exam) {
            console.log("Store not found for user:", req.user.id);
            return res.status(404).json();
        }
        return res.status(200).json( exam );
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred" });
    }
})


//get all exam bodies
examrouter.get("/getallexams", async(req, res) => {
    try {
        const exam = await Exam.find({})
        return res.status(200).json(exam)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred" });
    }
})



///edit exam details

examrouter.put("/:id", verifyToken, async (req, res) => {
    const { id } = req.params;

    try {
        console.log("Received Store ID:", id);
        console.log("Request Body:", req.body);
        console.log("Files Received:", req.files);

        // Validate store ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log("Invalid Store ID");
            return res.status(400).json({ message: "Invalid store ID format" });
        }

        // Validate user
        if (!req.user || !req.user.id) {
            console.log("Unauthorized: No user found in request");
            return res.status(401).json({ message: "Unauthorized access" });
        }
        console.log("User ID:", req.user.id);

        const user = await User.findById(req.user.id);
        if (!user) {
            console.log("User account not found");
            return res.status(404).json({ message: "User account not found" });
        }

        // Find the store
        const store = await Exam.findById(id);
        if (!store) {
            console.log("Store not found");
            return res.status(404).json({ message: "exam body not found not found" });
        }

        // Ensure user owns the store
        if (store.userId.toString() !== req.user.id) {
            console.log("Unauthorized: User does not own this store");
            return res.status(403).json({ message: "Not authorized to update this store" });
        }

        // Prepare update payload (exclude _id to prevent immutable error)
        const updates = {};
        for (const key in req.body) {
            if (req.body[key] !== undefined && req.body[key] !== "") {
                updates[key] = req.body[key];
            }
        }

        // Cloudinary file upload function
        const uploadFile = async (file) => {
            try {
                const result = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: "schools",
                });
                return result.secure_url;
            } catch (error) {
                console.error("Cloudinary upload error:", error);
                throw new Error("File upload failed");
            }
        };

        // Check if files exist and upload them
        if (req.files) {
            const fileKeys = [
                "picture1", "picture2", "picture3",
                "picture4", "picture5", "picture6", "picture7"
            ];

            for (let key of fileKeys) {
                if (req.files[key]) {
                    updates[key] = await uploadFile(req.files[key]);
                    console.log(`Uploaded ${key}:`, updates[key]);
                }
            }
        }

        console.log("Final Update Payload:", updates);

        // Ensure that only specified fields are updated
        const updatedStore = await Exam.findByIdAndUpdate(
            id,
            { $set: updates }, // Only update provided fields
            { new: true, runValidators: true }
        );

        if (!updatedStore) {
            console.log("Failed to update store");
            return res.status(500).json({ message: "Failed to update store." });
        }

        console.log("Store updated successfully:", updatedStore);
        res.status(200).json(updatedStore);

    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({ message: "An error occurred" });
    }
});

//get share
examrouter.get("/:slug/shares", async (req, res) => {
    try {
        const { slug } = req.params;
        const exam = await Exam.findOne({ slug }); 

        if (!exam) {
            return res.status(404).json({ message: "Store not found" });
        }
        res.status(200).json({ shareCount: exam.shares });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});





// Increment share count
examrouter.post("/:slug/shares", async (req, res) => {
    try {
        const { slug } = req.params;
        const store = await Exam.findOneAndUpdate(
            { slug }, 
            { $inc: { shares: 1 } },
            { new: true }
        );

        if (!store) {
            return res.status(404).json({ message: "Store not found" });
        }

        res.status(200).json({ message: "Share count updated.", shareCount: store.shares });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


//increment click
examrouter.post("/:slug/click", async(req, res) => {
    try {
        const {slug} = req.params;
        const store = await Exam.findOneAndUpdate(
            {slug},
            { $inc: { clicks: 1 } },
            { new: true }
        )
        if(!store) {
            return res.status(400).json({message:"exam  not found"})
        }
        res.status(200).json({message:"click count updated"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
})


///get the click count for a specific sstore
examrouter.get("/get-clicks/:slug", async(req, res) => {
    try {
        const {slug} = req.params;

        const store = await Exam.findOne({slug:req.params.slug})

        if (!store) {
            return res.status(404).json({ message: "exam not found" });
          }
      
          res.status(200).json({ clicks: store.clicks });
    } catch (error) {
        
    }
})

//get every click

examrouter.get("/get-clicks", async (req, res) => {
    try {
      const store = await Exam.find({}, "exam clicks"); 
  
      res.status(200).json(store);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

  //get a exam slug
examrouter.get("/anexam/:slug", async (req, res) => {
  
    try {
      const { slug } = req.params.slug;
      console.log(req.params);
  
     
      const store = await Exam.findOne(slug);
  
      if (!store) {
        console.log("exam not found");
        return res
          .status(404)
          .json({ success: false, message: "exam not found" });
      }
  
      res.status(200).json({
        success: true,
       store
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Something went wrong" });
    }
  });

//post comment
examrouter.post("/:slug/comments", async (req, res) => {
    const { name, text } = req.body;

    // Validate input
    if (!name || !text) {
        return res.status(400).json({ message: "Name and text are required" });
    }

    try {
        const store = await Exam.findOne({ slug: req.params.slug }); // Fixed query
        if (!store) {
            return res.status(404).json({ message: "exam not found not found" });
        }

        const newComment = { name, text, createdAt: new Date() }; // Added timestamp
        store.comments.push(newComment);
        await store.save();

        res.status(201).json({ message: "Comment added successfully", comment: newComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


//count stores
examrouter.get("/countexam", async (req, res) => {
    try {
        let { locations } = req.query;

        if (locations) {
            if (typeof locations === "string") {
                locations = locations.split(",").map((loc) => loc.trim()); // Convert to array
            }

            if (!Array.isArray(locations)) {
                return res.status(400).json({ message: "Locations must be an array of strings" });
            }

            const counts = await Exam.aggregate([
                { $match: { location: { $in: locations.map((loc) => new RegExp(loc, "i")) } } },
                { $group: { _id: "$location", count: { $sum: 1 } } }
            ]);

            return res.json(counts);
        }

        // If no location is provided, return total count
        const totalExam = await Exam.countDocuments();
        res.json({ totalExam });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});



//location count
examrouter.get('/location/counts', async (req, res) => {
    try {
  
      const states = [
        'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
        'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa',
        'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger',
        'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara','Abuja'
      ];
  
  
      const stateCounts = {};
  
      for (const state of states) {
        const count = await Exam.countDocuments({ state: { $regex: new RegExp(`^${state}$`, 'i') } });
        stateCounts[state] = count;
      }
  
  
      res.json(stateCounts);
  
    } catch (error) {
      console.error('Error fetching state counts:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  export default examrouter
