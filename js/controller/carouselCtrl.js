'use strict';

app.controller('carouselCtrl', ['$scope', function (scope) {
  scope.myInterval = 5000;
  scope.noWrapSlides = false;
  var slides = scope.slides = [];
  scope.slides=[
            {'image':'/css/images/img1.jpg', 'text':'Web Design'},
            {'image':'/css/images/img2.jpg', 'text':'Software Development'},
            {'image':'/css/images/img3.jpg', 'text':'Free Web Hosting'},
            {'image':'/css/images/img4.jpg', 'text':'Mobile App Development'},
            {'image':'/css/images/img5.jpg', 'text':'Software Training'},
            {'image':'/css/images/img3.jpg', 'text':'Consulting'}
      ];
}]);