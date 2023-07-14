const router = require('express').Router()
const acController = require('../controllers/acController.js')

router.use("/", acController)
router.get("/", (req,res) => {
    res.send("Ola mundo").status(202)
})

module.exports = router
