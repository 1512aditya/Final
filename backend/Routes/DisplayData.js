const express = require('express')
const router = express.Router()


router.post('/foodData', async (req, res) => {
        try {
            
            res.send([global.sample,global.foodCatagory])
        } catch (error) {
            console.error(error.message)
            res.send("Server Error")
    
        }
    })

    module.exports = router;