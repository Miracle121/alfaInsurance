const {Schema,model} = require('mongoose')


const productsSchema = new Schema({
    productname:{
        type:String,
        required:true
    },
    codeproduct:{
        type:String,
        required:true
    },
    versionproduct:{
        type:String,
        required:true
    },
    groupofproductsId:{
        type: Schema.Types.ObjectId,
        ref: 'Groupsofproducts',
        required: true
    },
    subgroupofproductsId:{
        type: Schema.Types.ObjectId,
        ref: 'Subgroupofproducts',
        required: true
    },

    // formofinsurerId:{ 
    //     // endi qilinadi
    //     type: Schema.Types.ObjectId,
    //     ref: 'formofinsurer',
    //     required: true
    // },

    typeofsectorId:{
        type: Schema.Types.ObjectId,
        ref: 'Typeofsector',
        required: true
    },
    isrequirepermission:{
        type:Boolean,
        required:true
    },
    typeofinsurerId:{
        type: Schema.Types.ObjectId,
        ref: 'Typeofinsurer',
        required: true
    },
    statusofproducts:{
        type: Schema.Types.ObjectId,
        ref: 'Statusofproducts',
        required: true
    },
    riskId:[{
      riskgroup:{
        type: Schema.Types.ObjectId,
        ref: 'Typeofrisks',
        required: true         
        },
      risk:{ 
        type: Schema.Types.ObjectId,
        ref: 'Risks',
        required: true
        }
    } ],
    //======page 2=======
    isapplicationform:{
        type:Boolean,
        required:true
    },
    applicationformId:[{ 
            type: Schema.Types.ObjectId,
            ref: 'Applicationformdocs', 
            required: true
        }],
    iscontractform:{
        type:Boolean,
        required:true
    },
    contractform:[
        [{
            type: Schema.Types.ObjectId,
            ref: 'Contractformdocs', 
            required: true
        }]
    ],
    Isadditionaldocuments:{
        type:Boolean,
        required:true
    },
    additionaldocuments:[{ 
            type: Schema.Types.ObjectId,
            ref: 'additionaldocuments', 
            required: true
        }],
    //=====page 3==== 
    Isfixedpolicyholder:{
        type:Boolean,
        required:true
    }, 
    fixedpolicyholder: [ { // endi qilinadi
            type: Schema.Types.ObjectId,
            ref: 'fixedpolicyholde', 
            required: true
        }],
    Isbeneficiary:{
            type: Boolean,            
            required: true
        },    
    Isfixedbeneficiary:
    {
        type: Boolean,            
        required: true
    },
    fixedbeneficiary: [{ // endi qilinadi
            type: Schema.Types.ObjectId,
            ref: 'beneficiary', // endi qilinadi
            required: true
        }],  
    Isfixedpremium:{
        type: Boolean,            
        required: true
    },
    fixedpremium:{
        type:Number,
        required:true
    },
    Isbettingrange:{
        type:Boolean,
        required:true
    },
    Isfixedrate:{
        type:Boolean,
        required:true
    },
    fixedrate:{
        type:String,
        required:true
    },
    Isfixedsuminsured:{
        type:Boolean,
        required:true
    },
    fixedsuminsured:{
        type:Number,
        required:true
    },
    Isfixedfee:{
        type:Boolean,
        required:true
    },
    fixedfee:{
        type:Number,
        required:true
    },
    Isfixedpreventivemeasures:{
        type:Boolean,
        required:true
    },
    fixedpreventivemeasures:{
        type:Number,
        required:true
    },
    Ispolicywithoutpayment:{
        type:Boolean,
        required:true
    },
    Ismultipleagents:{
        type:Boolean,
        required:true
    },
    Isfranchisechange:{
        type:Boolean,
        required:true
    },
    Isforeigncurrency:{
        type:Boolean,
        required:true
    },
    policyformatId:{
        type: Schema.Types.ObjectId,
        ref: 'Policyformats',
        required: true
    },
    typeofclaimsettlement:{   
        type: Schema.Types.ObjectId,
        ref: 'Typeofclaimsettlement',
        required: true
    },
    typeofrefund:[ 
        {
        type: Schema.Types.ObjectId,
        ref: 'Typeofrefund',
        required: true

        }
    ],
    typeofpayment:[{   
        type: Schema.Types.ObjectId,
        ref: 'Typeofpayments',
        required: true
    }],
    typeofpolice:[{   
        type: Schema.Types.ObjectId,
        ref: 'Typeofpolice',
        required: true
    }],
    minimumterminsurance:{
        type:Number,
        required:true
    },
    maxterminsurance:{
        type:Number,
        required:true
    },
  //==== page 4==========
//==========tarif==========
    agentlist:[{ // endi qilinadi
        type: Schema.Types.ObjectId,
        ref: 'agents',
        required: true
    }],
    Isagreement:{
        type:Boolean,
        required: true
    },
    limitofagreement:{
        type:Number,
        required: true
    },
    tariffperclasses:[{
    classes:{ // ulash kerak
        type: Schema.Types.ObjectId,
        ref: 'Classesofproduct',
        required: true
    },
   max: {
        type:Number,
        required: true
    },
    min:{   type:Number,
        required: true
    }}
],
//======================Франшиза======================
    franchise:[{
    risk:{
        type: Schema.Types.ObjectId,
        ref: 'Risks',
        required: true
    },
    Isfranchise:{
        type:Boolean,
        required: true
    },
    Isfixedfranchise:{
        type:Boolean,
        required: true
    },
    fixedvalue:{
        type:Number,
        required: true
    },
    typeoffranchise:{// endi qilinadi
        type: Schema.Types.ObjectId,
        ref: 'typeoffranchise',
        required: true
    },
    baseoffranchise:{
        // endi qilinadi
        type: Schema.Types.ObjectId,
        ref: 'baseoffranchise',
        required: true
    },
    franchise:{
         // endi qilinadi
         type: Schema.Types.ObjectId,
         ref: 'franchise',
         required: true
    }


    }],   
   creatorId:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }  
},
{ timestamps:true })

module.exports = model('Products',productsSchema)