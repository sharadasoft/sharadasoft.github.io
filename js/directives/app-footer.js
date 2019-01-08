'use strict';

app.directive("appFooter", function(){
	return {
		link: function(scope, ele, attrs){

		},
		restrict:'C',
		templateUrl: 'views/shared/footer.html'
	}
});