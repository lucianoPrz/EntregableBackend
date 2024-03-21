export const checkRole = (roles)=>{
    return (req,res,next)=>{
        if(roles[0].toUpperCase()==="PUBLIC") return next();
        if(!req.user){
            return res.status(401).send({status:"error", message:"necesitas estar autenticado"});
        }
        if(!roles.includes(req.user.role)){
            return res.status(403).send({status:"error", message:"no estas autorizado"});
        }
        next();
    }
}