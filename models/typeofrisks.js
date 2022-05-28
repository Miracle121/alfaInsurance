const {Schema,model} = require('mongoose')

const typeofrisksSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    classesId:{
        type: Schema.Types.ObjectId,
        ref: 'Classesofproduct',
    },
    creatorId:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }  
},
{ timestamps:true })

module.exports = model('Typeofrisks',typeofrisksSchema)