const db = require('../../connection.js').getDb();
const multer  = require('multer');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');
const axios = require('axios');
const https = require('https');
const http = require('http');
const { URL } = require('url');


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
exports.insert_products = [upload.single("file"), function(req,res){

    const results = [];
    fs.createReadStream('./uploads/products.csv', { encoding: 'utf8' })
        .pipe(csv())
        .on('data', (data) => {
            // Remove BOM from product_name if present
            // Loop over all keys and remove BOM if present
            Object.keys(data).forEach(key => {
                if (key.charCodeAt(0) === 0xFEFF) {
                    const newKey = key.slice(1);
                    data[newKey] = data[key];
                    delete data[key];
                }
            });
            results.push(data);
        })
        .on('end', async () => {

            results.map(async (row) => {
                const uploadsDir = path.join(__dirname, '../../../uploads/products');

                const imageUrl = row.product_image;
                if(imageUrl){
                    var product_image = "";
                    const filename = path.basename(new URL(imageUrl).pathname);
                    const filePath = path.join(uploadsDir, filename);

                    axios({
                        url: imageUrl,
                        method: 'GET',
                        responseType: 'stream'
                    }).then(response => {
                        response.data.pipe(fs.createWriteStream(filePath));
                        product_image = 'products/'+filename;
                    }).catch(error => {
                        console.error('❌ Error downloading the image:', error.message);
                    });

                    const categoryQuery = "SELECT id FROM tbl_categories WHERE category_name = ?";
                    const categoryId = await new Promise((resolve, reject) => {
                        db.query(categoryQuery, [row.category_name], (err, result) => {
                            if (err) return reject(err);
                            resolve(result[0]?.id);
                        });
                    });

                    var product_route = row.product_name
                        .toLowerCase()          // Convert to lowercase
                        .replace(/\s+/g, '-')    // Replace spaces with hyphens
                        .replace(/[^\w\-]+/g, '') // Remove any non-alphanumeric characters, except hyphens
                        .replace(/--+/g, '-')    // Replace multiple hyphens with a single hyphen
                        .replace(/^-+/, '')      // Remove leading hyphen
                        .replace(/-+$/, '');

                    const insertQuery = "INSERT INTO tbl_products (category_id, customer_type, product_name, product_image, product_description, options, route, status, deleted, created_date, isDesignercollections, isCorporatecollections, isFeaturedproducts) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                    const values = [
                        categoryId,
                        'retail',
                        row.product_name,
                        product_image,
                        row.product_description,
                        JSON.stringify(["weight","flavor"]),
                        product_route,
                        1,
                        0,
                        new Date(),
                        "false",
                        "false",
                        "false"
                    ];
                    db.query(insertQuery, values, function (err, result) {
                        if (err) {
                            return res.status(500).json({ message: err });
                        }
                        return res.status(200).json({ message: "CSV Imported Successfully" });
                    });

                }
            })

            var values1 = results.map(row => [
                row.product_name,
                row.product_description,
                row.product_image,
                row.flavor
            ]);

            return res.status(200).json({data: values1});

        });
    return;
    // }else{
    //     return res.status(500).json({ message: "CSV Imported Failed" });
    // }

    /* if(!req.body.category_id){
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
    }); */
}]
















