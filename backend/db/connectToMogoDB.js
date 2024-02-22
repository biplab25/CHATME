import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MOGO_DB_URI);
        console.log("connected to DB");
    } catch (error) {
        console.log("error connecting to DB: ", error);
    }
}

export default connectDB;