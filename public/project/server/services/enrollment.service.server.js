
module.exports = function(app, EnrolledModel){

    //it does not make sense to update an enrollment entry. If an enrollment is updated, it would actually be a new enrollement to a new class 
    //but we will leave it in here for good practice...or perhaps to add functionality later for changing the professor, class time, etc for 
    //an existing course 

    //impelment CRUD
    app.post("/api/project/enroll", createEnrollmentEntry);
    app.get("/api/project/enroll", findEnrollmentEntry);
    app.put("/api/project/enroll", updateEnrollmentEntry);
    app.delete("/api/project/enroll/:userId/:EnrollmentId", deleteEnrollmentEntry);

    function createEnrollmentEntry(req, res){
        var entry = req.body;

        EnrolledModel.createEnrollmentEntry(entry)
            .then(
                function (doc){
                    res.json(doc);
                },
                function (err){
                    res.status(400).send(err);
                }
            );
    }

    function findEnrollmentEntry(req, res){
        var userId = req.query.userId;
        var classId = req.query.classId;
        EnrolledModel.findEnrollmentEntry(userId, classId)
            .then(
                function (doc){
                    res.json(doc);
                },
                function (err){
                    res.status(400).send(err);
                }
            );
    }

    function updateEnrollmentEntry(req, res){
        var updatedEnroll = req.body;
        var userId = updatedEnroll.userId;
        var classId = updatedEnroll.classId;
        var professor = updatedEnroll.professor; 

        // find the enrollment entry for a user and class
        EnrolledModel.findEnrollmentEntry(userId, classId)
            .then(
                function (doc){
                    EnrolledModel.updateEnrollmentEntry(doc._id, updatedEnroll)
                        .then(
                            function (doc){
                                res.send(200);
                            },
                            function (err){
                                res.status(400).send(err);
                            }
                        );
                },
                function (err){
                    res.status(400).send(err);
                }
            );
    }


    function deleteEnrollmentEntry(req, res){
        var userId = req.params.userId;
        var scheduleId = req.params.scheduleId;

        // find the availability entry to get the id
        EnrolledModel.findEnrollmentEntry(userId, scheduleId)
            .then(
                function (doc){
                    EnrolledModel.deleteEnrollmentEntry(doc._id)
                        .then(
                            function (doc){
                                res.send(200);
                            },
                            function (err){
                                res.status(400).send(err);
                            }
                        );
                },
                function (err){
                    res.status(400).send(err);
                }
            );
    }
}