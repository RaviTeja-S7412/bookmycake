const db = require('../../connection.js').getDb();
const multer  = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
//        cb(null, '../uploads/users')  // live path
        cb(null, './uploads/props')  // local path   
    },
    filename: function (req, file, cb) {
        // You could rename the file name
        cb(null, Date.now() + path.extname(file.originalname))

        // You could use the original name
        // cb(null, file.originalname)
    }
});
var upload = multer({storage: storage})

// categories
exports.create_prop = [upload.single("file"),function(req,res){
    
    if(!req.body.prop_cat_id){
        return res.status(202).json({ message: "Prop Category is Required." });
    }
    if(!req.body.prop_name){
        return res.status(202).json({ message: "Prop Name is Required." });
    }
   
    if(!req.body.price){
        return res.status(202).json({ message: "Prop Price is Required." });
    }
   
    let prop_image = "";
    if(!req.file){
        return res.status(202).json({ message: "Prop Image is Required." });
    }else{
        prop_image = "props/"+req.file.filename;
    }


    const query = "INSERT INTO tbl_props (prop_cat_id, prop_name, price, prop_image, is_popular, status, created_date) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [req.body.prop_cat_id, req.body.prop_name, req.body.price, prop_image, req.body.is_popular, 1, new Date()];
    
    db.query(query, values, function (err, result) {
    
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
              return res.status(202).json({ message: 'Prop name already exists' });
            }
            return res.status(500).json({ message: 'Database error' });
        }

        if (result) {
            return res.status(200).json({
                message: "Created Successfully"
            })
        }
    });
}]

exports.update_prop = [upload.single("file"),function(req,res){

    if(!req.body.prop_name){
        return res.status(202).json({ message: "Prop Name is Required." });
    }

    if(!req.body.price){
        return res.status(202).json({ message: "Prop Price is Required." });
    }

    let prop_image = "";
    if(!req.file){
        prop_image = req.body.old_image;
    }else{
        prop_image = "props/"+req.file.filename;
    }


    const checkPropQuery = 'SELECT * FROM tbl_props WHERE prop_name = ? and id != ?';
    db.query(checkPropQuery, [req.body.name, req.body.id], (err, results) => {
        if (err) {
            return callback(err);
        }
        if (results.length > 0) {
            return res.status(202).json({ message: 'Prop name already exists' });
        }else{
            const query = "UPDATE tbl_props SET prop_cat_id = ?, prop_name = ?, prop_image = ?, price = ?, is_popular = ?, updated_at = ? where id = ?";
            const values = [req.body.prop_cat_id, req.body.prop_name, prop_image, req.body.price, req.body.is_popular, new Date(), req.body.id];

            
            db.query(query, values, function (err, result) {
            
                if (err) {
                    return res.status(500).json({ error: err });
                }

                if (result) {
                    return res.status(200).json({
                        message: "Updated Successfully"
                    })
                }
            });
        }

    })
}]

exports.deleteprop = (req, res) => {

    const { id } = req.params;
    if(!id){
        return res.status(202).json({ message: "Prop ID is Required." });
    }

    const checkPropQuery = 'DELETE FROM tbl_props WHERE id = ?';
    db.query(checkPropQuery, [id], (err, result) => {

        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
    
        if (result.affectedRows === 0) {
            return res.status(202).json({ message: 'Prop not found' });
        }
        
        return res.status(200).json({ message: "Prop Deleted Successfully" });
        
    });

}

exports.get_singleprop = (req, res) => {

    const id = req.body.id;
    if(!id){
        return res.status(202).json({ message: "Prop ID is Required." });
    }

    const checkPropQuery = 'SELECT * FROM tbl_props WHERE id = ?';
    db.query(checkPropQuery, [req.body.id], (err, result) => {
        if (err) {
            return callback(err);
        }

        if (result.length > 0) {
            return res.status(200).json({ prop_data: result[0] });
        }else{
            return res.status(202).json({ message: "Prop Not Found." });
        }

    });

}



exports.get_allprops = (req, res) => {

    db.query("SELECT * FROM tbl_props WHERE status=1 order by id desc", function (error, result) {    

        if(error){
            return res.status(202).json({message:error});
        }

        return res.status(200).json({
            props: result,
        });   
    })
}



















