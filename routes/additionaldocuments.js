const express = require('express')
const {body} = require('express-validator')
const additionaldocuments = require('../controllers/additionaldocuments')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,additionaldocuments.getadditionaldocuments)
router.get('/:id',IsAuth,additionaldocuments.getAdditionaldocumentsById)

router.post('/',IsAuth,[body('name').trim().isLength({min:3})],additionaldocuments.createAdditionaldocuments)
router.put('/:id',IsAuth,additionaldocuments.updateAdditionaldocuments)
router.delete('/:id',IsAuth,additionaldocuments.deleteAdditionaldocuments)


module.exports = router