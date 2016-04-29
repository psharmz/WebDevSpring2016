var q = require("q");

// This model represents a relationship between a user and a class
// if the user is a professor...they TEACH a class
// if the user is a student... they are ENROLLED in the class 
// This allows professors to add a class that they teach and for students to 
// subscribe to a class so they can get new videos for the class 

module.exports = function(db, mongoose) {
    // load schema
    var EnrolledSchema = require("./userClasses.schema.server.js")(mongoose);

    // create mongoose model
    var EnrolledModel = mongoose.model("Enrolled", EnrolledSchema);

    var api = {
        createEnrollmentEntry: createEnrollmentEntry,
        findEnrollmentEntry: findEnrollmentEntry,
        updateEnrollmentEntry: updateEnrollmentEntry,
        deleteEnrolementEntry: deleteEnrollmentEntry
    };
    return api;

    // add an enrollment
    function createEnrollmentEntry(enrollments){
        var deferred = q.defer();

        EnrolledModel.create(enrollments, function(err, doc){
            if (err){
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    // see if a user (professor or student) is enrolled for a class 
    function findEnrollmentEntry(userId, classId){
        var deferred = q.defer();

        EnrolledModel.findOne(
            {userId: userId,
             classId: classId},

            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }

                return null;
            });

        return deferred.promise;
    }

    // incase the class information has changed, update the enrollemetentry 
    function updateEnrollmentEntry(enrollmentId, updatedClassInfo){
        var deferred = q.defer();

        EnrolledModel.update(
            {_id: enrollmentId},
            { userId: updatedClassInfo.userId,
              classId: updatedClassInfo.classId,
              professor: updatedClassInfo.professor},

            function(err, doc){
                if (err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );

        return deferred.promise;
    }

    // delete a user's enrollement to a class 
    function deleteEnrollementEntry(enrollmentId){
        return EnrolledModel.remove().where("_id").equals(enrollmentId);
    }
}