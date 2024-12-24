const db = require('../../connection.js').getDb();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer  = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
//        cb(null, '../uploads/users')  // live path
        cb(null, '../admin/public/uploads/users')  // local path   
    },
    filename: function (req, file, cb) {
        // You could rename the file name
        cb(null, Date.now() + path.extname(file.originalname))

        // You could use the original name
        // cb(null, file.originalname)
    }
});

var upload = multer({storage: storage})

exports.signup = (req, res) => {

    console.log(req.body);
    
    
    /* if(!req.body.email){
        return res.status(202).json({ message: "Email is Required." });
    }
    if(!req.body.password){
        return res.status(202).json({ message: "Password is Required." });
    } */
    
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const query = "INSERT INTO tbl_users (first_name, last_name, email, mobile_number, password, role, status, deleted, registered_date, last_logged_in) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = ['Super Admin', 'Admin', 'superadmin@bmc.com', 0, hashedPassword, 1, 'Active', 0, '2024-12-22T18:30:00.000Z', '2024-12-22T21:50:09.000Z'];
    
    db.query(query, values, function (error, result) {

        if (error) {
            return res.status(202).json({
                message: 'error occured'
            });
        }

        if (result) {
            return res.status(200).json({
                message: "Registered Successfully"
            })
        }
    });
}

exports.signin = (req, res) => {

    var email = req.body.email;
    var password = req.body.password;

    db.query("SELECT * FROM tbl_users WHERE email = ?", email, function (error, result) {
    
        if (error) {
            return res.status(202).json({ message: error });
        }

        if (result[0]) {

            var user = result[0];
            var data = bcrypt.compareSync(password, user.password);
            
            if (data) {
                const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
                res.cookie("token", token, { expiresIn: "1d" });
                res.status(200).json({
                    token,
                    user: user,
                    role: user.role,
                    message : "Logged in successfully"
                });
            } else {
                return res.status(202).json({
                    message: "Invalid Password"
                });
            }

        } else {
            return res.status(202).json({
                message: "User not registered with us."
            });
        }
    })

}

exports.updateProfile = [upload.single("file"),function(req,res){
    
    const id = req.body.user_id;
    const role = req.body.role;

    if(!id){
        return res.status(202).json({ message: "User ID is Required." });
    }

    let profile_pic = "";
    if(!req.file){
        profile_pic = req.body.old_picture;
    }else{
        profile_pic = "/uploads/users/"+req.file.filename;
    }

    if(role == 5){

        var user_data = {
            "user_image" : profile_pic,
            "employee_name": req.body.admin_name,
            "email": req.body.email,
            "mobile": req.body.mobile,
            "designation": req.body.designation,
        }

    }else{

        var user_data = {
            "user_image" : profile_pic,
            "admin_name": req.body.admin_name,
            "email": req.body.email,
            "mobile": req.body.mobile,
            "designation": req.body.designation,
        }

    }    

    if(role == 5){

        employees.updateOne({_id:new ObjectId(id)}, {$set: user_data}, function (error, result) {
            if (error) {
                return res.status(202).json({
                    message: "Error Occured"
                });
            }
            if (result) {
                users.find({ _id: new ObjectId(id) })
                    .toArray((error, userdata) => {
                    return res.status(200).json({
                        message: "Updated Successfully",
                        user : userdata[0]
                    })
                });
            }
        });

    }else{

        users.updateOne({_id:new ObjectId(id)}, {$set: user_data}, function (error, result) {
            if (error) {
                return res.status(202).json({
                    message: "Error Occured"
                });
            }
            if (result) {
                users.find({ _id: new ObjectId(id) })
                    .toArray((error, userdata) => {
                    return res.status(200).json({
                        message: "Updated Successfully",
                        user : userdata[0]
                    })
                });
            }
        });

    }

}];

exports.get_singleuser = (req, res) => {

    const id = req.body.user_id;
    if(!id){
        return res.status(202).json({ message: "User ID is Required." });
    }
    
    if (req.body.loginType === "admin") {

        users.find({ _id: new ObjectId(id) }).toArray((error, result) => {
            
            if (result.length > 0) {
                return res.status(200).json({ user_data: result[0] });
            }else{
                return res.status(202).json({ message: "User Not Found." });
            }

        });

    } else {

        employees.find({ _id: new ObjectId(id) }).toArray((error, result) => {
            
            const user = result[0]
            if (result.length > 0) {
                return res.status(200).json({ user_data: {"_id": user._id,"admin_name":user.employee_name,"email":user.office_email,"mobile":user.mobile_number,"user_image":user.user_image,"role_data":user.role_data,"role":user.role,"uploads_folder":"/timesheet/"} });
            } else {
                return res.status(202).json({ message: "User Not Found." });
            }

        });

    }

}

