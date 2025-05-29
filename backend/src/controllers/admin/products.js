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
    if(!req.body.customer_type){
        return res.status(202).json({ message: "Customer Type is Required." });
    }
    if(!req.body.product_name){
        return res.status(202).json({ message: "Product Name is Required." });
    }
    if(!req.body.options){
        return res.status(202).json({ message: "Select Atleast One Option." });
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

    const query = "INSERT INTO tbl_products (category_id, sub_category_id, customer_type, product_name, product_image, product_description, ingredients, nutritional_info, shipping, options, route, status, deleted, created_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [req.body.category_id, req.body.sub_category_id, req.body.customer_type, req.body.product_name, product_image, req.body.product_description, req.body.ingredients, req.body.nutritional_info, req.body.shipping, req.body.options, product_route, 1, 0, new Date()];
    
    db.query(query, values, function (err, result) {
    
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
              return res.status(202).json({ message: 'Product name already exists' });
            }
            return res.status(500).json({ message: err });
        }

        if (result) {
            const product_size = JSON.parse(req.body.product_size);
            const product_flavor = JSON.parse(req.body.product_flavor);
            const product_eggtype = JSON.parse(req.body.product_eggtype);
            var options_array = [];
            product_size.forEach((data, i) => {
                options_array.push({
                    "id": data.id,
                    "product_id": result?.insertId,
                    // "sku": data.sku,
                    "weight": data.kg,
                    "unit": data.unit,
                    "price": data.price,
                    "flavor": product_flavor[i].flavor,
                    "eggoption": product_eggtype[i].eggoption,
                    "created_at": new Date(),
                })
            })
            const query = "INSERT INTO tbl_product_option (product_id, weight, unit, price, flavor, eggoption, created_at) VALUES ?";
     
            const valuesArray = options_array.map(obj => [
                obj.product_id,
                // obj.sku,
                obj.weight,
                obj.unit,
                obj.price,
                obj.flavor,
                obj.eggoption,
                obj.created_at
            ]);
            db.query(query, [valuesArray], function (err, result) {
                if (err) {
                    return res.status(500).json({ message: err });
                }
                if (result) {
                    return res.status(200).json({
                        message: "Created Successfully"
                    })
                }
            });
        }
    });
}]

