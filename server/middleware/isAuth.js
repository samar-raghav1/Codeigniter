import  jwt from 'jsonwebtoken';



export const isAuth = async (req,res,next)=>{
try {
    const token = req.headers.authorization;
    console.log(token)

    if(!token){
        return res.status(400).json({message:"token not found"})

    }
    const verifyToken = await jwt.verify(token, process.env.JWT_SECRET)

    req.user = verifyToken.userId
     next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"is Auth error"})
    }

    }

