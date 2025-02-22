import express from "express";
import mongoose from "mongoose";
import Income from "../../../models/Eschools/schools/IncomeSchema.js";
import Expense from "../../../models/Eschools/schools/expenseSchema.js";
import { verifyToken } from "../../../middleware/protect.js";
import User from "../../../models/Eschools/user.js"
import School from "../../../models/Eschools/schools/school.schema.js"
const financeRouter = express.Router();

financeRouter.post("/add-income", verifyToken, async (req, res) => {
  try {
      const { name, reason, amount } = req.body;

      if (!name || !reason || !amount) {
          return res.status(400).json({ message: "All fields are required" });
      }

      const numericAmount = Number(amount);
      if (isNaN(numericAmount)) {
          return res.status(400).json({ message: "Amount must be a valid number" });
      }

      const admin = await User.findById(req.user.id);
      if (!admin) return res.status(404).json({ message: "Admin not found" });

      const school = await School.findOne({ userId: req.user.id });
      if (!school) {
          return res.status(404).json({ message: "No school found for this user" });
      }

      const income = new Income({
          name,
          reason,
          amount: numericAmount,
          adminId: school._id
      });

      await income.save();
      res.status(201).json({ message: "Income added successfully", income });
  } catch (error) {
      res.status(500).json({ message: error.message || "Server error" });
  }
});

financeRouter.post("/add-expense", verifyToken, async (req, res) => {
  try {
      const { name, reason, amount } = req.body;

      if (!name || !reason || !amount) {
          return res.status(400).json({ message: "All fields are required" });
      }

      const numericAmount = Number(amount);
      if (isNaN(numericAmount)) {
          return res.status(400).json({ message: "Amount must be a valid number" });
      }

      const admin = await User.findById(req.user.id);
      if (!admin) return res.status(404).json({ message: "Admin not found" });

      const school = await School.findOne({ userId: req.user.id });
      if (!school) {
          return res.status(404).json({ message: "No school found for this user" });
      }

      const expense = new Expense({
          name,
          reason,
          amount: numericAmount,
          adminId: school._id
      });

      await expense.save();
      res.status(201).json({ message: "Expense added successfully", expense });
  } catch (error) {
      res.status(500).json({ message: error.message || "Server error" });
  }
});

financeRouter.get("/get-income", verifyToken, async(req, res) => {
try {
  const school = await School.findOne({ userId: req.user.id });
  if (!school) {
      return res.status(404).json({ message: "No school found for this user." });
  }

  const income = await Income.find({adminId:school._id}).populate("adminId", "name") 
  .sort({ createdAt: -1 }); 

  if(income.length === 0){
    return res.status(404).json({message: "no income found for this admin"})  
  }
return res.status(200).json(income)
} catch (error) {
  console.error( error);
  return res.status(500).json({ message: "An error occurred while fetching Income." });
}
})

financeRouter.get("/get-expenses", verifyToken, async(req, res) => {
  try {
    const school = await School.findOne({ userId: req.user.id });
    if (!school) {
        return res.status(404).json({ message: "No school found for this user." });
    }

    const expenses = await Expense.find({adminId:school._id}).populate("adminId", "name").sort({ createdAt: -1 }); 
    if(expenses.length === 0){
      return res.status(404).json({message: "no expenses found for this admin"})  
    }
    return res.status(200).json(expenses)
  } catch (error) {
    console.error("Error fetching notices:", error);
    return res.status(500).json({ message: "An error occurred while fetching announcements." });
  }
})

financeRouter.get("/get-total", verifyToken, async (req, res) => {
  try {
      console.log("User ID:", req.user.id);

      const admin = await User.findById(req.user.id);
      if (!admin) return res.status(404).json({ message: "Admin not found" });

      const school = await School.findOne({ userId: req.user.id });
      if (!school) return res.status(404).json({ error: "No school found for this user" });

      console.log("School ID:", school._id);

   
 
      const incomes = await Income.find({ adminId: new mongoose.Types.ObjectId(school._id) });
      const expenses = await Expense.find({ adminId: new mongoose.Types.ObjectId(school._id) });

      console.log("Incomes:", incomes);
      console.log("Expenses:", expenses);

      const totalIncome = incomes.reduce((sum, inc) => sum + parseFloat(inc.amount || 0), 0);
      const totalExpense = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);
      const balance = totalIncome - totalExpense;

      console.log("Total Income:", totalIncome);
      console.log("Total Expense:", totalExpense);
      console.log("Balance:", balance);

      res.json({ totalIncome, totalExpense, balance });
  } catch (error) {
      console.error("Error fetching totals:", error);
      res.status(500).json({ message: "Error fetching totals" });
  }
});

financeRouter.get("/get-trends", verifyToken, async(req, res) => {
    try {
      const admin = await User.findById(req.user.id)
      if(!admin) return res.status(404).json({message:"not found"})
      
        const school = await School.findOne({ userId: req.user.id });
        if (!school) {
            return res.status(404).json({ error: "No school found for this user" });
        }

        const incomes = await Income.find({ adminId:  new mongoose.Types.ObjectId(school._id)  });
        const expenses = await Expense.find({ adminId:  new mongoose.Types.ObjectId(school._id)  });
    
        const formatData = (records) => {
          return records.reduce((acc, record) => {
            const month = new Date(record.date).toLocaleString("en-US", { month: "short", year: "numeric" });
            acc[month] = (acc[month] || 0) + record.amount;
            return acc;
          }, {});
        };
    
        const incomeTrends = formatData(incomes);
        const expenseTrends = formatData(expenses);
    
        res.json({ incomeTrends, expenseTrends });
      } catch (error) {
        res.status(500).json({ message: "Error fetching trends" });
      }
})

financeRouter.get("/get-filtered-data", verifyToken, async (req, res) => {
    try {

      const admin = await User.findById(req.user.id)
      if(!admin) return res.status(404).json({message:"not found"})
      
        const school = await School.findOne({ userId: req.user.id });
        if (!school) {
            return res.status(404).json({ error: "No school found for this user" });
        }

      const { month, year } = req.query;
      const startDate = new Date(`${year}-${month}-01`);
      const endDate = new Date(`${year}-${month}-31`);
  
      const incomes = await Income.find({ adminId:  new mongoose.Types.ObjectId(school._id) , date: { $gte: startDate, $lte: endDate } });
      const expenses = await Expense.find({ adminId:  new mongoose.Types.ObjectId(school._id) , date: { $gte: startDate, $lte: endDate } });
      console.log(incomes, expenses)
      res.json({ incomes, expenses });
    } catch (error) {
      res.status(500).json({ message: "Error fetching filtered data" });
    }
  });
  

export default financeRouter

