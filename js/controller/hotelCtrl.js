'use strict';

app.controller('hotelCtrl', ['$scope', function(scope){
angular.element(".app-header").hide();
angular.element(".app-footer").hide();

scope.hotelDetails1 ={
  logoUrl:"../../css/images/Wave_Beach_Hotel_LOGO.webp",
  name: "Wave Beach Hotel",
  address: "22/4 Reagan, Dona Paula",
  city: "Panjim",
  state: "Goa",
  pincode: "403004",
  phone: ["+91 99 2353 8193", "+91 96 8957 9792", "+91 83 2245 2492"],
  email: "wavehotelgoa@wavebeachhotel.com",
  website: "www.wavebeachhotel.com",
  GST:"65ASBCR0R111M1ZN"
};

scope.customerDetails1={
  name: "Goverdhan Koyalkar",
  address: "14-2-64, Goshamhal Chandanwadi",
  city:"Hyderabad",
  state:"Telengana",
  pin: "500012",
  country: "India",
  companyName: "",
  companyAddress: "",
  arrivalDate: new Date ("06/29/2017"),
  arrivalTime:"9:00 PM",
  numberOfNights: 6,
  numberOfGuests:"5",
  departureDate:new Date ("06/29/2017"),
  departureTime:"05:00 AM"
};

scope.roomDetails1={
  roomNo: ["224","225","227"],
  roomType: "Delux",
  tarrif:4000,
  centralGST:null,
  stateGST:null,
  centralGSTPercentage: 9.0,
  stateGSTPercentage: 9.0,
  luxuryTax: null,
  luxuryTaxPercentage: 12.0,
  serviceTax: null,
  serviceTaxPercentage: 8.4,
  swachhBharatChess: null,
  swachhBharatChessPercentage: 0.3,
  roomTotal:[],
  dayTotal:[]

}


scope.hotelDetails ={
  logoUrl:"../../css/images/nagarjuna.jpg",
  name: "NAGARJUNA SUITES",
  address: "#19/5, Panathur Main Road, Off Marathalli-Sarjapur Outer Ring Road Kadubeesanahalli Circle",
  city: "Bangalore",
  state: "Karnataka",
  pincode: "403004",
  phone: ["080-42644444"],
  email: "info@nagarjunasuites.com",
  website: "www.nagarjunasuites.com",
  GST:"65ASBCR0R111M1ZN"
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
  arrivalDate: new Date ("12/22/2017"),
  arrivalTime:"9:00 AM",
  numberOfNights: 3,
  numberOfGuests:"1",
  departureDate:new Date ("12/25/2017"),
  departureTime:"09:00 AM"
};

//scope.customerDetails.departureDate.setDate(scope.customerDetails.arrivalDate.getDate() + scope.customerDetails.numberOfNights);

scope.roomDetails={
  roomNo: ["224"],
  roomType: "Delux",
  tarrif:2000,
  centralGST:null,
  stateGST:null,
  centralGSTPercentage: 9.0,
  stateGSTPercentage: 9.0,
  luxuryTax: null,
  luxuryTaxPercentage: 12.0,
  serviceTax: null,
  serviceTaxPercentage: 8.4,
  swachhBharatChess: null,
  swachhBharatChessPercentage: 0.3,
  roomTotal:[],
  dayTotal:[]

}

scope.roomDetails.luxuryTax = (scope.roomDetails.tarrif /100 ) * scope.roomDetails.luxuryTaxPercentage;
scope.roomDetails.serviceTax = (scope.roomDetails.tarrif /100 ) * scope.roomDetails.serviceTaxPercentage;
scope.roomDetails.swachhBharatChess = (scope.roomDetails.tarrif /100 ) * scope.roomDetails.swachhBharatChessPercentage;
scope.roomDetails.centralGST = (scope.roomDetails.tarrif /100 ) * scope.roomDetails.centralGSTPercentage;
scope.roomDetails.stateGST = (scope.roomDetails.tarrif /100 ) * scope.roomDetails.stateGSTPercentage;


var calcTotal = function (){
  var sum=null;
  for(var i=0; i<arguments.length; i++){
    sum += arguments[i];
  }
  console.log(sum);
  return sum;
}

for(var i=0; i<scope.roomDetails.roomNo.length; i++){
  var rmTotal = calcTotal.call("roomTotal", scope.roomDetails.tarrif, scope.roomDetails.luxuryTax, scope.roomDetails.serviceTax, scope.roomDetails.swachhBharatChess, scope.roomDetails.centralGST, scope.roomDetails.stateGST);
  scope.roomDetails.roomTotal.push(rmTotal);
}
for(var i=0; i<scope.customerDetails.numberOfNights; i++){
  scope.roomDetails.dayTotal.push(calcTotal.apply("dayTotal", scope.roomDetails.roomTotal))
}

scope.roomDetails.grandTotal = calcTotal.apply("dayTotal", scope.roomDetails.dayTotal)
}]);
