const db = require("../../connection.js").getDb()

exports.get_cake_collection = (req,res)=>{

    db.query(`SELECT * FROM tbl_cake_collection`,(err,result)=>{
        if(err){
            throw new err;
        }
        console.log(result,"result");
        return res.status(200).json({
            data:result
        })
    })
}