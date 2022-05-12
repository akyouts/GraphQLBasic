const mongoose = require('mongoose')


const EventSchema = new mongoose.Schema({

            title:{
                type:String,
                required:true
            },
            description:{
                type:String,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
            date:{
                type:Date
            },
            creator :{
                type: mongoose.Schema.Types.ObjectId,
                required:true,
                ref : "User"
            }

})

module.exports = mongoose.model('Event',EventSchema)