const User = require('../models/users')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.signupUsers = (req,res,next)=>{   

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = new Error('Validation error')
        error.statusCode = 422
        error.data = errors.array()
        throw error
    }
    const name = req.body.name
    const secondname = req.body.secondname
    const middlename = req.body.middlename
    const  photos =req.body.photos
    const position = req.body.position
    const regionId = req.body.regionId
    const districtsId = req.body.districtsId
    const mfyId =req.body.mfyId 
    const status = req.body.status
    const role =req.body.role
    const email = req.body.email  
    const password= req.body.password
  


    bcrypt.hash(password,12)
    .then(hashpass=>{
        const user = new User({
            email:email,
            password:hashpass,
            name:name,
            secondname:secondname,
            middlename:middlename,
            photos:photos,
            position:position,
            regionId:regionId,
            districtsId:districtsId,
            mfyId:mfyId,
            accountstatus:status,
            accountrole:role
        })
        return user.save()
    })
    .then(result=>{
        res.status(201).json({
            message:'User bazaga kiritildi',
            result
        })
    })
    .catch(err=>{
        if(!err.statusCode){
            const error = new Error('Intenall error11111')
            error.statusCode = 500
            throw error
        }
        next(err)
    })
}

exports.login = (req,res,next)=>{
    const email = req.body.email
    const password = req.body.password
    let userLoad
    User.findOne({email:email})
    .then(user=>{
        if(!user){
            const error = new Error('email is not found')
            error.statusCode = 401
            throw error
        }
        //++++++++++=======================================================
        // if(user.accountstatus.toString()!=="61725efc542dc7b6563396a5"){
        //     const error = new Error('Bu login vaqtinchalik blocklangan iltimos administratorga murojat qiling')
        //     error.statusCode = 401
        //     throw error
        // }
        //================================================================
        userLoad =user
        return bcrypt.compare(password,user.password)
    })
    .then(isEqual=>{
        if(!isEqual){
            const error = new Error('email or password wrong')
            error.statusCode = 401
            throw error
        }
        const token = jwt.sign({
           email:userLoad.email,
           userId: userLoad._id.toString(),
           regionId: userLoad.regionId,
           userDestId: userLoad.districtsId
        },
        'testtest!@#123',
        {expiresIn : '5d'})
        res.status(200).json({
            token:token,
            userId: userLoad._id.toString(),
            accountrole: userLoad.accountrole
        })
    })
    .catch(err=>{
        if(!err.statusCode){
            const error = new Error('Intenall error11111')
            error.statusCode = 500
            throw error
        }
        next(err)
    })

}