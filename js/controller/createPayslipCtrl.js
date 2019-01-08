'use strict';

app.controller('createPayslipCtrl', ['$scope', 'lettersService', function(scope, lettersService){

lettersService.x("hello");

angular.element(".app-header").hide();
angular.element(".app-footer").hide();

scope.months=lettersService.months;
scope.years=lettersService.years;

var Goverdhan = {
                empId: 'S1002',
                name:{'fname':"Goverdhan", "lname":"Koyalkar"},
                designation:'Technical Lead',
                level:'4',
                panNumber:'AIQPC8645R',
                accountDetails:{"accountNumber":"911010012794375", 'bankName':"AXIS", 'branch':""},
                providentFundNumber:'AP/24177/4229',
                paySlip:{"day":1, "month":8, "year":2017},
                workingDays:31,
                lossOfPay:0,
                ctc:5500000,
                monthly: null,
                earnings:{
                    basic: null,
                    hra: null,
                    medicalAllowance: null,
                    conveyanceAllowance : null,
                    specialAllowance : null,
                    leaveTravelAllowance : null,
                    grossTotal : null
                },
                deductions:{
                    providentFund: null,
                    professionalTax: null,
                    TDS: null,
                    other: null,
                    loanInstallment: null,
                    subTotal: null
                },
            netPay: null
            }
var sai = {
                empId: '1302',
                name:{'fname':"Saibaba", "lname":"Koyalkar"},
                designation:'UI Developer',
                level:'3',
                panNumber:'AIQPC8645R',
                accountDetails:{"accountNumber":"911010012794375", 'bankName':"SBI", 'branch':""},
                providentFundNumber:'AP/24177/4229',
                paySlip:{"day":1, "month":1, "year":2016},
                workingDays:31,
                lossOfPay:0,
                ctc:3720000,
                monthly: null,
                earnings:{
                    basic: null,
                    hra: null,
                    medicalAllowance: null,
                    conveyanceAllowance : null,
                    specialAllowance : null,
                    leaveTravelAllowance : null,
                    grossTotal : null
                },
                deductions:{
                    providentFund: null,
                    professionalTax: null,
                    TDS: null,
                    other: null,
                    loanInstallment: null,
                    subTotal: null
                },
            netPay: null
            }
            var sudarshan = {
                empId: '1310',
                name:{'fname':"Sudarshan", "lname":"Koyalkar"},
                designation:'UI Developer',
                level:'3',
                panNumber:'AIQPC8645R',
                accountDetails:{"accountNumber":"911010012794375", 'bankName':"SBI", 'branch':""},
                providentFundNumber:'AP/24177/4229',
                paySlip:{"day":1, "month":1, "year":2016},
                workingDays:31,
                lossOfPay:0,
                ctc:1200000,
                monthly: null,
                earnings:{
                    basic: null,
                    hra: null,
                    medicalAllowance: null,
                    conveyanceAllowance : null,
                    specialAllowance : null,
                    leaveTravelAllowance : null,
                    grossTotal : null
                },
                deductions:{
                    providentFund: null,
                    professionalTax: null,
                    TDS: null,
                    other: null,
                    loanInstallment: null,
                    subTotal: null
                },
            netPay: null
            }

	scope.employee = Goverdhan;

            scope.employee.monthly = scope.employee.ctc/12;
            scope.employee.earnings.basic = (scope.employee.monthly/100)*40;
            scope.employee.earnings.hra = (scope.employee.monthly/100)*15;
            scope.employee.earnings.medicalAllowance = (scope.employee.monthly/100)*8;
            scope.employee.earnings.conveyanceAllowance = (scope.employee.monthly/100)*2;
            scope.employee.earnings.specialAllowance = (scope.employee.monthly/100)*35;
            scope.employee.earnings.leaveTravelAllowance = (scope.employee.monthly/100)*0;
            scope.employee.earnings.grossTotal =
                            scope.employee.earnings.basic
                            + scope.employee.earnings.hra
                            + scope.employee.earnings.medicalAllowance
                            + scope.employee.earnings.conveyanceAllowance
                            + scope.employee.earnings.specialAllowance
                            + scope.employee.earnings.leaveTravelAllowance;
            scope.employee.deductions.providentFund=(scope.employee.monthly/100)*12;
            scope.employee.deductions.professionalTax=200;
            scope.employee.deductions.TDS=(scope.employee.monthly/100)*10;
            scope.employee.deductions.other=0;
            scope.employee.deductions.loanInstallment= 0;
            scope.employee.deductions.subTotal= scope.employee.deductions.providentFund
                            + scope.employee.deductions.professionalTax
                            + scope.employee.deductions.TDS
                            + scope.employee.deductions.other
                            + scope.employee.deductions.loanInstallment;
        scope.employee.netPay=scope.employee.earnings.grossTotal - scope.employee.deductions.subTotal;
 }]);
