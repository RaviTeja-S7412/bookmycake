const db = require('../../connection.js').getDb();

exports.get_userdata = (req, res) => {

    db.query("SELECT * FROM tbl_users", function (err, result) {
        if (err) throw err;
        console.log(result);
        return res.status(200).json({
            data: result,
        });
    });
}

exports.get_roles = (req, res) => {

    roles.find({ id: { $nin: [1, 5] } })
        .toArray((error, result) => {

            if (error) {
                return res.status(202).json({ message: error });
            }

            if (result.length > 0) {

                return res.status(200).json({
                    roles: result,
                });

            } else {
                return res.status(202).json({
                    message: "Error Occured."
                });
            }
        })
}

exports.get_dashboarddata = (req, res) => {

    const role = req.body.role;
    const user_id = req.body.user_id;

    var empquery = {};
    var tlquery = {};
    var activequery = {};
    var exitquery = {};
    var offerquery = {};
    if (role == 5) {
        // empquery["team_lead"] = user_id;
        offerquery["status"] = { "$exists": true, "$in": [2] };
        offerquery["employee_id"] = user_id;
        activequery["status"] = { "$exists": true, "$in": [1] };
        activequery["employee_id"] = user_id;
        exitquery["status"] = { "$exists": true, "$in": [0] };
        exitquery["employee_id"] = user_id;
    } else if (role == 4) {
        empquery["team_lead"] = user_id;
        offerquery["status"] = { "$exists": true, "$in": [2] };
        offerquery["team_lead"] = user_id;
        activequery["status"] = { "$exists": true, "$in": [1] };
        activequery["team_lead"] = user_id;
        exitquery["status"] = { "$exists": true, "$in": [0] };
        exitquery["team_lead"] = user_id;
    } else if (role == 3) {
        // empquery["team_lead"] = user_id;
        offerquery["status"] = { "$exists": true, "$in": [2] };
        offerquery["accounts_manager"] = user_id;
        activequery["status"] = { "$exists": true, "$in": [1] };
        activequery["accounts_manager"] = user_id;
        exitquery["status"] = { "$exists": true, "$in": [0] };
        exitquery["accounts_manager"] = user_id;
        tlquery["role"] = { "$exists": true, "$in": [4] }
        tlquery["created_by"] = user_id
    } else if (role == 2) {
        // empquery["team_lead"] = user_id;
        offerquery["status"] = { "$exists": true, "$in": [2] };
        activequery["status"] = { "$exists": true, "$in": [1] };
        exitquery["status"] = { "$exists": true, "$in": [0] };
    } else if (role == 1) {
        offerquery["status"] = { "$exists": true, "$in": [2] };
        activequery["status"] = { "$exists": true, "$in": [1] };
        exitquery["status"] = { "$exists": true, "$in": [0] };
        tlquery["role"] = { "$exists": true, "$in": [4] }
    }

    users.aggregate([
        {
            "$facet": {
                "AMCount": [
                    { "$match": { "role": { "$exists": true, "$in": [3] } } },
                    { "$count": "AMCount" },
                ],
                "TLCount": [
                    { "$match": tlquery },
                    { "$count": "TLCount" },
                ]
            }
        },
        {
            "$project": {
                "accounts_managers_count": { "$arrayElemAt": ["$AMCount.AMCount", 0] },
                "team_leads_count": { "$arrayElemAt": ["$TLCount.TLCount", 0] },
            }
        }
    ]).toArray((error, result) => {

        if (error) {
            return res.status(202).json({ message: error });
        }

        if (result) {

            employees.find(empquery).count(function (err, count) {

                leads.aggregate([
                    {
                        "$facet": {
                            "OCount": [
                                { "$match": offerquery },
                                { "$count": "OCount" },
                            ],
                            "ACount": [
                                { "$match": activequery },
                                { "$count": "ACount" },
                            ],
                            "ECount": [
                                { "$match": exitquery },
                                { "$count": "ECount" }
                            ]
                        }
                    },
                    {
                        "$project": {
                            "OCount": { "$arrayElemAt": ["$OCount.OCount", 0] },
                            "ACount": { "$arrayElemAt": ["$ACount.ACount", 0] },
                            "ECount": { "$arrayElemAt": ["$ECount.ECount", 0] }
                        }
                    }
                ]).toArray(function (err, lcount) {

                    result[0]["employees_count"] = count;
                    result[0]["offer_leads_count"] = lcount[0]["OCount"];
                    result[0]["active_leads_count"] = lcount[0]["ACount"];
                    result[0]["exit_leads_count"] = lcount[0]["ECount"];

                    return res.status(200).json({
                        dashboard_data: result,
                    });

                });

            })

        } else {
            return res.status(202).json({
                message: error
            });
        }
    })
}

exports.get_navigationmenu = (req, res) => {

    const navQuery = 'SELECT c.id AS category_id, c.category_name AS category_label, c.route AS category_path, s.id AS subcategory_id, s.sub_category_name AS subcategory_label, s.route AS subcategory_path, ch.id AS childcategory_id, ch.child_category_name AS childcategory_label, ch.route AS childcategory_path FROM tbl_categories c LEFT JOIN tbl_sub_categories s ON c.id = s.category_id LEFT JOIN tbl_child_categories ch ON s.id = ch.sub_category_id ORDER BY c.id, s.id, ch.id';
    db.query(navQuery,(err, categories) => {
        if (err) {
            return callback(err);
        }

        if (categories.length > 0) {
            const result = [];

            categories.forEach((category) => {
                // Find existing category or create new
                let categoryItem = result.find((item) => item.id === category.category_id);

                if (!categoryItem) {
                    categoryItem = {
                        id: category.category_id,
                        label: category.category_label,
                        path: category.category_path,
                        subItems: [],
                    };
                    result.push(categoryItem);
                }

                // Handle subcategories and child categories
                if (category.subcategory_id) {
                    let subcategoryItem = categoryItem.subItems.find((item) => item.id === category.subcategory_id);
                    if (!subcategoryItem) {
                        subcategoryItem = {
                            id: category.subcategory_id,
                            label: category.subcategory_label,
                            path: category.subcategory_path,
                            childItems: [],
                        };
                        categoryItem.subItems.push(subcategoryItem);
                    }

                    if (category.childcategory_id) {
                        subcategoryItem.childItems.push({
                            id: category.childcategory_id,
                            label: category.childcategory_label,
                            path: category.childcategory_path,
                        });
                    }
                }
            });
            return res.status(200).json({ navbar_data: result });
        }else{
            return res.status(202).json({ message: "Data Not Found." });
        }

    });

}


