'use strict';

app.controller('olaCtrl', ['$scope', function(scope){
angular.element(".app-header").hide();
angular.element(".app-footer").hide();

scope.travelDetails ={
  name: "OLA",
  address: "A Wing’ Sunteck Centre, 37-40 Subhash Road, Off. Western Express Highway, Vile Parle (East)",
  city: "Mumbai",
  state: "Maharastra",
  pincode: "400057",
  phone:["+91 22 3355 3355", " 022 30947974"],
  email:"support@olacabs.com",
  website:"www.olacabs.com",
  serviceTaxNumber:"AAJCA1389GSD001",
  pan:"AAJCA1389G",
  cin:"U72900MH2010PTC240894​",
  travelCity: "Bangalore",
  serviceType:"Cab, Mini",
  date: "22 Dec, 2017",
  invoiceNumber:"117657643"
};

scope.customerDetails={
  name: "Saibaba Koyalkar",
  address: "14-2-64, Goshamhal Chandanwadi",
  city:"Hyderabad",
  state:"Telengana",
  pin: "500012",
  country: "India",
  companyName: "",
  companyAddress: "",
  bookingDate:"22 Dec, 2017, 07:05 am",
  pickupDate:"22 Dec, 2017, 07:20 am",
  bookingEmail:"saibaba.c@gmail.com"
};

scope.rate={
  firstFourKms: 80,
  ratePerKm: 21,
  totalDistance: 49,
  freeRideTime:5,
  totalRideTime: 90
}


scope.rateForTotalKms = scope.rate.totalDistance * scope.rate.ratePerKm;
scope.rideTimeCharge = (scope.rate.totalRideTime - scope.rate.freeRideTime) *1;
scope.serviceTax = (scope.rateForTotalKms/100) * 9;
scope.totalFare = scope.rate.firstFourKms + scope.rateForTotalKms + scope.rideTimeCharge + scope.serviceTax;

}]);
