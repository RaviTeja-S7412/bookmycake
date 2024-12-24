const mongo = require('../../connection.js').getDb();
const moment = require('moment');

const fs = require('fs');
const path = require('path');
const leads = mongo.collection("tbl_leads");
var ObjectId = require('mongodb').ObjectID;
const Json2csvParser = require("json2csv").Parser;


exports.create_lead = (req, res) => {
    if(!req.body.candidate_name){
        return res.status(202).json({ message: "Candidate Name is Required." });
    }
    if(!req.body.direct_client){
        return res.status(202).json({ message: "Direct Client is Required." });
    }
    if(!req.body.end_client){
        return res.status(202).json({ message: "End Client is Required." });
    }
    if(!req.body.job_id){
        return res.status(202).json({ message: "Job ID is Required." });
    }
    if(!req.body.job_title){
        return res.status(202).json({ message: "Job Title is Required." });
    }
    if(!req.body.job_duration){
        return res.status(202).json({ message: "Job Duration is Required." });
    }
    if(!req.body.employee_id){
        return res.status(202).json({ message: "Employee is Required." });
    }
    if(!req.body.team_lead){
        return res.status(202).json({ message: "Team Lead is Required." });
    }
    if(!req.body.accounts_manager){
        return res.status(202).json({ message: "Accounts Manager is Required." });
    }

    const data = {
        "candidate_name": req.body.candidate_name,
        "direct_client": req.body.direct_client,
        "end_client": req.body.end_client,
        "contact_number": req.body.contact_number,
        "job_id": req.body.job_id,
        "job_title": req.body.job_title,
        "visa_status": req.body.visa_status,
        "job_duration": req.body.job_duration,
        "bill_rate": parseFloat(req.body.bill_rate),
        "pay_rate": parseFloat(req.body.pay_rate),
        "margin": parseFloat(req.body.margin),
        "tentative_start_date": req.body.tentative_start_date,
        "start_date": "",
        "employee_id": req.body.employee_id,
        "team_lead": req.body.team_lead,
        "accounts_manager": req.body.accounts_manager,
        "created_date": new Date(),
        "created_by": req.body.user_id,
        "updated_date": "",
        "status" : 2,
        "deleted" : 0
    }
    
    leads.find({ job_id: req.body.job_id }).toArray((error, result) => {
        if (result.length > 0) {
            return res.status(202).json({
                message: 'Job ID Already Exists.'
            });
        }

        leads.insertOne(data, function (error, result) {
            if (error) {
                return res.status(202).json({
                    message: 'error occured'
                });
            }

            if (result) {
                return res.status(200).json({
                    message: "Created Successfully"
                })
            }
        });
    });
}

exports.update_lead = (req, res) => {
    
    if(!req.body.id){
        return res.status(202).json({ message: "ID is Required." });
    }

    if(!req.body.candidate_name){
        return res.status(202).json({ message: "Candidate Name is Required." });
    }
    if(!req.body.direct_client){
        return res.status(202).json({ message: "Direct Client is Required." });
    }
    if(!req.body.end_client){
        return res.status(202).json({ message: "End Client is Required." });
    }
    if(!req.body.job_id){
        return res.status(202).json({ message: "Job ID is Required." });
    }
    if(!req.body.job_title){
        return res.status(202).json({ message: "Job Title is Required." });
    }
    if(!req.body.job_duration){
        return res.status(202).json({ message: "Job Duration is Required." });
    }
    if(!req.body.employee_id){
        return res.status(202).json({ message: "Employee is Required." });
    }
    if(!req.body.team_lead){
        return res.status(202).json({ message: "Team Lead is Required." });
    }
    if(!req.body.accounts_manager){
        return res.status(202).json({ message: "Accounts Manager is Required." });
    }

    const data = {
        "candidate_name": req.body.candidate_name,
        "direct_client": req.body.direct_client,
        "end_client": req.body.end_client,
        "contact_number": req.body.contact_number,
        "job_id": req.body.job_id,
        "job_title": req.body.job_title,
        "visa_status": req.body.visa_status,
        "job_duration": req.body.job_duration,
        "bill_rate": req.body.bill_rate,
        "pay_rate": req.body.pay_rate,
        "margin": req.body.margin,
        "tentative_start_date": req.body.tentative_start_date,
        "employee_id": req.body.employee_id,
        "team_lead": req.body.team_lead,
        "accounts_manager": req.body.accounts_manager,
        "updated_date": new Date(),
        "updated_by": req.body.user_id,
    }

    var errors = [];

    leads.find({ job_id: req.body.job_id }).toArray((error, result) => {
        if (result.length > 0) {
            if(result[0]._id != req.body.id){
                errors.push({message:"Job ID Already Exists."});
            }
        }

        if(errors.length == 0){
    
            leads.updateOne({_id:new ObjectId(req.body.id)}, {$set: data}, function (error, result) {
                if (error) {
                    return res.status(202).json({
                        message: 'error occured'
                    });
                }

                if (result) {
                    return res.status(200).json({
                        message: "Updated Successfully"
                    })
                }
            });

        }else{
    
            return res.status(202).json(errors[0]);
    
        }
        
    });
}

