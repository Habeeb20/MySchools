import Message from "../../models/Eschools/Ejobs/message.js";
import User from "../../models/Eschools/user.js";
import mongoose from "mongoose";
import express from "express";
import { verifyToken } from "../../middleware/protect.js";

const messageRouter = express.Router()

messageRouter.post("/messagefromemployer/:id", verifyToken, async (req, res) => {
    const { message, jobId } = req.body;
    const { id: jobseekerId } = req.params;
    const senderId = req.user.id;
    try {
       
        const jobseeker = await User.findById(jobseekerId);
        if (!jobseeker) {
            return res.status(404).json({ message: "Jobseeker not found" });
        }

       
        const employer = await User.findById(senderId);
        if (!employer) {
            return res.status(404).json({ message: "Employer not found" });
        }

      
        const newMessage = new Message({
            senderId,
            receiverId: jobseekerId,
            jobseekerId: jobseekerId,
            employerId: req.user.id,
            message,
            jobId
        });

        await newMessage.save();
        console.log("Message sent successfully");
        res.status(201).json(newMessage);

    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ message: "An error occurred on the server" });
    }
});


messageRouter.post("/messagefromjobseeker/:id", verifyToken, async (req, res) => {
    const { message, jobId } = req.body;
    const { id: employerId } = req.params;
    const senderId = req.user.id; 

    try {
        // Check if employer exists
        const employer = await User.findById(employerId);
        if (!employer) {
            return res.status(404).json({ message: "Employer not found" });
        }

        // Check if jobseeker exists (not necessary, since req.user is verified)
        const jobseeker = await User.findById(senderId);
        if (!jobseeker) {
            return res.status(404).json({ message: "Jobseeker not found" });
        }

        // Create message with senderId and receiverId
        const newMessage = new Message({
            senderId, // The jobseeker sending the message
            receiverId: employerId,
            employerId: employerId,
            jobseekerId: req.user.id,
            message,
            jobId
        });

        await newMessage.save();
        console.log("Message successfully sent");
        return res.status(201).json({ message: "Message has been successfully sent to this employer" });
    } catch (error) {
        console.error("Error sending message:", error);
        return res.status(500).json({ message: "An error occurred while sending the message" });
    }
});




messageRouter.get("/getmessageforemployer", verifyToken, async(req, res) => {
    const employerId = req.user.id

    try {
        const employer = await Message.find({senderId: employerId}).populate("receiverId", " email uniqueNumber").populate("jobId", "companyName companyAbout jobTitle jobType location salary  requirements vacancies").populate("applicantId", "grade certificate courseStudied skills")
        if(!employer) return res.status(400).json({message:"not found"})
        return res.status(200).json(employer)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "an error occurred"})
    }
})


//get a message being sent to employer by a jobseeker\
messageRouter.get("/getmessagefromjobseekers", verifyToken, async(req, res) => {
    const employerId = req.user.id;

    try {
        const messageRecieved = await Message.find({receiverId: employerId})
        .populate("senderId", " email ") 
        .populate("jobId", "companyName companyAbout location salary jobType jobTitle");

        
        if(messageRecieved.length === 0) {
            return res.status(400).json({ message: "No messages received by this jobseeker" });
        }

        return res.status(200).json(messageRecieved);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred" });
    }
})



//get a message for employer
messageRouter.get("/getamessageforemployer/:id", verifyToken, async(req, res) => {
    const {id} = req.params
    try {
        const employer = await Message.findById(id).populate("jobseekerId", "email ").populate("jobId", "companyName companyAbout jobTitle JobType location salary  requirements vacancies").populate("applicantId", "grade certificate courseStudied skills")
        if(!employer) return res.status(404).json({message:"not found"})
         return res.status(200).json(employer)
    } catch (error) {
         console.log(error)
        return res.status(500).json({message: "an error occurred"})
    }
})


//get a message being sent by the jobseeker for the jobseeker
messageRouter.get("/getmessagesentbyjobseeker", verifyToken, async (req, res) => {
    const jobseekerId = req.user.id;

    try {
   
        const messagesSent = await Message.find({ senderId: jobseekerId })
            .populate("receiverId", " email ")
            .populate("jobId", "companyName companyAbout location salary jobTitle jobType");

        // if (messagesSent.length ===0 ) {
        //     return res.status(404).json({ message: "No messages sent by this jobseeker" });
        // }

        return res.status(200).json(messagesSent);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred" });
    }
});


//get a message being sent to the jobseeker by the employer
messageRouter.get("/getmessagereceivedbyjobseeker", verifyToken, async (req, res) => {
    const jobseekerId = req.user.id;

    try {
        const messagesReceived = await Message.find({ receiverId: jobseekerId })
            .populate("senderId", "email ") 
            .populate("jobId", "companyName companyAbout location salary jobTitle jobType");

        // if (messagesReceived.length === 0) {
        //     return res.status(400).json({ message: "No messages received by this jobseeker" });
        // }

        return res.status(200).json(messagesReceived);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred" });
    }
});


messageRouter.get("/getamessageforjobseeker/:id", verifyToken, async(req, res) => {
    const {id} = req.params
    try {
        const jobseeker = await Message.findById(id).populate("employerId", "email ").populate("jobId", "companyName companyAbout location salary")
        if(!jobseeker) return res.status(404).json({message:"not found"})
         return res.status(200).json(jobseeker)
    } catch (error) {
         console.log(error)
        return res.status(500).json({message: "an error occurred"})
    }
})



export default messageRouter