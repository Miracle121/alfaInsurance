const {Schema,model} = require('mongoose')


const agentsSchema = new Schema({
    inn:{
        type:String,
        unique:true,
        required:true
    },
    typeofpersons:{
        type: Schema.Types.ObjectId,
        ref: 'Typeofpersones',
        required:true
    },
    regionId:{
        type: Schema.Types.ObjectId,
        ref: 'Region'            
     },    
    isbeneficiary:{
        type: Schema.Types.ObjectId,
        ref: 'Products'
     },
    isfixedpolicyholde:{
        type: Schema.Types.ObjectId,
        ref: 'Products'
     },
     // endi qilinadi.
    typeofagent:{
        type: Schema.Types.ObjectId,
        ref: 'Typeofagent'
     },  
    forindividualsdata:[{
        fullname:{
            type:String
        },
        passportSeries:  {
            type:String
         },
        pinId:{
            type:String           
        },
        passportissuancedate:{
            type:String
        },
        passportissuedby:{
            type:String
        },
        dateofbirth:{
            type:Date
        },
        numberofcard:{
            type:String
        }       
    }],
    corporateentitiesdata:[{
        nameoforganization:{
            type:String            
        },
        oked:{
            type:String
        },
        mfo:{
            type:String
        },
        bank:{
            type:String
        },
        scheduledaccount:{
            type:String
        }
     }],
    address:{
        type:String
     },
    creatorId:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }      
},
{ timestamps:true })

module.exports = model('Agents',agentsSchema)