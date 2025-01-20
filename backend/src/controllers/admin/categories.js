const db = require('../../connection.js').getDb();
const multer  = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
//        cb(null, '../uploads/users')  // live path
        cb(null, './uploads/categories')  // local path   
    },
    filename: function (req, file, cb) {
        // You could rename the file name
        cb(null, Date.now() + path.extname(file.originalname))

        // You could use the original name
        // cb(null, file.originalname)
    }
});

var upload = multer({storage: storage})
exports.create_category = [upload.single("file"),function(req,res){
    
    if(!req.body.category_name){
        return res.status(202).json({ message: "Category Name is Required." });
    }

    let category_image = "";
    if(!req.file){
        return res.status(202).json({ message: "Category Image is Required." });
    }else{
        category_image = "categories/"+req.file.filename;
    }

    var category_route = req.body.category_name
                        .toLowerCase()          // Convert to lowercase
                        .replace(/\s+/g, '-')    // Replace spaces with hyphens
                        .replace(/[^\w\-]+/g, '') // Remove any non-alphanumeric characters, except hyphens
                        .replace(/--+/g, '-')    // Replace multiple hyphens with a single hyphen
                        .replace(/^-+/, '')      // Remove leading hyphen
                        .replace(/-+$/, '');

    const query = "INSERT INTO tbl_categories (category_name, category_image, route, status, deleted, created_date) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [req.body.category_name, category_image, category_route, 1, 0, new Date()];
    
    db.query(query, values, function (err, result) {
    
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
              return res.status(202).json({ error: 'Category name already exists' });
            }
            return res.status(500).json({ error: 'Database error' });
        }

        if (result) {
            return res.status(200).json({
                message: "Created Successfully"
            })
        }
    });
}]

exports.update_category = [upload.single("file"),function(req,res){

    if(!req.body.category_name){
        return res.status(202).json({ message: "Category Name is Required." });
    }

    let category_image = "";
    if(!req.file){
        category_image = req.body.old_image;
    }else{
        category_image = "categories/"+req.file.filename;
    }

    var category_route = req.body.category_name
                        .toLowerCase()          // Convert to lowercase
                        .replace(/\s+/g, '-')    // Replace spaces with hyphens
                        .replace(/[^\w\-]+/g, '') // Remove any non-alphanumeric characters, except hyphens
                        .replace(/--+/g, '-')    // Replace multiple hyphens with a single hyphen
                        .replace(/^-+/, '')      // Remove leading hyphen
                        .replace(/-+$/, '');

    const checkCategoryQuery = 'SELECT * FROM tbl_categories WHERE category_name = ? and id != ?';
    db.query(checkCategoryQuery, [req.body.category_name, req.body.id], (err, results) => {
        if (err) {
            return callback(err);
        }

        if (results.length > 0) {
            return res.status(202).json({ error: 'Category name already exists' });
        }else{
            
            const query = "UPDATE tbl_categories SET category_name = ?, category_image = ?, route = ?, updated_date = ? where id = ?";
            const values = [req.body.category_name, category_image, category_route, new Date(), req.body.id];
            
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

exports.deletecategory = (req, res) => {

    const { id } = req.params;
    if(!id){
        return res.status(202).json({ message: "Category ID is Required." });
    }

    const checkCategoryQuery = 'DELETE FROM tbl_categories WHERE id = ?';
    db.query(checkCategoryQuery, [id], (err, result) => {

        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
    
        if (result.affectedRows === 0) {
            return res.status(202).json({ message: 'Category not found' });
        }
        
        return res.status(200).json({ message: "Category Deleted Successfully" });
        
    });

}

exports.get_singlecategory = (req, res) => {

    const id = req.body.id;
    if(!id){
        return res.status(202).json({ message: "Category ID is Required." });
    }

    const checkCategoryQuery = 'SELECT * FROM tbl_categories WHERE id = ?';
    db.query(checkCategoryQuery, [req.body.id], (err, result) => {
        if (err) {
            return callback(err);
        }

        if (result.length > 0) {
            return res.status(200).json({ category_data: result[0] });
        }else{
            return res.status(202).json({ message: "Category Not Found." });
        }

    });

}

exports.get_allcategories = (req, res) => {

    db.query("SELECT * FROM tbl_categories WHERE status=1 and deleted=0 order by id desc", function (error, result) {    

        if(error){
            return res.status(202).json({message:error});
        }

        return res.status(200).json({
            categories: result,
        });   
    })
}