exports.update_product = [upload.single("file"),function(req,res){

    if(!req.body.category_id){
        return res.status(202).json({ message: "Category is Required." });
    }
    if(!req.body.customer_type){
        return res.status(202).json({ message: "Customer Type is Required." });
    }
    if(!req.body.product_name){
        return res.status(202).json({ message: "Product Name is Required." });
    }
    if(!req.body.options){
        return res.status(202).json({ message: "Select Atleast One Option." });
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
            const query = "UPDATE tbl_products SET category_id = ?, sub_category_id = ?, customer_type = ?, product_name = ?, product_image = ?, product_description = ?, ingredients = ?, nutritional_info = ?, shipping = ?, options = ?, route = ?, updated_date = ? where id = ?";
            const values = [req.body.category_id, req.body.sub_category_id, req.body.customer_type, req.body.product_name, product_image, req.body.product_description, req.body.ingredients, req.body.nutritional_info, req.body.shipping, req.body.options, product_route, new Date(), req.body.id];
            
            db.query(query, values, function (err, result) {
            
                if (err) {
                    return res.status(500).json({ error: err });
                }

                if (result) {
                    const product_size = JSON.parse(req.body.product_size);
                    const product_flavor = JSON.parse(req.body.product_flavor);
                    const product_eggtype = JSON.parse(req.body.product_eggtype);
                    var options_array = [];
                    product_size.forEach((data, i) => {
                        options_array.push({
                            "id": data.id,
                            "product_id": req.body.id,
                            // "sku": data.sku,
                            "weight": data.kg,
                            "unit": data.unit,
                            "price": data.price,
                            "flavor": product_flavor[i].flavor,
                            "eggoption": product_eggtype[i].eggoption,
                            "created_at": new Date(),
                        })
                    })

                    const updateOrInsertOption = (data) => {
                        return new Promise((resolve, reject) => {
                            let query = "";
                            let values = [];
                            if (data.id) {
                                query = "UPDATE tbl_product_option SET weight = ?, unit = ?, price = ?, flavor = ?, eggoption = ? WHERE id = ?";
                                values = [data.weight, data.unit, data.price, data.flavor, data.eggoption, data.id];
                            } else {
                                query = "INSERT INTO tbl_product_option (product_id, weight, unit, price, flavor, eggoption, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)";
                                values = [data.product_id, data.weight, data.unit, data.price, data.flavor, data.eggoption, data.created_at];
                            }
                            db.query(query, values, (err, result) => {
                                if (err) return reject(err);
                                resolve(result);
                            });
                        });
                    };

                    Promise.all(options_array.map(updateOrInsertOption))
                        .then(() => {
                            // All options updated/inserted
                        })
                        .catch(err => {
                            return res.status(500).json({ message: err });
                        });
                    /* options_array.forEach(async (data) => {

                        var query = "";
                        var values = [];
                        if(data.id){
                            var query = "UPDATE tbl_product_option SET weight = ?, unit = ?, price = ?, flavor = ?, eggoption = ? where id = ?";
                            var values = [data.weight, data.unit, data.price, data.flavor, data.eggoption, data.id];
                        }else{
                            query = "INSERT INTO tbl_product_option (product_id, weight, unit, price, flavor, eggoption, created_at) VALUES ?";
                            values = [data.product_id, data.weight, data.unit, data.price, data.flavor, data.eggoption, new Date()];
                        }

                        await db.query(query, values, function (err, result) {
                            if (err) {
                                return res.status(500).json({ message: err });
                            }
                            if (result) {
                                
                            }
                        });

                    }); */
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

    const checkCategoryQuery = `
        SELECT p.*, 
               o.id as option_id, o.weight, o.unit, o.price, o.flavor, o.eggoption
        FROM tbl_products p
        LEFT JOIN tbl_product_option o ON p.id = o.product_id
        WHERE p.id = ?
    `;
    db.query(checkCategoryQuery, [req.body.id], (err, result) => {
        if (err) {
            return callback(err);
        }

        if (result.length > 0) {
            // Extract product data from the first row
            const {
                id, category_id, sub_category_id, customer_type, product_name, product_image,
                product_description, ingredients, nutritional_info, shipping, options, route,
                status, deleted, created_date, updated_date, product_size, product_flavor, stock,
                is_size, is_flavor
            } = result[0];

            // Build options array
            const product_options = result
                .filter(row => row.option_id !== null)
                .map(row => ({
                    id: row.option_id,
                    weight: row.weight,
                    unit: row.unit,
                    price: row.price,
                    flavor: row.flavor,
                    eggoption: row.eggoption
                }));

            // Build product object without option columns
            const product_data = {
                id, category_id, sub_category_id, customer_type, product_name, product_image,
                product_description, ingredients, nutritional_info, shipping, options, route,
                status, deleted, created_date, updated_date, product_size, product_flavor, stock,
                is_size, is_flavor,
                product_options
            };

            return res.status(200).json({ product_data });
        } else {
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

    const query = "SELECT p.*, c.category_name, sc.sub_category_name FROM tbl_products p LEFT JOIN tbl_sub_categories sc ON p.sub_category_id = sc.id left join tbl_categories c ON p.category_id = c.id order by p.id desc";

    db.query(query, function (error, result) {    

        if(error){
            return res.status(202).json({message:error});
        }

        return res.status(200).json({
            products: result,
        });   
    })
}

exports.get_filter_products = async (req, res) => {
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

    let query = "SELECT * FROM tbl_products WHERE status=1 and deleted=0";

    if (category_id) {
        const categoryQuery = "SELECT id FROM tbl_categories WHERE route = ?";
        const categoryId = await new Promise((resolve, reject) => {
            db.query(categoryQuery, [category_id], (err, result) => {
                if (err) return reject(err);
                resolve(result[0]?.id);
            });
        });
        conditions.push("category_id = ?");
        values.push(categoryId);
    }

    if (sub_category_id) {
        const subcategoryQuery = "SELECT id FROM tbl_sub_categories WHERE route = ?";
        const subcategoryId = await new Promise((resolve, reject) => {
            db.query(subcategoryQuery, [sub_category_id], (err, result) => {
                if (err) return reject(err);
                resolve(result[0]?.id);
            });
        });
        conditions.push("sub_category_id = ?");
        values.push(subcategoryId);
    }
    
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
};
















