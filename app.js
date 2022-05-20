const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path')
const cors = require('cors')
// const session = require('express-session');
const region = require('./routes/regions');
const districts = require('./routes/districts')
const mfy = require('./routes/mfy')
const users = require('./routes/users')
const auth = require('./routes/auth')
const groupsofproducts = require('./routes/groupsofproducts')
const subgroupsofproducts = require('./routes/subgroupofproducts')
const typeofinsurer = require('./routes/typeofinsurer')
const statusofproduct = require('./routes/statusofproduct')
const policyformats = require('./routes/policyformats')
const typeofsector = require('./routes/typeofsector')
const classes = require('./routes/classes')
const subclasses = require('./routes/subclasses')
const role = require('./routes/role')
const typeofrisks = require('./routes/typeofrisks')
const risks = require('./routes/risks')
const typeofpayment = require('./routes/typeofpayment')
const typeofpolice = require('./routes/typeofpolice')
const typeofobject = require('./routes/typeofobject')
const object = require('./routes/objects')
// const genders =require('./routes/genders')
const app = express();
const URL =  'mongodb://localhost:27017/Alfa'  
//const URL =    'mongodb://mvddb:mvddb123@87.237.235.44:27017/MVD'    //'mongodb://87.237.235.44:27017/MVD'
app.use(cors())
app.use(express.json())
app.use(bodyParser.json());
app.use('images',express.static(path.join(__dirname,'images')))
app.use('/auth',auth)
app.use('/regions',region)
app.use('/districts',districts)
app.use('/mfy',mfy)
app.use('/groupsofproducts',groupsofproducts)
app.use('/subgroupsofproducts',subgroupsofproducts)
app.use('/typeofinsurer',typeofinsurer)
app.use('/statusofproduct',statusofproduct)
app.use('/policyformats',policyformats)
app.use('/typeofsector',typeofsector)
app.use('/classes',classes)
app.use('/subclasses',subclasses)
app.use('/role',role)
app.use('/typeofrisk',typeofrisks)
app.use('/risk',risks)
app.use('/typeofpolice',typeofpolice)
app.use('/typeofpayment',typeofpayment)
app.use('/typeofobject',typeofobject)
app.use('/object',object)



app.use('/user',users)
app.use((error,req,res,next)=>{   
    const status = error.statusCode || 500
    const message = error.message
    const data = error.data
    res.status(status).json({
        message: message,
        data:data
    })
})
mongoose.connect(URL,{ useUnifiedTopology: true ,useNewUrlParser: true})
.then(result=>{
     app.listen(3000);
})
.catch(err => console.log(err))