exports.updateUser = (req, res) => {

    const id = req.body.user_id;
    if(!id){
        return res.status(202).json({ message: "User ID is Required." });
    }

    const user_data = {
        "admin_name": req.body.admin_name,
        "email": req.body.email,
        "mobile": req.body.mobile,
        "designation": req.body.designation,
        "role": parseInt(req.body.role),
        "updated_date": new Date(),
        "updated_by": req.body.updated_by,
    }
    
    var errors = [];

    users.find({ email: req.body.email }).toArray((error, result) => {
        if (result.length > 0) {
            if(result[0]._id != id){
                errors.push({message:"Email ID Already Registered."});
            }
        }

        if(errors.length == 0){

            users.updateOne({_id:new ObjectId(id)}, {$set: user_data}, function (error, result) {
                if (error) {
                    return res.status(202).json({
                        message: "Error Occured"
                    });
                }
                if (result) {
                    users.find({ _id: new ObjectId(id) })
                        .toArray((error, userdata) => {
                        return res.status(200).json({
                            message: "Updated Successfully",
                            user : userdata[0]
                        })
                    });
                }
            });
    
        }else{
    
            return res.status(202).json(errors[0]);
    
        }

    });


}

exports.deleteUser = (req, res) => {

    const id = req.body.user_id;
    if(!id){
        return res.status(202).json({ message: "User ID is Required." });
    }

    users.deleteOne({ _id: new ObjectId(id) },(error, result) => {
        
        if (result.deletedCount > 0) {
            return res.status(200).json({ message: "User Deleted Successfully" });
        }else{
            return res.status(202).json({ message: "User Not Found" });
        }

    });

}

exports.updatePassword = (req,res) => {
    
    const id = req.body.user_id;
    if(!id){
        return res.status(202).json({ message: "User ID is Required." });
    }

    if(req.body.new_password != req.body.confirm_password){

        return res.status(202).json({
            message: "New password & confirm passwords are not equal."
        });    
        
    }

    users.find({ _id:new ObjectId(id) })
        .toArray((error, result) => {
            if (error) {
                return res.status(202).json({ message: "Error Occured." });
            }

            if (result.length > 0) {

                bcrypt.hash(req.body.new_password, 10, function(err, hash) {

                    const user_data = {
                        "password" : hash
                    }

                    users.updateOne({_id:new ObjectId(id)}, {$set: user_data}, function (error, result) {
                        if (error) {
                            return res.status(202).json({
                                message: "Error Occured"
                            });
                        }
                        if (result) {
                            users.find({ _id: new ObjectId(id) })
                                .toArray((error, userdata) => {
                                return res.status(200).json({
                                    message: "Password Updated Successfully",
                                    user : userdata[0]
                                })
                            });
                        }
                    });
                });
                
            }else{
                return res.status(202).json({
                    message: "Error Occured"
                });
            }

        });


};

exports.requireSignin = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
}

exports.signout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        message: "Signout successfully...!",
    });
};

exports.getUsers = (req, res) => {
    
    var perPage = req.body.perPage ? req.body.perPage : 10,
    page = req.body.page-1
    var search = req.body.search
    var ref = req.body.ref
    const usersData = []

    var cby = ''; 
    var role = ''; 
    if(req.body.role == 1){
        cby = {$ne: ""};
    }else{
        cby = req.body.user_id;
    }

    if(ref == 'teamleads'){
        role = 4
    }else if(ref == 'ams'){
        role = 3
    }else{
        role = {$ne:1}
    }

    users.aggregate([
        { "$sort": { '_id' : -1 } },
        {$match: 
            {role:role,created_by: cby,
                $or: 
                [ 
                    { admin_name: { "$regex": search, "$options": "i"} }, 
                    { email: { "$regex": search, "$options": "i"} }, 
                    { mobile: { "$regex": search, "$options": "i"} }, 
                    { designation: { "$regex": search, "$options": "i"} },
                ] 
            },
        },
        { $lookup: {
                from:'tbl_roles',
                localField: "role",
                foreignField: "id",
                as: "role_data"                                                                  
            }
        },
        { "$limit": perPage * req.body.page },
        { "$skip": perPage * page },
    ])
    .toArray(function (err, users_data) {

            if(err){
                return res.status(202).json({message:err});
            }

            if(users_data.length > 0){
                users_data.forEach((element) => {
                  
                    usersData.push({
                        "id": element._id,
                        "admin_name": element.admin_name,
                        "mobile": element.mobile,
                        "email": element.email,
                        "designation": element.designation,
                        "role_name": element.role_data.length > 0 ?  element.role_data[0].role : '',
                        "created_date": new Date(element.created_date).toLocaleDateString('en-US'),
                    })

                });
            }

            users.find({role:role,created_by: cby, $or: 
                [ 
                    { admin_name: { "$regex": search, "$options": "i"} }, 
                    { email: { "$regex": search, "$options": "i"} }, 
                    { mobile: { "$regex": search, "$options": "i"} }, 
                    { designation: { "$regex": search, "$options": "i"} } 
                ] 
            }).count(function (err, count) {
                return res.status(200).json({
                    total_users: usersData,
                    pageIndex: req.body.page,
                    total_pages: Math.ceil(count / perPage),
                    total_users_count: count,
                    prevPage: page > 0 ? true : false,
                    nextPage: Math.ceil(count / perPage) === req.body.page ? false : true
                });   
            })
        })

}


