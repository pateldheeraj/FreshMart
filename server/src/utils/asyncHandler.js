const asyncHandler = (requestHandler) => {
    return (req,res,next)=>{
         Promise.resolve(requestHandler(req,res,next)).catch((error)=> {
            return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        }) 
    })
     }
 }
 export {asyncHandler}