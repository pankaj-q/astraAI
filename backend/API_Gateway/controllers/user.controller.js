import protect from "../middleware/auth.middleware.js"

export const getCurrentUser = async(req,res) => {
   return res.status(200).json(req.user) 
}