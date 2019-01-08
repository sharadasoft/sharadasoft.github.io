'use strict';

app.controller('viewPayslipCtrl', ['$scope', 'lettersService', function(scope, lettersService){

angular.element(".app-header").hide();
angular.element(".app-footer").hide();

scope.months=lettersService.months;
scope.years=lettersService.years;
scope.monthIndex=8;

var goverdhan={
                empId: '1302',
                name:{'fname':"Goverdhan", "lname":"Koyalkar"},
                designation:'Senior Technical Architect',
                level:'4',
                panNumber:'AIQPC8645R',
                accountDetails:{"accountNumber":"05451610144151", 'bankName':"HDFC", 'branch':""},
                providentFundNumber:'AP/24177/4229',
                paySlip:{"day":1, "month":scope.months[scope.monthIndex].month, "year":2017},
                workingDays:scope.months[scope.monthIndex].days,
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
            };

var sai=    {
                empId: '1302',
                name:{'fname':"Sai", "lname":"Koyalkar"},
                designation:'UI Developer',
                level:'3',
                panNumber:'AKKPC3422C',
                accountDetails:{"accountNumber":"00211050732536", 'bankName':"HDFC", 'branch':""},
                providentFundNumber:'AP/24177/4229',
                paySlip:{"day":1, "month":scope.months[scope.monthIndex].month, "year":2017},
                workingDays:scope.months[scope.monthIndex].days,
                lossOfPay:0,
                ctc:1400000,
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
            };
var sudarshan=    {
                empId: '1310',
                name:{'fname':"Sudarshan", "lname":"Koyalkar"},
                designation:'UI Developer',
                level:'3',
                panNumber:'AQQPK8691M',
                accountDetails:{"accountNumber":"911010060082644", 'bankName':"AXIS", 'branch':""},
                providentFundNumber:'BG/BNG/19930/3309',
                paySlip:{"day":1, "month":'February', "year":2016},
                workingDays:29,
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
            };
            var sirisha=    {
                empId: '1315',
                name:{'fname':"Sirisha", "lname":"Kollimarla"},
                designation:'IT Recruiter',
                level:'3',
                panNumber:'ATIPK2133P',
                accountDetails:{"accountNumber":"913010010036190", 'bankName':"AXIS", 'branch':""},
                providentFundNumber:'GJ/AHD/0026917/066',
                paySlip:{"day":1, "month":'May', "year":2016},
                workingDays:31,
                lossOfPay:0,
                ctc:600000,
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
            };

//	scope.employee=goverdhan;
//  scope.employee=sai;
//  scope.employee= sudarshan;
    scope.employee= goverdhan;
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
            scope.employee.deductions.providentFund=(scope.employee.monthly/100)*8;
            scope.employee.deductions.professionalTax=200;
            scope.employee.deductions.TDS=(scope.employee.monthly/100)*20;
            scope.employee.deductions.other=0;
            scope.employee.deductions.loanInstallment= 0;
            scope.employee.deductions.subTotal= scope.employee.deductions.providentFund
                            + scope.employee.deductions.professionalTax
                            + scope.employee.deductions.TDS
                            + scope.employee.deductions.other
                            + scope.employee.deductions.loanInstallment;
        scope.employee.netPay=scope.employee.earnings.grossTotal - scope.employee.deductions.subTotal;
 }]);
