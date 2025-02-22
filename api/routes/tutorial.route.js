import express from "express";
import User from "../models/Eschools/user.js";
import { verifyToken } from "../middleware/protect.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "cloudinary"
import mongoose from "mongoose";
import Tutorial from "../models/Eschools/tutorial/tutorial.js";

const tutorialrouter = express.Router()



export default tutorialrouter