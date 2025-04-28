import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"

const connectDB   = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`MongoDB connected: DB HOST: ${connectionInstance.connection.host}`);

        
        
    } catch (error) {
        console.log("Error: ", error);
        process.exit(1)
        //padh skte exit ke bare me        
    }
}


export default connectDB