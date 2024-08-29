const mongoose=require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema(
    {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            auto: true,

        },
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


    //pour comparer mdp
    userSchema.methods.comparePassword = async function(candidatePassword){
        return await bcrypt.compare(candidatePassword, this.password);
    };

    userSchema.methods.register = function(){
        return { message: "User register", userId: this.id };
    };
    
    userSchema.methods.login = function(){
        return { message: "User logged in", userId: this.id };
    };
    
    userSchema.methods.logout = function() {
        return { message: "User logged out" };
    };
      userSchema.methods.updateProfile = function(updatedData) {
        Object.assign(this, updatedData);
        return this.save();
    };
      
     
    
    
const User = mongoose.model('User', userSchema);
module.exports = User;
