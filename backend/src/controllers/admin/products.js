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

    const query = "INSERT INTO tbl_products (category_id, sub_category_id, customer_type, product_name, product_image, product_description, ingredients, nutritional_info, shipping, options, route, status, deleted, created_date, isDesignercollections, isCorporatecollections, isFeaturedproducts) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [req.body.category_id, req.body.sub_category_id, req.body.customer_type, req.body.product_name, product_image, req.body.product_description, req.body.ingredients, req.body.nutritional_info, req.body.shipping, req.body.options, product_route, 1, 0, new Date(), req.body.isDesignercollections, req.body.isCorporatecollections, req.body.isFeaturedproducts];
    
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
            const query = "UPDATE tbl_products SET category_id = ?, sub_category_id = ?, customer_type = ?, product_name = ?, product_image = ?, product_description = ?, ingredients = ?, nutritional_info = ?, shipping = ?, options = ?, route = ?, updated_date = ?, isDesignercollections = ?, isCorporatecollections = ?, isFeaturedproducts = ? where id = ?";
            const values = [req.body.category_id, req.body.sub_category_id, req.body.customer_type, req.body.product_name, product_image, req.body.product_description, req.body.ingredients, req.body.nutritional_info, req.body.shipping, req.body.options, product_route, new Date(), req.body.isDesignercollections, req.body.isCorporatecollections, req.body.isFeaturedproducts, req.body.id];
            
            db.query(query, values, function (err, result) {
            
                if (err) {
                    return res.status(500).json({ error: err });
                }

                if (result) {
                    const product_size = JSON.parse(req.body.product_size);
                    const product_flavor = JSON.parse(req.body.product_flavor);
                    // const product_eggtype = JSON.parse(req.body.product_eggtype);
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
                            // "eggoption": product_eggtype[i].eggoption,
                            "created_at": new Date(),
                        })
                    })

                    const updateOrInsertOption = (data) => {
                        return new Promise((resolve, reject) => {
                            let query = "";
                            let values = [];
                            if (data.id) {
                                query = "UPDATE tbl_product_option SET weight = ?, unit = ?, price = ?, flavor = ? WHERE id = ?";
                                values = [data.weight, data.unit, data.price, data.flavor, data.id];
                            } else {
                                query = "INSERT INTO tbl_product_option (product_id, weight, unit, price, flavor, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)";
                                values = [data.product_id, data.weight, data.unit, data.price, data.flavor, data.created_at];
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

    const checkCategoryQuery = 'UPDATE tbl_products set deleted=1, status=0 WHERE id = ?';
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
                is_size, is_flavor, isDesignercollections, isCorporatecollections, isFeaturedproducts
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
                is_size, is_flavor, isDesignercollections, isCorporatecollections, isFeaturedproducts,
                product_options
            };

            return res.status(200).json({ product_data });
        } else {
            return res.status(202).json({ message: "Product Not Found." });
        }
    });

}

