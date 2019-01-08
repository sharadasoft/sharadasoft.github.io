'use strict';

app.directive("medicalInvoice", function() {
  return {
    restrict: 'E',
    link: function(scope, ele, attrs) {
      scope.medical = JSON.parse(attrs.medical);
      scope.medicenes = [];
      scope.qty = [];
      scope.rate = [];
      scope.gst = [];
      scope.disc = [];
      scope.amt = [];
      scope.totalRate = 0;
      scope.totalGst = 0;
      scope.totalDisc = 0;
      scope.totalAmt = 0;

      var items = Math.floor((Math.random() * 6) + 4);
      for (var i = 0; i < items; i++) {
        scope.medicenes.push(scope.medicenesList[Math.floor((Math.random() * 700) + 1)]);
      }

      for (var i = 0; i < items; i++) {
        scope.qty.push(Math.floor((Math.random() * 3) + 1));
      }

      for (var i = 0; i < items; i++) {
        scope.rate.push(scope.medicenes[i][3] * scope.qty[i]);
        scope.totalRate += parseInt(scope.rate[i]);
      }

      for (var i = 0; i < items; i++) {
        scope.gst.push(scope.rate[i] / 100 * 5);
        scope.totalGst += parseInt(scope.gst[i]);
      }

      for (var i = 0; i < items; i++) {
        scope.disc.push(scope.rate[i] / 100 * 10);
        scope.totalDisc += parseInt(scope.disc[i]);
      }

      for (var i = 0; i < items; i++) {
        scope.amt.push(scope.rate[i] + scope.gst[i] - scope.disc[i]);
        scope.totalAmt += parseInt(scope.amt[i]);
      }

    },

    templateUrl: 'views/shared/medical-invoice.html'
  }
});
