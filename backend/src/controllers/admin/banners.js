const db = require('../../connection.js').getDb();
const path = require('path');
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
//        cb(null, '../uploads/users')  // live path
        cb(null, './uploads/banners')  // local path   
    },
    filename: function (req, file, cb) {
        // You could rename the file name
        cb(null, Date.now() + path.extname(file.originalname))

        // You could use the original name
        // cb(null, file.originalname)
    }
});
var upload = multer({storage: storage})

exports.create_banner = [upload.single("file"), async function(req,res){
    
    let image = "";
    if (!req.file) {
        return res.status(202).json({ message: "Banner Image is Required." });
    } else {
        image = "banners/" + req.file.filename;
    }
    const query = "INSERT INTO tbl_banners (banner_title, image, status, created_date) VALUES (?, ?, ?, ?)";
    const values = [req.body.banner_title, image, 1, new Date()];
    
    db.query(query, values, function (err, result) {
    
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }

        if (result) {
            return res.status(200).json({
                message: "Created Successfully"
            })
        }
    });
}]

exports.update_banner = [upload.single("file"), async function(req,res){

    let image = "";
    if (!req.file) {
        image = req.body.old_image; // Use existing image if no new file is uploaded
    } else {
        image = "banners/" + req.file.filename;
    }

    const query = "UPDATE tbl_banners SET banner_title = ?, image = ?, updated_date = ? where id = ?";
    const values = [req.body.banner_title, image, new Date(), req.body.id];
    
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
}]

exports.deletebanner = (req, res) => {

    const { id } = req.params;
    if(!id){
        return res.status(202).json({ message: "Banner ID is Required." });
    }

    const checkAreaQuery = 'DELETE FROM tbl_banners WHERE id = ?';
    db.query(checkAreaQuery, [id], (err, result) => {

        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
    
        if (result.affectedRows === 0) {
            return res.status(202).json({ message: 'Banner not found' });
        }
        
        return res.status(200).json({ message: "Banner Deleted Successfully" });
        
    });

}

exports.get_singlebanner = (req, res) => {

    const id = req.body.id;
    if(!id){
        return res.status(202).json({ message: "Banner ID is Required." });
    }

    const checkAreaQuery = 'SELECT * FROM tbl_banners WHERE id = ?';
    db.query(checkAreaQuery, [req.body.id], (err, result) => {
        if (err) {
            return callback(err);
        }

        if (result.length > 0) {
            return res.status(200).json({ banner_data: result[0] });
        }else{
            return res.status(202).json({ message: "Banner Not Found." });
        }

    });

}

exports.get_allbannners = (req, res) => {

    db.query("SELECT * FROM tbl_banners WHERE deleted=0 order by id desc", function (error, result) {    

        if(error){
            return res.status(202).json({message:error});
        }

        return res.status(200).json({
            banners: result,
        });   
    })
}
