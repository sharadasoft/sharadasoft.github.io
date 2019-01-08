'use strict';

app.controller('contactFormCtrl', ['$scope', 'contactUsService', function(scope, contactUsService){

	contactUsService.getQueries().then(function(data){
		scope.contacts=data;
	});

	scope.submitQuery=function(contact){
		contactUsService.sendQuery(contact);
		scope.contact = {};
	}


}]);
