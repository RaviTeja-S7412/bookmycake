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
exports.create_product = [upload.single("file"), async function(req, res) {

    // Validate incoming request data
    if (!req.body.category_id) {
        return res.status(202).json({ message: "Category is Required." });
    }
    if (!req.body.customer_type) {
        return res.status(202).json({ message: "Customer Type is Required." });
    }
    if (!req.body.product_name) {
        return res.status(202).json({ message: "Product Name is Required." });
    }
    if (!req.body.options) {
        return res.status(202).json({ message: "Select Atleast One Option." });
    }

    // Handle product image
    let product_image = "";
    if (!req.file) {
        return res.status(202).json({ message: "Product Image is Required." });
    } else {
        product_image = "products/" + req.file.filename;
    }

    const product_size = JSON.parse(req.body.product_size);
    const product_flavor = JSON.parse(req.body.product_flavor);

    // Create product route
    var product_route = req.body.product_name
        .toLowerCase()          // Convert to lowercase
        .replace(/\s+/g, '-')    // Replace spaces with hyphens
        .replace(/[^\w\-]+/g, '') // Remove non-alphanumeric characters except hyphens
        .replace(/--+/g, '-')    // Replace multiple hyphens with a single hyphen
        .replace(/^-+/, '')      // Remove leading hyphen
        .replace(/-+$/, '');     // Remove trailing hyphen

    // Insert product into the database
    const query = "INSERT INTO tbl_products (category_id, sub_category_id, customer_type, product_name, product_image, product_description, ingredients, nutritional_info, shipping, options, route, status, deleted, created_date, isDesignercollections, isCorporatecollections, isFeaturedproducts) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [req.body.category_id, req.body.sub_category_id, req.body.customer_type, req.body.product_name, product_image, req.body.product_description, req.body.ingredients, req.body.nutritional_info, req.body.shipping, req.body.options, product_route, 1, 0, new Date(), req.body.isDesignercollections, req.body.isCorporatecollections, req.body.isFeaturedproducts];

    try {
        db.query(query, values, async function(err, result){
            
            if (!Array.isArray(product_size) || !Array.isArray(product_flavor)) {
                return res.status(202).json({ message: "Product options (size, flavor) are required." });
            }
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                return res.status(202).json({ message: 'Product name already exists' });
                }
                return res.status(500).json({ message: err });
            }

            let options_array = product_size.map((data, i) => ({
                "product_id": result.insertId,
                "weight": data.kg,
                "unit": data.unit,
                "price": data.price,
                "flavor": product_flavor[i].flavor,
                "created_at": new Date(),
            }));
            // Insert product options into the database
            const optionsQuery = "INSERT INTO tbl_product_option (product_id, weight, unit, price, flavor, created_at) VALUES ?";
            const valuesArray = options_array.map(obj => [
                obj.product_id,
                obj.weight,
                obj.unit,
                obj.price,
                obj.flavor,
                obj.created_at
            ]);

            await db.query(optionsQuery, [valuesArray]);

            // Send success response after both product and options are created
            return res.status(200).json({ message: "Created Successfully" });
        })
    } catch (err) {
        // Error handling for any operation in the async flow
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(202).json({ message: 'Product name already exists' });
        }
        return res.status(500).json({ message: err.message || 'Internal Server Error' });
    }
}];

exports.update_product = [upload.single("file"), async function(req, res) {
    if (!req.body.category_id) {
        return res.status(202).json({ message: "Category is Required." });
    }
    if (!req.body.customer_type) {
        return res.status(202).json({ message: "Customer Type is Required." });
    }
    if (!req.body.product_name) {
        return res.status(202).json({ message: "Product Name is Required." });
    }
    if (!req.body.options) {
        return res.status(202).json({ message: "Select Atleast One Option." });
    }

    let product_image = "";
    if (!req.file) {
        product_image = req.body.old_image;
    } else {
        product_image = "products/" + req.file.filename;
    }

    var product_route = req.body.product_name
        .toLowerCase()
        .replace(/\s+/g, '-')  
        .replace(/[^\w\-]+/g, '') 
        .replace(/--+/g, '-')  
        .replace(/^-+/, '')  
        .replace(/-+$/, '');

    const checkCategoryQuery = 'SELECT * FROM tbl_products WHERE product_name = ? and id != ?';
    db.query(checkCategoryQuery, [req.body.category_name, req.body.id], async (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }

        if (results.length > 0) {
            return res.status(202).json({ message: 'Product name already exists' });
        } else {
            const query = "UPDATE tbl_products SET category_id = ?, sub_category_id = ?, customer_type = ?, product_name = ?, product_image = ?, product_description = ?, ingredients = ?, nutritional_info = ?, shipping = ?, options = ?, route = ?, updated_date = ?, isDesignercollections = ?, isCorporatecollections = ?, isFeaturedproducts = ? WHERE id = ?";
            const values = [req.body.category_id, req.body.sub_category_id, req.body.customer_type, req.body.product_name, product_image, req.body.product_description, req.body.ingredients, req.body.nutritional_info, req.body.shipping, req.body.options, product_route, new Date(), req.body.isDesignercollections, req.body.isCorporatecollections, req.body.isFeaturedproducts, req.body.id];

            db.query(query, values, async (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }

                if (result) {
                    const product_size = JSON.parse(req.body.product_size);
                    const product_flavor = JSON.parse(req.body.product_flavor);

                    let options_array = product_size.map((data, i) => ({
                        "id": data.id,
                        "product_id": req.body.id,
                        "weight": data.kg,
                        "unit": data.unit,
                        "price": data.price,
                        "flavor": product_flavor[i].flavor,
                        "created_at": new Date(),
                    }));

                    try {
                        db.query("DELETE from tbl_product_option where product_id="+req.body.id);
                        await Promise.all(options_array.map(updateOrInsertOption));
                        // Once all options are updated/inserted, send a success response
                        return res.status(200).json({
                            message: "Updated Successfully"
                        });
                    } catch (err) {
                        return res.status(500).json({ message: err });
                    }
                }
            });
        }
    });
}];

// Helper function to handle updating/inserting product options
const updateOrInsertOption = (data) => {
    return new Promise((resolve, reject) => {
        let query = "";
        let values = [];
        // if (data.id) {
        //     query = "UPDATE tbl_product_option SET weight = ?, unit = ?, price = ?, flavor = ? WHERE id = ?";
        //     values = [data.weight, data.unit, data.price, data.flavor, data.id];
        // } else {
            query = "INSERT INTO tbl_product_option (product_id, weight, unit, price, flavor, created_at) VALUES (?, ?, ?, ?, ?, ?)";
            values = [data.product_id, data.weight, data.unit, data.price, data.flavor, data.created_at];
        // }

        db.query(query, values, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

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
        WHERE p.route =? and p.deleted=0 and p.status=1`;
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

exports.get_homepage_data = async (req, res) => {

    const selectedquery = "SELECT * FROM `tbl_products` WHERE isDesignercollections='true' OR isCorporatecollections='true' OR isFeaturedproducts='true' ORDER BY `id` DESC;";
    const selectedProducts = await new Promise((resolve, reject) => {
        db.query(selectedquery, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
         
    return res.status(200).json({
        banner: [],
        selectedProducts: selectedProducts
    });
};
















