'use strict';

app.service('lettersService', [function() {

        var factory = {
            months:[{month:'January',days:31}, 
                    {month:'February',days:29},
                    {month:'March',days:31},
                    {month:'April',days:30},
                    {month:'May',days:31},
                    {month:'June',days:30},
                    {month:'July',days:31},
                    {month:'August',days:31},
                    {month:'September',days:30},
                    {month:'October',days:31},
                    {month:'November',days:30},
                    {month:'December',days:31}
                ],
                years:[2015, 2016, 2017],

//RegEx to convert number into words, the only limitation is, you can convert maximum of 9 digits, which I think is more than sufficient in most cases..

                inWords: function(num) {

                    var a = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
                    var b = ['', '', 'Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety'];

    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
    return str;
}

/*
                employee:{
                empId:'S230',
                name:{'fname':"Goverdhan", "lname":"Koyalkar"},
                designation:'Technical Lead',
                level:'4',
                panNumber:'AIQPC8645R',
                accountDetails:{accountNumber:"911010012794375", bankName:"AXIS", branch:""},
                providentFundNumber:'AP/24177/4229',
                paySlip:{"day":1, "month":1, "year":2016},
                workingDays:31,
                lossOfPay:0,
                earnings:{
                    basic:null, 
                    hra:null, 
                    medicalAllowance:null, 
                    conveyanceAllowance:null,
                    specialAllowance:null, 
                    leaveTravelAllowance:'',
                    grossTotal:null
                },
                deductions:{
                    providentFund:null, 
                    professionalTax:null, 
                    TDS:null, 
                    Other:null, 
                    loanInstallment:null, 
                    subTotal:null
                }                
            }
  */      }

/*        factory.getQueries = function(){
            return Restangular.all("contactus").getList({"apiKey": mangoDBApiKey});
        };
        factory.sendQuery = function(data){
            return Restangular.one("contactus").post(null, data, {"apiKey": mangoDBApiKey});
        }
*/        return factory;
    }
]);