exports.get_leads = (req, res) => {

    /* leads.find({}).toArray(function (err, db_data){

        db_data.forEach((element) => {

            const data = {
                "candidate_name": element.candidate_name,
                "direct_client": element.direct_client,
                "end_client": element.end_client,
                "contact_number": element.contact_number,
                "job_id": element.job_id,
                "job_title": element.job_title,
                "visa_status": element.visa_status,
                "job_duration": element.job_duration,
                "bill_rate": parseFloat(element.bill_rate),
                "pay_rate": parseFloat(element.pay_rate),
                "margin": parseFloat(element.margin),
                "tentative_start_date": element.tentative_start_date,
                "start_date": element.start_date,
                "employee_id": element.employee_id,
                "team_lead": element.team_lead,
                "accounts_manager": element.accounts_manager,
                "created_date": new Date(),
                "created_by": element.created_by,
                "updated_date": "",
                "status" : element.status,
                "deleted" : 0
            }

            leads.insertOne(data, function (error, result) {

                

            })

        })

    })  */

    var perPage = req.body.perPage ? req.body.perPage : 10,
    page = req.body.page-1
    var search = req.body.search
    var status = req.body.status
    const data = []

    const role = req.body.role;

    var column_name = "";
    if(role === 5){
        column_name = "employee_id";     
    }else if(role === 4){
        column_name = "team_lead";     
    }else if(role === 3){
       column_name = "accounts_manager";     
    }else{
       column_name = "created_by";
    }
    
    var filterStatus = "";
    if(status == "offers"){
        filterStatus = 2;
    }else if(status == "active"){
        filterStatus = 1;
    }else if(status == "exit"){
        filterStatus = 0;
    }

    var query = {};
    if(role !== 1 && role !== 2)
        query[column_name] = req.body.user_id;

    query["deleted"] = 0;
    if(status !== "consultants")
        query["status"] = filterStatus;
    leads.aggregate([
        { "$sort": { '_id' : -1 } },
        {$match: 
            {
                $and: [query],
                $or: 
                [ 
                    { candidate_name: { "$regex": search, "$options": "i"} },
                    { direct_client: { "$regex": search, "$options": "i"} },
                    { end_client: { "$regex": search, "$options": "i"} },
                    { contact_number: { "$regex": search, "$options": "i"} },
                    { job_id: { "$regex": search, "$options": "i"} },
                    { job_title: { "$regex": search, "$options": "i"} },
                    { visa_status: { "$regex": search, "$options": "i"} },
                    { job_duration: { "$regex": search, "$options": "i"} },
                    { bill_rate: { "$regex": search, "$options": "i"} },
                    { pay_rate: { "$regex": search, "$options": "i"} },
                    { margin: { "$regex": search, "$options": "i"} },
                    { status: { "$regex": search, "$options": "i"} },
                ],
                
            },
        },
        { "$addFields": {
            employee_id: {
                "$toObjectId": "$employee_id"
            },
            team_lead: {
                "$toObjectId": "$team_lead"
            },
            accounts_manager: {
                "$toObjectId": "$accounts_manager"
            },
            direct_client: {
                "$toObjectId": "$direct_client"
            },
            end_client: {
                "$toObjectId": "$end_client"
            }
        }},
        { $lookup: {
            from:'tbl_employees',
            localField: "employee_id",
            foreignField: "_id",
            as: "employee_data"                                                                  
        }},
        {$lookup: {
            from:'tbl_auths',
            localField: "team_lead",
            foreignField: "_id",
            as: "team_data"                                                                  
        }},
        {$lookup: {
            from:'tbl_auths',
            localField: "accounts_manager",
            foreignField: "_id",
            as: "account_manager_data"                                                                  
        }},
        {$lookup: {
            from:'tbl_clients',
            localField: "direct_client",
            foreignField: "_id",
            as: "direct_client_data"                                                                  
        }},
        {$lookup: {
            from:'tbl_clients',
            localField: "end_client",
            foreignField: "_id",
            as: "end_client_data"                                                                  
        }},
        { "$limit": perPage * req.body.page },
        { "$skip": perPage * page },
    ])
    .toArray(function (err, db_data) {

            if(err){
                return res.status(202).json({message:err});
            }

            if(db_data.length > 0){
                db_data.forEach((element) => {
                  
                    data.push({
                        "id": element._id,
                        "status": element.status,
                        "candidate_name": element.candidate_name,
                        "direct_client": element.direct_client_data.length > 0 ?  element.direct_client_data[0].client_name : '',
                        "end_client": element.end_client_data.length > 0 ?  element.end_client_data[0].client_name : '',
                        "contact_number": element.contact_number,
                        "job_id": element.job_id,
                        "job_title": element.job_title,
                        "visa_status": element.visa_status,
                        "job_duration": element.job_duration,
                        "bill_rate": element.bill_rate,
                        "pay_rate": element.pay_rate,
                        "margin": element.margin,
                        "start_date": element.start_date == "" ? "" : element.start_date,
                        "tentative_start_date": element.tentative_start_date,
                        "employee_name": element.employee_data.length > 0 ?  element.employee_data[0].employee_name : '',
                        "team_lead": element.team_data.length > 0 ?  element.team_data[0].admin_name : '',
                        "accounts_manager": element.account_manager_data.length > 0 ?  element.account_manager_data[0].admin_name : '',
                        "created_date": new Date(element.created_date).toLocaleDateString('en-US'),
                    })

                });
            }

            leads.find({$and: [query], $or: 
                [ 
                    { candidate_name: { "$regex": search, "$options": "i"} },
                    { direct_client: { "$regex": search, "$options": "i"} },
                    { end_client: { "$regex": search, "$options": "i"} },
                    { contact_number: { "$regex": search, "$options": "i"} },
                    { job_id: { "$regex": search, "$options": "i"} },
                    { job_title: { "$regex": search, "$options": "i"} },
                    { visa_status: { "$regex": search, "$options": "i"} },
                    { job_duration: { "$regex": search, "$options": "i"} },
                    { bill_rate: { "$regex": search, "$options": "i"} },
                    { pay_rate: { "$regex": search, "$options": "i"} },
                    { margin: { "$regex": search, "$options": "i"} },
                    { status: { "$regex": search, "$options": "i"} },
                ] 
            }).count(function (err, count) {
                return res.status(200).json({
                    total_users: data,
                    pageIndex: req.body.page,
                    total_pages: Math.ceil(count / perPage),
                    total_users_count: count,
                    prevPage: page > 0 ? true : false,
                    nextPage: Math.ceil(count / perPage) === req.body.page ? false : true
                });   
            })
        })
}

