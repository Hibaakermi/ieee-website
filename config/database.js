const mongoose=require("mongoose");
const database=async()=>{

    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log ("Connected to MongoDB !");

    } catch (error) {
        console.log("Failed to connect to MongoDB",error);
    }
}

module.exports = database;