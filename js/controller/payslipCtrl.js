'use August';

app.controller('payslipCtrl', ['$scope', 'lettersService', function(scope, lettersService){

angular.element(".app-header").hide();
angular.element(".app-footer").hide();

scope.months=lettersService.months;
scope.years=lettersService.years;

	scope.employee={
				empId: '1002',
                name:{'fname':"Goverdhan", "lname":"Koyalkar"},
                designation:'Technical Lead',
                level:'4',
                panNumber:'AIQPC8645R',
                accountDetails:{"accountNumber":"911010012794375", 'bankName':"AXIS", 'branch':""},
                providentFundNumber:'AP/24177/4229',
                paySlip:{"day":1, "month":"January", "year":2016},
                workingDays:31,
                lossOfPay:0,
                ctc:3720000,
                monthly:function()
                {
                	return (scope.employee.ctc/12);
                },
                earnings:{
                	basic:function(){
                		// 40 percent for Basic
                		return (scope.employee.monthly()/100)*40;
                	}, 
                	hra:function(){
                		// 15 percent for HRA
                		return (scope.employee.monthly()/100)*15;
                	}, 
                	medicalAllowance:function(){
                		// 8 percent for Medical Allowance
                		return (scope.employee.monthly()/100)*8;
                	}, 
                	conveyanceAllowance:function(){
                		// 2 percent for Conveyance Allowance
                		return (scope.employee.monthly()/100)*2;
                	},
                	specialAllowance:function(){
                		// 35 percent for Special Allowance 
                		return (scope.employee.monthly()/100)*35;
                	}, 
                	leaveTravelAllowance:function(){
                		// 0 percent for Basic
                		return (scope.employee.monthly()/100)*0;
                	},
                	grossTotal:function(){
                		return (scope.employee.earnings.basic()
                			+ scope.employee.earnings.hra()
                			+ scope.employee.earnings.medicalAllowance()
                			+ scope.employee.earnings.conveyanceAllowance()
                			+ scope.employee.earnings.specialAllowance()
                			+ scope.employee.earnings.leaveTravelAllowance()
                			); 
                	}
                },
                deductions:{
                	providentFund:function(){
                		return (scope.employee.monthly()/100)*12;
                	}, 
                	professionalTax:200, 
                	TDS:function(){
                		return (scope.employee.monthly()/100)*10;
                	}, 
                	other:function(){
                		return 0; 
                	}, 
                	loanInstallment:function(){
                		return 0; 
                	}, 
                	subTotal:function(){
                		return (scope.employee.deductions.providentFund()
                			+ scope.employee.deductions.professionalTax
                			+ scope.employee.deductions.TDS()
                			+ scope.employee.deductions.other()
                			+ scope.employee.deductions.loanInstallment()
                			); 
                	}
                },
                netPay: function(){
                		return scope.employee.earnings.grossTotal() - scope.employee.deductions.subTotal();
                }                
            }
}]);