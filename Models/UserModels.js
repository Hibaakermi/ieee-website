const mongoose=require("mongoose")
//const bcrypt = require("bcrypt")

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
      
      userSchema.methods.sendMessage = function(to, content) {
        this.messages.push({ from: this.username, content });
        return this.save();
    };
      
      userSchema.methods.viewMessages = function(){
        return this.messages;
    };
      
      userSchema.methods.joinEvent = function(eventId) {
        if (!this.events.includes(eventId)) {
            this.events.push(eventId);
        }
        
        return this.save();
    };
      
      userSchema.methods.leaveEvent = function(eventId) {
        this.events = this.events.filter(event => event !== eventId);
        return this.save();
    };
      
      userSchema.methods.joinProject = function(projectId) {
        if (!this.projects.includes(projectId)){
          this.projects.push(projectId);
        }
        
        return this.save();
    };
      
      userSchema.methods.leaveProject = function(projectId) {
        this.projects = this.projects.filter(project => project !== projectId);
        return this.save();
    };
      
      userSchema.methods.createTask = function(task) {
        this.tasks.push(task);
        return this.save();
    };
      
      userSchema.methods.updateTask = function(taskId, updatedTask) {
        const task = this.tasks.id(taskId);
        if (task) {
          Object.assign(task, updatedTask);
          return this.save();
        }
        throw new Error("Task not found");
    };

      
      userSchema.methods.provideFeedback = function(feedback) {
        this.achievements.push(feedback);
        return this.save();
    };

      
      userSchema.methods.viewAchievements = function() {
        return this.achievements;
    };
      
      userSchema.methods.checkActivityScore = function() {
        return this.activityScore;
    };

    
    
const User = mongoose.model('User', userSchema);
module.exports = User;
