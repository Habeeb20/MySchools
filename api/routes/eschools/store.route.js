import express from "express";
import User from "../../models/Eschools/user.js";
import jwt from "jsonwebtoken"

import { roleBasedAccess, Protect, verifyToken } from "../../middleware/protect.js";
import cloudinary from "cloudinary"
import mongoose from "mongoose";
import Store from "../../models/Eschools/store/storeSchema.js";


const storerouter = express.Router()

storerouter.get("/dashboard", verifyToken, async(req, res) => {
    const userId = req.user.id;

    const user = await User.findById(userId)
    if(!user){
        return res.status(404).json({message: "not found"})

    }

    return res.status(200).json(user)
})


//post store name
storerouter.post("/poststoredata", verifyToken, async(req, res) => {
    try {
        const userId = req.user.id; 
        const { storeName } = req.body;
        const user = await User.findOne({ _id: userId, });
        if (!user) {
          return res.status(404).json({ message: "User account not found or invalid role" });
        }

        const existingStore = await Store.findOne({ userId });
        if (existingStore) {
            console.log( "User has already registered a school")
          return res.status(400).json({ message: "User has already registered a school" });
        }
  
        const store = new Store({
            userId,
            storeName,
          });

          await store.save();
          return res.status(200).json(store)
    
      
  
    } catch (error) {
        console.error("Error registering school:", error);
        return res.status(500).json({ message: "An error occurred" });
    }
})

///get store data
storerouter.get("/getstoredata", verifyToken, async(req, res) => {
    try {
       
        console.log("User ID:", req.user?.id);

        const store = await Store.findOne({ userId: req.user.id });
        if (!store) {
            console.log("Store not found for user:", req.user.id);
            return res.status(404).json({ message: "Store not found" });
        }
        return res.status(200).json( store );
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred" });
    }
})


//get all stores
storerouter.get("/getallstore", async(req, res) => {
    try {
        const store = await Store.find({})
        return res.status(200).json(store)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred" });
    }
})


//edit store details


storerouter.put("/:id", verifyToken, async (req, res) => {
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
        const store = await Store.findById(id);
        if (!store) {
            console.log("Store not found");
            return res.status(404).json({ message: "Store not found" });
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
        const updatedStore = await Store.findByIdAndUpdate(
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


storerouter.get("/:slug/shares", async (req, res) => {
    try {
        const { slug } = req.params;
        const store = await Store.findOne({ slug }); 

        if (!store) {
            return res.status(404).json({ message: "Store not found" });
        }
        res.status(200).json({ shareCount: store.shares });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Increment share count
storerouter.post("/:slug/shares", async (req, res) => {
    try {
        const { slug } = req.params;
        const store = await Store.findOneAndUpdate(
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
storerouter.post("/:slug/click", async(req, res) => {
    try {
        const {slug} = req.params;
        const store = await Store.findOneAndUpdate(
            {slug},
            { $inc: { clicks: 1 } },
            { new: true }
        )
        if(!store) {
            return res.status(400).json({message:"school not found"})
        }
        res.status(200).json({message:"click count updated"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
})


///get the click count for a specific sstore
storerouter.get("/get-clicks/:slug", async(req, res) => {
    try {
        const {slug} = req.params;

        const store = await Store.findOne(slug)

        if (!store) {
            return res.status(404).json({ message: "exam not found" });
          }
      
          res.status(200).json({ clicks: store.clicks });
    } catch (error) {
        
    }
})

//get every click

storerouter.get("/get-clicks", async (req, res) => {
    try {
      const store = await Store.find({}, "exam clicks"); // Fetch school name and clicks only
  
      res.status(200).json(store);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

  //get a store slug
storerouter.get("/aStore/:slug", async (req, res) => {
  
    try {
      const { slug } = req.params;
      console.log(req.params);
  
     
      const store = await Store.findOne(slug);
  
      if (!store) {
        console.log("store not found");
        return res
          .status(404)
          .json({ success: false, message: "store not found" });
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
storerouter.post("/:slug/comments", async (req, res) => {
    const { name, text } = req.body;

    // Validate input
    if (!name || !text) {
        return res.status(400).json({ message: "Name and text are required" });
    }

    try {
        const store = await Store.findOne({ slug: req.params.slug }); // Fixed query
        if (!store) {
            return res.status(404).json({ message: "Store not found" });
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
storerouter.get("/countstore", async (req, res) => {
    try {
        let { locations } = req.query;

        if (locations) {
            if (typeof locations === "string") {
                locations = locations.split(",").map((loc) => loc.trim()); // Convert to array
            }

            if (!Array.isArray(locations)) {
                return res.status(400).json({ message: "Locations must be an array of strings" });
            }

            const counts = await Store.aggregate([
                { $match: { location: { $in: locations.map((loc) => new RegExp(loc, "i")) } } },
                { $group: { _id: "$location", count: { $sum: 1 } } }
            ]);

            return res.json(counts);
        }

        // If no location is provided, return total count
        const totalStores = await Store.countDocuments();
        res.json({ totalStores });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});



export default storerouter