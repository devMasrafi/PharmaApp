const express = require("express");
// const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();



router.post("/add-staff", async (req, res)=>{
    try {
        
        // if(req.user.role !== "admin"){
        //     return res.json({message: "Access Denied: admin only"});
        // }
        const {email, password} = req.body

        const hashedPassword = await bcrypt.hash(password, 10)


        const newUser = new User({
            email,
            password: hashedPassword,
            role: "staff"
        })


        await newUser.save();
        res.json({message: "new staff added successfully"})


    } catch (error) {
        res.json({message: "Failed to add staff"})
    }
})

module.exports = router