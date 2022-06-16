const Agents = require('../models/agents')
const User = require('../models/users')
const {validationResult} = require('express-validator')

exports.getAgents= async(req,res,next)=>{
    const page = req.query.page ||1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
     totalItems = await Agents.find().countDocuments()
     const data = await Agents.find()
     .populate('typeofpersons','name')
     .populate('regionId','name')
     .populate('districtsId','name')
     .skip((page-1)*counts).limit(counts)
     res.status(200).json({
         message:`Agents List`,
         data:data,
         totalItems:totalItems
     })
    } catch (err) {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    } 
}

exports.getAgentsById = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const result= await Agents.findById(AgesId)
        if(!result){
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message:`Agents List`,
            data:result
        })
    } catch (err) {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    }
}

exports.createAgents = async(req,res,next)=>{
    const name = req.body.fullName
    const inn =req.body.inn
    const pin= req.body.pin
    const typeofpersons= req.body.typeofpersons
    const regionId= req.body.regionId
    const districtsId = req.body.districtsId
    const isbeneficiary= req.body.isbeneficiary
    const isfixedpolicyholde = req.body.isfixedpolicyholde 
    const result = new Agents({
        name:name,
        inn:inn,
        pin:pin,
        typeofpersons:typeofpersons,
        regionId:regionId,
        districtsId:districtsId,
        isbeneficiary:isbeneficiary,
        isfixedpolicyholde:isfixedpolicyholde,
        creatorId: req.userId
    })
    const results = await result.save()
    res.status(200).json({
        message:`Agents List`,
        data: results,
        creatorId: req.userId,
    })
}

exports.updateAgents = async(req,res,next)=>{ 
    const AgesId = req.params.id
    const name = req.body.name
    const url = req.body.url
    try {
    const result = await Agents.findById(AgesId)
    if(!result){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    result.name= name
    result.url=url
    const data =await result.save()  
    res.status(200).json({
        message:`Agents List`,
        data: data
    })
    } catch (err) {
        if(!err.statusCode){
            const error = new Error('Intenall error11111')
            error.statusCode = 500
            throw error
        }
        next(err)
    }
}

exports.deleteAgents = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const deleteddata = await Agents.findById(AgesId)
    if(!deleteddata){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    if(deleteddata.creatorId.toString()!==req.userId){
        const error = new Error('bu userni ochirishga imkoni yoq')
        error.statusCode =403
        throw error
    }
    const data=await Agents.findByIdAndRemove(AgesId)
    res.status(200).json({
        message:'Region is deletes',
        data:data   
    })
    } catch (err) {
        if(!err.statusCode){
            err.statusCode =500
        }
        next(err)
    }
}