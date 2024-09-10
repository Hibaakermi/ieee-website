const mongoose=require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema(
    {
    
        username:{
            type: String,
            required: true,
            unique: true,

        },
        password:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
            unique: true,

        },
        role:{
            type: String,
            enum: ['user','admin'],
            default: 'user',
        
        },
        activityScore:{
            type: Number,
            default: 0,
        
        },
        totalAchievementScore:{
            type: Number,
            default: 0,
        
        },
          messages:{
            type: [{ from: String, content: String }],
            default: [],
        },
        events:{
            type: [String],
            default: [],
        
        },
        projects:{
            type: [String],
            default: [],
        
        },
        tasks:{
            type :[{title:String, description:String}],
            default:[],
        },
    },
    {timestamps:true}
    );


   
     
    
    
const User = mongoose.model('User', userSchema);
module.exports = User;
