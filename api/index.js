import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import connectDb from "./db.js";
import morgan from "morgan"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import multer from "multer";
import reportRouter from "./routes/reportRoute.js";
import requestRouter from "./routes/requestRoute.js";
// import adminrouter from "./routes/adminRoute.js";



import userRouter from "./routes/eschools/user.route.js";
import userPaymentrouter from "./routes/eschools/userPayment.js";
import schoolrouter from "./routes/eschools/schools/schools.route.js";
import schooluserRouter from "./routes/eschools/schools/schoolusers.route.js";
import classRouter from "./routes/eschools/schools/class.router.js";
import subjectRouter from "./routes/eschools/schools/subject.route.js";
import teacherRouter from "./routes/eschools/schools/teacherRoute.js";
import studentRouter from "./routes/eschools/schools/student.route.js";
import reportSchoolrouter from "./routes/eschools/schools/schoolreport.router.js";
import financeRouter from "./routes/eschools/schools/financeRoute.js";
import storerouter from "./routes/eschools/store.route.js";
import examrouter from "./routes/exam.route.js";
import trainingrouter from "./routes/training.route.js";
import tutorial from "./models/Eschools/tutorial/tutorial.js";
import tutorialrouter from "./routes/tutorial.route.js";
import jobRouters from "./routes/ejobs/job.route.js";
import applicantRouter from "./routes/ejobs/applicant.js";
import messageRouter from "./routes/ejobs/messageroute.js";
import bookshoprouter from "./routes/bookshopRoute.js";
dotenv.config();


connectDb()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true })); 
app.use(multer().any()); 
// app.use(cors("https://eschoolconnect.ng/"))

app.use(cors("*"))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cookieParser()); 








const PORT =9000

//Eschool
app.use("/eschools/user", userRouter)
app.use("/eschools/payment", userPaymentrouter)
app.use("/eschools/schools", schoolrouter)
app.use("/eschools/schools", schooluserRouter)
app.use("/eschools/schools", classRouter )
app.use("/eschools/schools", subjectRouter)
app.use("/eschools/schools", teacherRouter)
app.use("/eschools/schools", studentRouter)
app.use("/eschools/schools", reportSchoolrouter)
app.use("/eschools/schools", financeRouter)

//request & report
app.use("/eschools/report", reportRouter)
app.use("/eschools/request", requestRouter)

app.use("/eschools/store", storerouter)
app.use("/eschools/exam", examrouter)
app.use("/eschools/training", trainingrouter)
app.use("/eschools/tutorial", tutorialrouter)
app.use("/eschools/book", bookshoprouter)


app.use("/eschools/Ejob", jobRouters)
app.use("/eschools/applicant", applicantRouter)
app.use("/eschools/message", messageRouter)

















// app.use("/admin", adminrouter)



 // Start server
 app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

app.get("/", (req, res) => {
    res.json("the api for eschools is perfectly working right now.......")
  })