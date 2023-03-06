const jwt = require('jsonwebtoken');

let auth=(req,res,next)=>{
    if (req.method==='OPTIONS') return next()

    try{
        const token=req.headers.authorization.split(' ')[1] //Bearer TOKEN

        if(!token) return res.status(400).json({message: 'Вы не авторизованны'})
        const decoded = jwt.verify(token,'TopSecret')
        req.user=decoded
        next()
    }catch(e){
        res.status(401).json({message: "Нет авторизации"})
    }
}
export default auth