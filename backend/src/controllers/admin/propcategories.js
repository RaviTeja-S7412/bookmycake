const db = require('../../connection.js').getDb();
const multer  = require('multer');
const path = require('path');


// categories
exports.create_propcategory = [function(req,res){
    
    if(!req.body.category_name){
        return res.status(202).json({ message: "Prop Category Name is Required." });
    }


    const query = "INSERT INTO tbl_prop_category (category_name, status, created_date) VALUES (?, ?, ?)";
    const values = [req.body.category_name, 1, new Date()];
    
    db.query(query, values, function (err, result) {
    
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
              return res.status(202).json({ message: 'Prop Category name already exists' });
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

exports.update_propcategory = [function(req,res){

    if(!req.body.category_name){
        return res.status(202).json({ message: "Prop Category Name is Required." });
    }


    const checkpropCategoryQuery = 'SELECT * FROM tbl_prop_category WHERE category_name = ? and id != ?';
    db.query(checkpropCategoryQuery, [req.body.category_name, req.body.id], (err, results) => {
        if (err) {
            return callback(err);
        }

        if (results.length > 0) {
            return res.status(202).json({ message: 'PropCategory name already exists' });
        }else{
            
            const query = "UPDATE tbl_prop_category SET category_name = ? where id = ?";
            const values = [req.body.category_name, new Date(), req.body.id];
            
            db.query(query, values, function (err, result) {
            
                if (err) {
                    return res.status(500).json({ message: err });
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

exports.deletepropcategory = (req, res) => {

    const { id } = req.params;
    if(!id){
        return res.status(202).json({ message: "PropCategory ID is Required." });
    }

    const checkpropCategoryQuery = 'DELETE FROM tbl_prop_category WHERE id = ?';
    db.query(checkpropCategoryQuery, [id], (err, result) => {

        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
    
        if (result.affectedRows === 0) {
            return res.status(202).json({ message: 'PropCategory not found' });
        }
        
        return res.status(200).json({ message: "PropCategory Deleted Successfully" });
        
    });

}

exports.get_singlepropcategory = (req, res) => {

    const id = req.body.id;
    if(!id){
        return res.status(202).json({ message: "PropCategory ID is Required." });
    }

    const checkpropCategoryQuery = 'SELECT * FROM tbl_prop_category WHERE id = ?';
    db.query(checkpropCategoryQuery, [req.body.id], (err, result) => {
        if (err) {
            return callback(err);
        }

        if (result.length > 0) {
            return res.status(200).json({ propcategory_data: result[0] });
        }else{
            return res.status(202).json({ message: "PropCategory Not Found." });
        }

    });

}

exports.get_allpropcategories = (req, res) => {

    db.query("SELECT * FROM tbl_prop_category WHERE status=1 order by id desc", function (error, result) {    

        if(error){
            return res.status(202).json({message:error});
        }

        return res.status(200).json({
            propcategories: result,
        });   
    })
}

