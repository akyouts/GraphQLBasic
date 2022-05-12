const bcrypt = require('bcrypt');

const EventsModel = require('../../models/Events');
const UserModel = require('../../models/User');

const userData = async  userId =>{
    try {
        
       const response = await UserModel.findById(userId);
        return { ...response._doc,_id:userData.id,events:events.bind(this,response._doc.events) };
        
    } catch (error) {
        throw error
    }
}

const events = async eventIds =>{
    try {
        const eventData = await EventsModel.find({_id : {$in:eventIds}})
        return eventData.map(ele => {
            return { ...ele._doc,id:ele.id,creator:userData.bind(this,(ele._doc.creator).toString()) }
        })
    } catch (error) {
        throw err
    }
}

module.exports = {
    events: async () => {
        try {
            const response = await EventsModel.find()
            var data = response.map((ele)=>{
                
                 return { ...ele._doc,
                    _id:ele.id,
                    creator:userData.bind(this,(ele._doc.creator).toString()) }
            })
            return data
        } catch (error) {
            throw error
        }
       
            
            // return (res.map((ele)=>{
            //     return { ...ele , 
            //         creator: userData.bind(this, ele._id)
            //      }
            // }))
            
        
    },
    createEvent: async (args) => {
        try {

            const checkExisting = await UserModel.findOne({_id: args.eventInput.creator})
            if (! checkExisting) {
                throw new Error('User not exist')
            } else {

                const newEvent = {

                    title: args.eventInput.title,
                    description: args.eventInput.description,
                    price: args.eventInput.price,
                    date: new Date().toISOString(),
                    creator: args.eventInput.creator
                }

                const response = await EventsModel.create(newEvent)
                checkExisting.events.push(response._id)
                checkExisting.save();
                return response
            }

        } catch (error) {
            throw error
        }


    },
    createUser: async (args) => {
        let {email, password} = args.userInput;
        try {
            const checkExisting = await UserModel.findOne({email})
            if (checkExisting) {
                throw new Error('User already exist')
            }
            password = await bcrypt.hash(password, 10);
            const newUser = {
                email,
                password
            }
            const response = await UserModel.create(newUser)
            response.password = null
            return response

        } catch (error) {
            throw error
        }


    }
}