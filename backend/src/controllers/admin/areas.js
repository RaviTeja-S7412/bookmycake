const db = require('../../connection.js').getDb();
const path = require('path');


// cities
// categories
exports.create_area = [function(req,res){
    if(!req.body.city_id){
        return res.status(202).json({ message: "city name is Required." });
    }
    if(!req.body.area_name){
        return res.status(202).json({ message: "Area Name is Required." });
    }
    const query = "INSERT INTO tbl_areas (city_id, area_name, status, created_date) VALUES (?, ?, ?, ?)";
    const values = [req.body.city_id, req.body.area_name, 1, new Date()];
    
    db.query(query, values, function (err, result) {
    
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
              return res.status(202).json({ message: 'Area name already exists' });
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


exports.update_area = [function(req,res){

    if(!req.body.area_name){
        return res.status(202).json({ message: "Area Name is Required." });
    }

    const checkAreaQuery = 'SELECT * FROM tbl_areas WHERE area_name = ? and id != ?';
    db.query(checkAreaQuery, [req.body.area_name, req.body.id], (err, results) => {
        if (err) {
            return callback(err);
        }

        if (results.length > 0) {
            return res.status(202).json({ message: 'Area name already exists' });
        }else{
            
            const query = "UPDATE tbl_areas SET area_name = ?, updated_at = ? where id = ?";
            const values = [req.body.area_name, new Date(), req.body.id];
            
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

exports.deletearea = (req, res) => {

    const { id } = req.params;
    if(!id){
        return res.status(202).json({ message: "Area ID is Required." });
    }

    const checkAreaQuery = 'DELETE FROM tbl_areas WHERE id = ?';
    db.query(checkAreaQuery, [id], (err, result) => {

        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
    
        if (result.affectedRows === 0) {
            return res.status(202).json({ message: 'Area not found' });
        }
        
        return res.status(200).json({ message: "Area Deleted Successfully" });
        
    });

}

exports.get_singlearea = (req, res) => {

    const id = req.body.id;
    if(!id){
        return res.status(202).json({ message: "Area ID is Required." });
    }

    const checkAreaQuery = 'SELECT * FROM tbl_areas WHERE id = ?';
    db.query(checkAreaQuery, [req.body.id], (err, result) => {
        if (err) {
            return callback(err);
        }

        if (result.length > 0) {
            return res.status(200).json({ area_data: result[0] });
        }else{
            return res.status(202).json({ message: "Area Not Found." });
        }

    });

}

exports.get_allareas = (req, res) => {

    db.query("SELECT * FROM tbl_areas WHERE status=1 order by id desc", function (error, result) {    

        if(error){
            return res.status(202).json({message:error});
        }

        return res.status(200).json({
            areas: result,
        });   
    })
}