exports.get_singleproduct_by_route = async (req, res) => {
    
    const route = req.query.route;
    if(!route){
        return res.status(202).json({ message: "Product Route is Required." });
    }

    const checkCategoryQuery = 
        `SELECT p.*, 
               o.id as option_id, o.weight, o.unit, o.price, o.flavor, o.eggoption
        FROM tbl_products p
        LEFT JOIN tbl_product_option o ON p.id = o.product_id
        WHERE p.route =?`;
    const areas = await new Promise((resolve, reject) => {
        db.query("select * from tbl_areas where city_id=1", (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
    db.query(checkCategoryQuery, [route], (err, result) => {
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

            return res.status(200).json({ product_data, areas });
        } else {
            return res.status(202).json({ message: "Product Not Found." });
        }

    });
}

exports.get_allproducts = (req, res) => {

    const query = "SELECT p.*, c.category_name, sc.sub_category_name FROM tbl_products p LEFT JOIN tbl_sub_categories sc ON p.sub_category_id = sc.id left join tbl_categories c ON p.category_id = c.id where p.deleted=0 order by p.id desc";

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
    const min_price = req.query.min_price;
    const max_price = req.query.max_price;
    const filterFlavors = req.query.flavors;
    const filterWeights = req.query.weights;

    let conditions = [];
    let values = [];

    let query = "SELECT tp.id as product_id,tp.category_id, tp.sub_category_id, tp.customer_type, tp.product_name, tp.product_image, tp.options, tp.route, tp.status, tp.deleted, tp.created_date, tp.updated_date, tpo.id as option_id, tpo.weight, tpo.unit, tpo.price, tpo.flavor FROM tbl_products as tp LEFT join tbl_product_option as tpo on tpo.product_id = tp.id WHERE tp.status=1 and tp.deleted=0";

    if (category_id) {
        const categoryQuery = "SELECT id FROM tbl_categories WHERE route = ?";
        const categoryId = await new Promise((resolve, reject) => {
            db.query(categoryQuery, [category_id], (err, result) => {
                if (err) return reject(err);
                resolve(result[0]?.id);
            });
        });
        conditions.push("tp.category_id = ?");
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
        conditions.push("tp.sub_category_id = ?");
        values.push(subcategoryId);
    }
    
    if (conditions.length > 0) {
        query += " AND (" + conditions.join(" AND ") + ")";
    }
    
    db.query(query, values, function (error, result) {
        if (error) {
            return res.status(500).json({ message: "Database error", error });
        }
        
        // Group products by product id and aggregate their options
        const productsMap = {};
        const flavors = [];
        const weights = [];
        var highestPrice = 0;
        
        result.forEach(row => {
            if (!productsMap[row.product_id]) {
                productsMap[row.product_id] = {
                    id: row.product_id,
                    category_id: row.category_id,
                    sub_category_id: row.sub_category_id,
                    customer_type: row.customer_type,
                    product_name: row.product_name,
                    product_image: row.product_image,
                        options: row.options,
                        route: row.route,
                        status: row.status,
                        deleted: row.deleted,
                        created_date: row.created_date,
                        updated_date: row.updated_date,
                        is_size: row.is_size,
                        is_flavor: row.is_flavor,
                        product_options: []
                    };
                }
                if (row.option_id) {
                    productsMap[row.product_id].product_options.push({
                        id: row.option_id,
                        weight: row.weight,
                        unit: row.unit,
                        price: row.price,
                        flavor: row.flavor,
                        eggoption: row.eggoption
                    });
                    if (row.flavor && !flavors.includes(row.flavor)) {
                        flavors.push(row.flavor);
                    }
                    if (row.weight && !weights.includes(row.weight)) {
                        weights.push(row.weight);
                    }
                }
            });
            
            // Convert map to array
            var products = Object.values(productsMap);
            if (Array.isArray(products) && products.length) {
                const allPrices = products.flatMap(p => (p.product_options || []).map(o => Number(o.price) || 0));
                highestPrice = allPrices.length > 0 ? Math.max(...allPrices) : 0;
            }
            if(sort_by === "latest" || sort_by === "best-selling") {
                products = products.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
            }
            if (sort_by === "alpha_asc") {
                products = products.sort((a, b) => a.product_name.localeCompare(b.product_name));
            }
            if (sort_by === "alpha_desc") {
                products = products.sort((a, b) => b.product_name.localeCompare(a.product_name));
            }
            if (sort_by === "date_asc") {
                products = products.sort((a, b) => new Date(a.created_date) - new Date(b.created_date));
            }
            if (sort_by === "date_desc") {
                products = products.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
            }
            
            if (min_price && max_price) {
                const filteredProducts = products.map(product => {
                    const filteredOptions = product.product_options.filter(option => option.price >= min_price && option.price <= max_price);
                    if (filteredOptions.length > 0) {
                        return { ...product, product_options: filteredOptions };
                    }
                    return null;
                }).filter(product => product !== null);
                products = filteredProducts;
            }

            if(filterFlavors && filterFlavors.length > 0) {
                const filteredProducts = products.map(product => {
                    const filteredOptions = product.product_options.filter(option => filterFlavors.includes(option.flavor));
                    if (filteredOptions.length > 0) {
                        return { ...product, product_options: filteredOptions };
                    }
                    return null;
                }).filter(product => product !== null);
                products = filteredProducts;
            }

            if(filterWeights && filterWeights.length > 0) {
                const sWeights = filterWeights?.map(item => Number(item));
                const filteredProducts = products.map(product => {
                    const filteredOptions = product.product_options.filter(option => sWeights.includes(Number(option.weight)));
                    if (filteredOptions.length > 0) {
                        return { ...product, product_options: filteredOptions };
                    }
                    return null;
                }).filter(product => product !== null);
                products = filteredProducts;
            }
            
            
        return res.status(200).json({
            products: products,
            flavors: flavors,
            weights: weights,
            highestPrice: highestPrice
        });
    });
};
















