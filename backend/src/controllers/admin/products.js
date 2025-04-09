const db = require('../../connection.js').getDb();
const multer  = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
//        cb(null, '../uploads/users')  // live path
        cb(null, './uploads/products')  // local path   
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
exports.create_product = [upload.single("file"),function(req,res){
    
    if(!req.body.category_id){
        return res.status(202).json({ message: "Category is Required." });
    }
    if(!req.body.product_name){
        return res.status(202).json({ message: "Product Name is Required." });
    }
    if(!req.body.stock){
        return res.status(202).json({ message: "Stock is Required." });
    }

    let product_image = "";
    if(!req.file){
        return res.status(202).json({ message: "Product Image is Required." });
    }else{
        product_image = "products/"+req.file.filename;
    }

    var product_route = req.body.product_name
                        .toLowerCase()          // Convert to lowercase
                        .replace(/\s+/g, '-')    // Replace spaces with hyphens
                        .replace(/[^\w\-]+/g, '') // Remove any non-alphanumeric characters, except hyphens
                        .replace(/--+/g, '-')    // Replace multiple hyphens with a single hyphen
                        .replace(/^-+/, '')      // Remove leading hyphen
                        .replace(/-+$/, '');

    const query = "INSERT INTO tbl_products (category_id, sub_category_id, product_name, product_image, product_description, ingredients, nutritional_info, shipping, product_size, product_flavor, stock, route, is_size, is_flavor, status, deleted, created_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [req.body.category_id, req.body.sub_category_id, req.body.product_name, product_image, req.body.product_description, req.body.ingredients, req.body.nutritional_info, req.body.shipping, req.body.product_size, req.body.product_flavor, req.body.stock, product_route, req.body.is_size, req.body.is_flavor, 1, 0, new Date()];
    
    db.query(query, values, function (err, result) {
    
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
              return res.status(202).json({ message: 'Product name already exists' });
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

exports.update_product = [upload.single("file"),function(req,res){

    if(!req.body.product_name){
        return res.status(202).json({ message: "Product Name is Required." });
    }
    if(!req.body.product_description){
        return res.status(202).json({ message: "Product Description is Required." });
    }

    let product_image = "";
    if(!req.file){
        product_image = req.body.old_image;
    }else{
        product_image = "products/"+req.file.filename;
    }

    var product_route = req.body.product_name
                        .toLowerCase()          // Convert to lowercase
                        .replace(/\s+/g, '-')    // Replace spaces with hyphens
                        .replace(/[^\w\-]+/g, '') // Remove any non-alphanumeric characters, except hyphens
                        .replace(/--+/g, '-')    // Replace multiple hyphens with a single hyphen
                        .replace(/^-+/, '')      // Remove leading hyphen
                        .replace(/-+$/, '');

    const checkCategoryQuery = 'SELECT * FROM tbl_products WHERE product_name = ? and id != ?';
    db.query(checkCategoryQuery, [req.body.category_name, req.body.id], (err, results) => {
        if (err) {
            return callback(err);
        }

        if (results.length > 0) {
            return res.status(202).json({ message: 'Product name already exists' });
        }else{
            const query = "UPDATE tbl_products SET category_id = ?, sub_category_id = ?, product_name = ?, product_image = ?, product_description = ?, ingredients = ?, nutritional_info = ?, shipping = ?, product_size = ?, product_flavor = ?, stock = ?, route = ?, is_size = ?, is_flavor = ?, updated_date = ? where id = ?";
            const values = [req.body.category_id, req.body.sub_category_id, req.body.product_name, product_image, req.body.product_description, req.body.ingredients, req.body.nutritional_info, req.body.shipping, req.body.product_size, req.body.product_flavor, req.body.stock, product_route, req.body.is_size, req.body.is_flavor, new Date(), req.body.id];
            
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

exports.deleteproduct = (req, res) => {

    const { id } = req.params;
    if(!id){
        return res.status(202).json({ message: "Product ID is Required." });
    }

    const checkCategoryQuery = 'DELETE FROM tbl_products WHERE id = ?';
    db.query(checkCategoryQuery, [id], (err, result) => {

        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
    
        if (result.affectedRows === 0) {
            return res.status(202).json({ message: 'Product not found' });
        }
        
        return res.status(200).json({ message: "Product Deleted Successfully" });
        
    });

}

exports.get_singleproduct = (req, res) => {

    const id = req.body.id;
    if(!id){
        return res.status(202).json({ message: "Product ID is Required." });
    }

    const checkCategoryQuery = 'SELECT * FROM tbl_products WHERE id = ?';
    db.query(checkCategoryQuery, [req.body.id], (err, result) => {
        if (err) {
            return callback(err);
        }

        if (result.length > 0) {
            return res.status(200).json({ product_data: result[0] });
        }else{
            return res.status(202).json({ message: "Category Not Found." });
        }

    });

}

exports.get_singleproduct_by_route = (req, res) => {
    
    const route = req.query.route;
    if(!route){
        return res.status(202).json({ message: "Product Route is Required." });
    }

    const checkCategoryQuery = 'SELECT * FROM tbl_products WHERE route =?';
    db.query(checkCategoryQuery, [route], (err, result) => {
        if (err) {
            return callback(err);
        }

        if (result.length > 0) {
            return res.status(200).json({ product_data: result[0] });
        }else{
            return res.status(202).json({ message: "Product Not Found." });
        }

    });
}


exports.get_allproducts = (req, res) => {

    db.query("SELECT * FROM tbl_products WHERE status=1 and deleted=0 order by id desc", function (error, result) {    

        if(error){
            return res.status(202).json({message:error});
        }

        return res.status(200).json({
            products: result,
        });   
    })
}


exports.get_filter_products = (req, res) => {
    const category_id = req.query.category_id;  
    const sub_category_id = req.query.sub_category_id;
    const sort_by = req.query.sort_by;
    const availability_by = req.query.availability_by;
    const min_price = req.query.min_price;
    const max_price = req.query.max_price;

    let conditions = [];
    let values = [];
    let orderBy = "id desc";

    if (sort_by === "alpha_asc") {
        orderBy = "product_name asc";
    }

    if (sort_by === "alpha_desc") {
        orderBy = "LOWER(product_name) desc";
    }

    if (sort_by === "price_asc") {
        orderBy = "JSON_UNQUOTE(JSON_EXTRACT(product_size,'$[*].price')) asc";
    }
    if (sort_by === "price_desc") {
        orderBy = "JSON_UNQUOTE(JSON_EXTRACT(product_size,'$[*].price')) desc";
    }

    if (sort_by === "date_asc") {
        orderBy = "created_date asc";
    }
    if (sort_by === "date_desc") {
        orderBy = "created_date desc";
    }

    if (availability_by === "in-stock") {
        conditions.push("stock > 0");
    }
    if (availability_by === "out-of-stock") {
        conditions.push("stock = 0");
    }

    if (min_price && max_price) {
        conditions.push("CAST(JSON_UNQUOTE(JSON_EXTRACT(product_size, '$[0].price')) AS DECIMAL(10,2)) BETWEEN ? AND ?");
        values.push(min_price, max_price);
    }

    if (sub_category_id) {
        conditions.push("sub_category_id = ?");
        values.push(sub_category_id);
    }

    let query = "SELECT * FROM tbl_products WHERE status=1 and deleted=0";

    if (category_id) {
        // Fetch category_id based on the passed query parameter
        const categoryQuery = "SELECT id FROM tbl_categories WHERE route = ?";
        db.query(categoryQuery, [category_id], function (error, categoryResult) {
            if (error) {
                return res.status(500).json({ message: "Database error", error });
            }
            if (categoryResult.length === 0) {
                return res.status(404).json({ message: "Category not found" });
            }

            const fetchedCategoryId = categoryResult[0].id;
            conditions.push("category_id = ?");
            values.push(fetchedCategoryId);

            if (conditions.length > 0) {
                query += " AND (" + conditions.join(" AND ") + ")";
            }

            db.query(query + " ORDER BY " + orderBy, values, function (error, result) {
                if (error) {
                    return res.status(500).json({ message: "Database error", error });
                }
            
                return res.status(200).json({
                    products: result,
                });
            });
        });
    } else {
        if (conditions.length > 0) {
            query += " AND (" + conditions.join(" AND ") + ")";
        }

        db.query(query + " order by " + orderBy, values, function (error, result) {
            if (error) {
                return res.status(500).json({ message: "Database error", error });
            }

            return res.status(200).json({
                products: result,
            });
        });
    }
};
















