const db = require('../../connection.js').getDb();
const path = require('path');


// cities
// categories
exports.create_city = [function(req,res){
 
    if(!req.body.city_name){
        return res.status(202).json({ message: "City Name is Required." });
    }
    const query = "INSERT INTO tbl_cities (city_name, status, created_date) VALUES (?, ?, ?)";
    const values = [req.body.city_name, 1, new Date()];
    
    db.query(query, values, function (err, result) {
    
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
              return res.status(202).json({ message: 'City name already exists' });
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


exports.update_city = [function(req,res){

    if(!req.body.city_name){
        return res.status(202).json({ message: "City Name is Required." });
    }

    const checkCityQuery = 'SELECT * FROM tbl_cities WHERE city_name = ? and id != ?';
    db.query(checkCityQuery, [req.body.city_name, req.body.id], (err, results) => {
        if (err) {
            return callback(err);
        }

        if (results.length > 0) {
            return res.status(202).json({ message: 'City name already exists' });
        }else{
            
            const query = "UPDATE tbl_cities SET city_name = ?, updated_at = ? WHERE id = ?";
            const values = [req.body.city_name, new Date(), req.body.id];


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

exports.deletecity = (req, res) => {

    const { id } = req.params;
    if(!id){
        return res.status(202).json({ message: "City ID is Required." });
    }

    const checkCityQuery = 'DELETE FROM tbl_cities WHERE id = ?';
    db.query(checkCityQuery, [id], (err, result) => {

        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
    
        if (result.affectedRows === 0) {
            return res.status(202).json({ message: 'City not found' });
        }
        
        return res.status(200).json({ message: "City Deleted Successfully" });
        
    });

}

exports.get_singlecity = (req, res) => {

    const id = req.body.id;
    if(!id){
        return res.status(202).json({ message: "City ID is Required." });
    }

    const checkCityQuery = 'SELECT * FROM tbl_cities WHERE id = ?';
    db.query(checkCityQuery, [req.body.id], (err, result) => {
        if (err) {
            return callback(err);
        }

        if (result.length > 0) {
            return res.status(200).json({ city_data: result[0] });
        }else{
            return res.status(202).json({ message: "city Not Found." });
        }

    });

}

exports.get_allcities = (req, res) => {

    db.query("SELECT * FROM tbl_cities WHERE status=1 order by id desc", function (error, result) {    

        if(error){
            return res.status(202).json({message:error});
        }

        return res.status(200).json({
            cities: result,
        });   
    })
}
