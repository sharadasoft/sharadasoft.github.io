'use strict';

app.factory('contactUsService', ['Restangular', 'mangoDBApiKey',
    function(Restangular, mangoDBApiKey) {

        var factory = {};
        factory.getQueries = function(){
            return Restangular.all("contactus").getList({"apiKey": mangoDBApiKey});
        };
        factory.sendQuery = function(data){
            return Restangular.one("contactus").post(null, data, {"apiKey": mangoDBApiKey});
        }


        return factory;
    }
]);