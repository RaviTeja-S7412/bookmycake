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

// categories
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
              return res.status(202).json({ message: 'Category name already exists' });
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
            return res.status(202).json({ message: 'Category name already exists' });
        }else{
            
            const query = "UPDATE tbl_categories SET category_name = ?, category_image = ?, route = ?, updated_date = ? where id = ?";
            const values = [req.body.category_name, category_image, category_route, new Date(), req.body.id];
            
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

exports.deletecategory = (req, res) => {

    const { id } = req.params;
    if(!id){
        return res.status(202).json({ message: "Category ID is Required." });
    }

    const checkCategoryQuery = 'DELETE FROM tbl_categories WHERE id = ?';
    db.query(checkCategoryQuery, [id], (err, result) => {

        if (err) {
            return res.status(500).json({ message: 'Database error' });
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

// sub categories
exports.create_subcategory = [upload.single("file"),function(req,res){
    
    if(!req.body.category_id){
        return res.status(202).json({ message: "Category is Required." });
    }

    if(!req.body.sub_category_name){
        return res.status(202).json({ message: "Sub Category is Required." });
    }

    let subcategory_image = "";
    if(!req.file){
        return res.status(202).json({ message: "Sub Category Image is Required." });
    }else{
        subcategory_image = "categories/"+req.file.filename;
    }

    var route = req.body.sub_category_name
                        .toLowerCase()          // Convert to lowercase
                        .replace(/\s+/g, '-')    // Replace spaces with hyphens
                        .replace(/[^\w\-]+/g, '') // Remove any non-alphanumeric characters, except hyphens
                        .replace(/--+/g, '-')    // Replace multiple hyphens with a single hyphen
                        .replace(/^-+/, '')      // Remove leading hyphen
                        .replace(/-+$/, '');

    const query = "INSERT INTO tbl_sub_categories (category_id, sub_category_name, sub_category_image, route, status, isCategoryshow, deleted, created_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [req.body.category_id, req.body.sub_category_name, subcategory_image, route, 1, req.body.isCategoryshow, 0, new Date()];
    
    db.query(query, values, function (err, result) {
    
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
              return res.status(202).json({ message: 'Sub Category name already exists' });
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

exports.update_subcategory = [upload.single("file"),function(req,res){

    if(!req.body.category_id){
        return res.status(202).json({ message: "Category is Required." });
    }

    if(!req.body.sub_category_name){
        return res.status(202).json({ message: "Sub Category is Required." });
    }

    let subcategory_image = "";
    if(!req.file){
        subcategory_image = req.body.old_image;
    }else{
        subcategory_image = "categories/"+req.file.filename;
    }

    var route = req.body.sub_category_name
                        .toLowerCase()          // Convert to lowercase
                        .replace(/\s+/g, '-')    // Replace spaces with hyphens
                        .replace(/[^\w\-]+/g, '') // Remove any non-alphanumeric characters, except hyphens
                        .replace(/--+/g, '-')    // Replace multiple hyphens with a single hyphen
                        .replace(/^-+/, '')      // Remove leading hyphen
                        .replace(/-+$/, '');

    const checkCategoryQuery = 'SELECT * FROM tbl_sub_categories WHERE sub_category_name = ? and id != ?';
    db.query(checkCategoryQuery, [req.body.sub_category_name, req.body.id], (err, results) => {
        if (err) {
            return callback(err);
        }

        if (results.length > 0) {
            return res.status(202).json({ message: 'Sub Category name already exists' });
        }else{
            
            const query = "UPDATE tbl_sub_categories SET category_id = ?, sub_category_name = ?, sub_category_image = ?, route = ?, isCategoryshow = ?, updated_date = ? where id = ?";
            const values = [req.body.category_id, req.body.sub_category_name, subcategory_image, route, req.body.isCategoryshow, new Date(), req.body.id];
            
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

exports.delete_sub_category = (req, res) => {

    const { id } = req.params;
    if(!id){
        return res.status(202).json({ message: "Sub Category ID is Required." });
    }

    const checkCategoryQuery = 'DELETE FROM tbl_sub_categories WHERE id = ?';
    db.query(checkCategoryQuery, [id], (err, result) => {

        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
    
        if (result.affectedRows === 0) {
            return res.status(202).json({ message: 'Sub Category not found' });
        }
        
        return res.status(200).json({ message: "Sub Category Deleted Successfully" });
        
    });

}

exports.get_singlesubcategory = (req, res) => {

    const id = req.body.id;
    if(!id){
        return res.status(202).json({ message: "Sub Category ID is Required." });
    }

    const checkCategoryQuery = 'SELECT * FROM tbl_sub_categories WHERE id = ?';
    db.query(checkCategoryQuery, [req.body.id], (err, result) => {
        if (err) {
            return callback(err);
        }

        if (result.length > 0) {
            return res.status(200).json({ subcategory_data: result[0] });
        }else{
            return res.status(202).json({ message: "Sub Category Not Found." });
        }

    });

}

exports.get_allsubcategories = (req, res) => {

    db.query("SELECT tc.category_name, tsc.* FROM tbl_sub_categories as tsc INNER JOIN tbl_categories as tc ON tc.id=tsc.category_id WHERE tsc.status=1 and tsc.deleted=0 order by tsc.id desc", function (error, result) {    

        if(error){
            return res.status(202).json({message:error});
        }

        return res.status(200).json({
            sub_categories: result,
        });   
    })
}

exports.get_subcategoriesbycategoryid = (req, res) => {

    const id = req.body.categoryid;

    const checkCategoryQuery = 'SELECT * FROM tbl_sub_categories WHERE category_id = ?';
    db.query(checkCategoryQuery, [id], (err, result) => {
        if (err) {
            return callback(err);
        }

        if (result.length > 0) {
            return res.status(200).json({ sub_categories: result });
        }else{
            return res.status(202).json({ message: "No Results Found.", show: false });
        }

    });

}

// child categories
exports.create_childcategory = [upload.single("file"),function(req,res){
    
    if(!req.body.category_id){
        return res.status(202).json({ message: "Category is Required." });
    }

    if(!req.body.sub_category_id){
        return res.status(202).json({ message: "Sub Category is Required." });
    }

    if(!req.body.child_category_name){
        return res.status(202).json({ message: "Child Category is Required." });
    }

    let child_category_image = "";
    if(!req.file){
        return res.status(202).json({ message: "Child Category Image is Required." });
    }else{
        child_category_image = "categories/"+req.file.filename;
    }

    var route = req.body.child_category_name
                        .toLowerCase()          // Convert to lowercase
                        .replace(/\s+/g, '-')    // Replace spaces with hyphens
                        .replace(/[^\w\-]+/g, '') // Remove any non-alphanumeric characters, except hyphens
                        .replace(/--+/g, '-')    // Replace multiple hyphens with a single hyphen
                        .replace(/^-+/, '')      // Remove leading hyphen
                        .replace(/-+$/, '');

    const query = "INSERT INTO tbl_child_categories (category_id, sub_category_id, child_category_name, child_category_image, route, status, deleted, created_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [req.body.category_id, req.body.sub_category_id, req.body.child_category_name, child_category_image, route, 1, 0, new Date()];
    
    db.query(query, values, function (err, result) {
    
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
              return res.status(202).json({ message: 'Child Category name already exists' });
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

exports.update_childcategory = [upload.single("file"),function(req,res){

    if(!req.body.category_id){
        return res.status(202).json({ message: "Category is Required." });
    }

    if(!req.body.sub_category_id){
        return res.status(202).json({ message: "Sub Category is Required." });
    }

    if(!req.body.child_category_name){
        return res.status(202).json({ message: "Child Category is Required." });
    }

    let child_category_image = "";
    if(!req.file){
        child_category_image = req.body.old_image;
    }else{
        child_category_image = "categories/"+req.file.filename;
    }

    var route = req.body.child_category_name
                        .toLowerCase()          // Convert to lowercase
                        .replace(/\s+/g, '-')    // Replace spaces with hyphens
                        .replace(/[^\w\-]+/g, '') // Remove any non-alphanumeric characters, except hyphens
                        .replace(/--+/g, '-')    // Replace multiple hyphens with a single hyphen
                        .replace(/^-+/, '')      // Remove leading hyphen
                        .replace(/-+$/, '');

    const checkCategoryQuery = 'SELECT * FROM tbl_child_categories WHERE child_category_name = ? and id != ?';
    db.query(checkCategoryQuery, [req.body.child_category_name, req.body.id], (err, results) => {
        if (err) {
            return callback(err);
        }

        if (results.length > 0) {
            return res.status(202).json({ message: 'Child Category name already exists' });
        }else{
            
            const query = "UPDATE tbl_child_categories SET category_id = ?, sub_category_id = ?, child_category_name = ?, child_category_image = ?, route = ?, updated_date = ? where id = ?";
            const values = [req.body.category_id, req.body.sub_category_id, req.body.child_category_name, child_category_image, route, new Date(), req.body.id];
            
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

exports.delete_child_category = (req, res) => {

    const { id } = req.params;
    if(!id){
        return res.status(202).json({ message: "Child Category ID is Required." });
    }

    const checkCategoryQuery = 'DELETE FROM tbl_child_categories WHERE id = ?';
    db.query(checkCategoryQuery, [id], (err, result) => {

        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
    
        if (result.affectedRows === 0) {
            return res.status(202).json({ message: 'Child Category not found' });
        }
        
        return res.status(200).json({ message: "Child Category Deleted Successfully" });
        
    });

}

exports.get_singlechildcategory = (req, res) => {

    const id = req.body.id;
    if(!id){
        return res.status(202).json({ message: "Child Category ID is Required." });
    }

    const checkCategoryQuery = 'SELECT * FROM tbl_child_categories WHERE id = ?';
    db.query(checkCategoryQuery, [req.body.id], (err, result) => {
        if (err) {
            return callback(err);
        }

        if (result.length > 0) {
            return res.status(200).json({ childcategory_data: result[0] });
        }else{
            return res.status(202).json({ message: "Child Category Not Found." });
        }

    });

}

exports.get_allchildcategories = (req, res) => {

    db.query("SELECT tc.category_name, tsc.sub_category_name, tcc.* FROM tbl_child_categories as tcc INNER JOIN tbl_categories as tc ON tc.id=tcc.category_id INNER JOIN tbl_sub_categories as tsc ON tsc.id=tcc.sub_category_id WHERE tcc.status=1 and tcc.deleted=0 order by id desc", function (error, result) {    

        if(error){
            return res.status(202).json({message:error});
        }

        return res.status(200).json({
            child_categories: result,
        });   
    })
}

exports.get_childcateriesbysubcategoryid = (req, res) => {

    const id = req.body.categoryid;
    const sid = req.body.sub_categoryid;
    if(!id){
        return res.status(202).json({ message: "Category ID is Required." });
    }

    if(!sid){
        return res.status(202).json({ message: "Sub Category ID is Required." });
    }

    const checkCategoryQuery = 'SELECT * FROM tbl_child_categories WHERE category_id = ? & sub_category_id = ?';
    db.query(checkCategoryQuery, [id, sid], (err, result) => {
        if (err) {
            return callback(err);
        }

        if (result.length > 0) {
            return res.status(200).json({ child_categories: result[0] });
        }else{
            return res.status(202).json({ message: "No Results Found." });
        }

    });

}