exports.deleteLead = (req, res) => {

    const id = req.body.user_id;
    if(!id){
        return res.status(202).json({ message: "Lead ID is Required." });
    }

    leads.deleteOne({ _id: new ObjectId(id) },(error, result) => {
        
        if (result.deletedCount > 0) {
            return res.status(200).json({ message: "Lead Deleted Successfully" });
        }else{
            return res.status(202).json({ message: "Lead Not Found" });
        }

    });

}

exports.get_singlelead = (req, res) => {

    const id = req.body.id;
    if(!id){
        return res.status(202).json({ message: "ID is Required." });
    }

    leads.find({ _id: new ObjectId(id) }).toArray((error, result) => {
        
        if (result.length > 0) {
            return res.status(200).json({ lead_data: result[0] });
        }else{
            return res.status(202).json({ message: "Lead Not Found." });
        }

    });

}

exports.update_startdate = (req, res) => {
    
    if(!req.body.offer_id){
        return res.status(202).json({ message: "ID is Required." });
    }

    if(req.body.ref == 'exit'){

        const data = {
            "status": 0,
            "exit_date": moment().format('YYYY-MM-DD')
        }

        leads.updateOne({_id:new ObjectId(req.body.offer_id)}, {$set: data}, function (error, result) {
            if (error) {
                return res.status(202).json({
                    message: 'error occured'
                });
            }

            if (result) {
                return res.status(200).json({
                    message: "Offer status Updated Successfully"
                })
            }
        });

    }else{

        if(!req.body.start_date){
            return res.status(202).json({ message: "Start Date is Required." });
        }
        
        const data = {
            "start_date": req.body.start_date,
            "status": 1
        }

        leads.updateOne({_id:new ObjectId(req.body.offer_id)}, {$set: data}, function (error, result) {
            if (error) {
                return res.status(202).json({
                    message: 'error occured'
                });
            }

            if (result) {
                return res.status(200).json({
                    message: "Start Date Updated Successfully"
                })
            }
        });

    }
}

