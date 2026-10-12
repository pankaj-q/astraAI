const registerUser = (async(req, res) => {
    const {name , email, password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({
            message: "name email and password are required while registering"
        })
    }
    const user = await user.fineOne({email});
    if(user){
        res.status(400).json({
            message: "user already registered with this email please login"
        })
    }
    const newUser = await user.create({
        name, email, password
    })
    res.status(201).json({
        success: true,
        message: "User registered Successfully",
        user: user
    })
})
export default {
  registerUser
}