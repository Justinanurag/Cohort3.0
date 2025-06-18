const jwt=require('jsonwebtoken');

const auth=(req,res,next)=>{
     const token = req.header('Authorization')?.replace('Bearer ', '');
     if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
     try{
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decode.userId;
        next();
     
    } catch(error){
        res.status(401).json({msg:'Token is invalid '});
    }
};
module.exports=auth;