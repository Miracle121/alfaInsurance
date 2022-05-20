const {Schema,model} = require('mongoose')

const districtsSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    viewBox:{
        type:String
    },
    pathd:{
        type:String
    }, 
    transform:{
        type:String
    },
    regiId:{
        type: Schema.Types.ObjectId,
        ref: 'Region',
        required: true
    },
    circle:{
        type:String
    },
    mfy:[{
        type:Schema.Types.ObjectId,
        ref:'Mfy'
    }],  
    creatorId:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }  
},
{ timestamps:true })

module.exports = model('Districts',districtsSchema)