
//find user by credential 

388c8a9aa0c3c07f469d2cfb375ca22d0610fc18

     }
  
      function findUserByCredentials(credentials) {
 -        for(var u in mock) {
 -            if( mock[u].username === credentials.username &&
 -                mock[u].password === credentials.password) {
 -                return mock[u];
 -            }
 -        }
 -        return null;
 +
 +        var deferred = q.defer();
 +
 +        // find one retrieves one document
 +        UserModel.findOne(
 +
 +            // first argument is predicate
 				//retrieve me one instance that matches. 
 +            { username: credentials.username,
 +              password: credentials.password },
 +
 +            // doc is unique instance matches predicate
 +            function(err, doc) {
 +
 +                if (err) {
 +                    // reject promise if error
 +                    deferred.reject(err);
 +                } else {
 +                    // resolve promise
 +                    deferred.resolve(doc);
 +                }
 +
 +        });
 +
 +        return deferred.promise;
      }
  } 