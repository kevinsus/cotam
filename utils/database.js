import mongoose from "mongoose";

// Create connection to database
export const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "data",
        })
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
    }
} 