import express from "express";
import mongoose from "mongoose";
import School from "../models/Eschools/schools/school.schema.js";
import Training from "../models/Eschools/training/trainingSchema.js";
import Exam from "../models/Eschools/exam/examSchema.js";
import Store from "../models/Eschools/store/storeSchema.js";
import Tutorial from "../models/Eschools/tutorial/tutorial.js";
// import Teachers from "../models/teacher.js"


// import Bookshop from "../models/bookshop.js";


const router = express.Router()



router.get("/details/:location", async (req, res) => {
  const { location } = req.params;

  try {
    const schools = await School.find({ state: location });
    const teachers = await Teachers.find({ state: location });
    const training = await Training.find({ state: location });
    const exam = await Exam.find({ state: location });
    const bookshop = await Bookshop.find({ state: location });
    const store = await Store.find({ state: location });
    const tutorial = await Tutorial.find({ state: location }

    );

    res.json({
     schools,
     teachers,
     training,
     exam,
     bookshop,
     store,
     tutorial

    });
  } catch (error) {
    console.error("Error fetching details for location:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

export default router
