const {Schema,model} = require('mongoose')

const risksSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    typeofrisksId:{
        type: Schema.Types.ObjectId,
        ref: 'Typeofrisks',
        required: true
    },
    creatorId:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }  
},
{ timestamps:true })

module.exports = model('Risks',risksSchema)