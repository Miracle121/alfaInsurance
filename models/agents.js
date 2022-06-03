const {Schema,model} = require('mongoose')


const agentsSchema = new Schema({
    fullName:{
        type:String,
        required:true
    },
    inn:{
        type:String,
        required:true
    },
    pin:{
        type:String,
        required:true
    },
    typeofpersons:{
        type: Schema.Types.ObjectId,
        ref: 'Typeofpersones',
        required:true
    },
    regionId:{
        type: Schema.Types.ObjectId,
        ref: 'Region',
        required:true      
     },
     districtsId:{
        type: Schema.Types.ObjectId,
        ref: 'Districts'      
     },
     isbeneficiary:{
        type: Schema.Types.ObjectId,
        ref: 'Products'
     },
     isfixedpolicyholde:{
        type: Schema.Types.ObjectId,
        ref: 'Products'
     },

   
    creatorId:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }  
},
{ timestamps:true })

module.exports = model('Agents',agentsSchema)