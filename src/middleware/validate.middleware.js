const validate = (Schema) =>async  (req,res,next)=>{
    try{
const parsebady = await Schema.parseAsync(req.body)
req.body = parsebady
next()
    }

    catch(err){

        const message = err.errors[0].message
        console.log("msgerror from validation",message,err)
res.status(400).json({msg:message})
    }
}


// module.exports  = validate

export default validate