exports.export_leads = (req, res) => {
    
    var search = ""; // req.body.search
    var status = req.body.status
    const data = []

    const role = 1; //req.body.role;

    var column_name = "";
    if(role === 5){
        column_name = "employee_id";     
    }else if(role === 4){
        column_name = "team_lead";     
    }else if(role === 3){
        column_name = "accounts_manager";     
    }else{
        column_name = "created_by";
    }
    
    var filterStatus = "";
    if(status == "offers"){
        filterStatus = 2;
    }else if(status == "active"){
        filterStatus = 1;
    }else if(status == "exit"){
        filterStatus = 0;
    }

    var query = {};
    if(role !== 1 && role !== 2)
        query[column_name] = req.body.user_id;

    query["deleted"] = 0;
    if(status !== "consultants")
        query["status"] = 1;
    leads.aggregate([
        { "$sort": { '_id' : -1 } },
        { $limit: 100 },
        {$match: 
            {
                $and: [query],
                $or: 
                [ 
                    { candidate_name: { "$regex": search, "$options": "i"} },
                    { direct_client: { "$regex": search, "$options": "i"} },
                    { end_client: { "$regex": search, "$options": "i"} },
                    { contact_number: { "$regex": search, "$options": "i"} },
                    { job_id: { "$regex": search, "$options": "i"} },
                    { job_title: { "$regex": search, "$options": "i"} },
                    { visa_status: { "$regex": search, "$options": "i"} },
                    { job_duration: { "$regex": search, "$options": "i"} },
                    { bill_rate: { "$regex": search, "$options": "i"} },
                    { pay_rate: { "$regex": search, "$options": "i"} },
                    { margin: { "$regex": search, "$options": "i"} },
                    { status: { "$regex": search, "$options": "i"} },
                ],
                
            },
        },
        { "$addFields": {
            employee_id: {
                "$toObjectId": "$employee_id"
            },
            team_lead: {
                "$toObjectId": "$team_lead"
            },
            accounts_manager: {
                "$toObjectId": "$accounts_manager"
            },
            direct_client: {
                "$toObjectId": "$direct_client"
            },
            end_client: {
                "$toObjectId": "$end_client"
            }
        }},
        { $lookup: {
            from:'tbl_employees',
            localField: "employee_id",
            foreignField: "_id",
            as: "employee_data"                                                                  
        }},
        {$lookup: {
            from:'tbl_auths',
            localField: "team_lead",
            foreignField: "_id",
            as: "team_data"                                                                  
        }},
        {$lookup: {
            from:'tbl_auths',
            localField: "accounts_manager",
            foreignField: "_id",
            as: "account_manager_data"                                                                  
        }},
        {$lookup: {
            from:'tbl_clients',
            localField: "direct_client",
            foreignField: "_id",
            as: "direct_client_data"                                                                  
        }},
        {$lookup: {
            from:'tbl_clients',
            localField: "end_client",
            foreignField: "_id",
            as: "end_client_data"                                                                  
        }},
    ])
    .forEach(function (db_data) {

        const csvFields = ['status', 'candidate_name', 'contact_number']
        const json2csvParser = new Json2csvParser({
            csvFields
        });
        const csvData = json2csvParser.parse([{"status":db_data.status,"candidate_name":db_data.candidate_name,"contact_number":db_data.contact_number}]);
        fs.writeFile("bezkoder_mongodb_fs.csv", csvData, function(error) {
            if (error) throw error;
            fs.chmod("bezkoder_mongodb_fs.csv", 0666, (error) => {
                // console.log('Changed file permissions');
            });
            console.log("Write to bezkoder_mongodb_fs.csv successfully!");
        });



    //     console.log(db_data)

    //         // if(db_data.length > 0){
    //         //     db_data.forEach((element) => {

    //                 var status = "";
    //                 var visastatus = "";
    //                 // if(db_data.status == 1){
    //                 //     status = "Active";
    //                 // }else if(db_data.status == 0){
    //                 //     status = "Exit";
    //                 // }else if(db_data.status == 2){
    //                 //     status = "Offer"
    //                 // }

    //                 // if(db_data.visa_status == 1){
    //                 //     visastatus = "Yes";
    //                 // }else if(db_data.visa_status == 0){
    //                 //     visastatus = "No";
    //                 // }

    //                 // data.push({
    //                 //     "status": status,
    //                 //     "candidate_name": db_data.candidate_name,
    //                 //     "direct_client": db_data.direct_client_data.length > 0 ?  db_data.direct_client_data[0].client_name : '',
    //                 //     "end_client": db_data.end_client_data.length > 0 ?  db_data.end_client_data[0].client_name : '',
    //                 //     "contact_number": db_data.contact_number,
    //                 //     "job_id": db_data.job_id,
    //                 //     "job_title": db_data.job_title,
    //                 //     "visa_status": visastatus,
    //                 //     "job_duration": db_data.job_duration,
    //                 //     "bill_rate": db_data.bill_rate,
    //                 //     "pay_rate": db_data.pay_rate,
    //                 //     "margin": db_data.margin,
    //                 //     "start_date": db_data.start_date == "" ? "" : db_data.start_date,
    //                 //     "tentative_start_date": db_data.tentative_start_date,
    //                 //     "employee_name": db_data.employee_data.length > 0 ?  db_data.employee_data[0].employee_name : '',
    //                 //     "team_lead": db_data.team_data.length > 0 ?  db_data.team_data[0].admin_name : '',
    //                 //     "accounts_manager": db_data.account_manager_data.length > 0 ?  db_data.account_manager_data[0].admin_name : '',
    //                 //     "created_date": new Date(db_data.created_date).toLocaleDateString('en-US'),
    //                 // })

    //             // });

    //                 // const csv = new ObjectsToCsv(data)
    //                 // await csv.toDisk('./list.csv', { append: true })
    //         // }

    //         // return res.status(200).json({
    //         //     export_data: data,
    //         // });
    //     }, function(err) {
    //         console.log(err)
        });

 }