const express = require('express')
const router = express.Router()
const {join} = require('./join')
router.get('/', join)

module.exports = router