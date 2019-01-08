'use strict';

app.controller('playStationCtrl', ['$scope', "$timeout", "playStationService",
    function(scope, timeout, playStationService) {
        angular.element(".app-header").hide();
        angular.element(".app-footer").hide();

        var promise;
        var systems = playStationService.getSystems();
        var customers = playStationService.getCustomers();

        if (systems === null) {
            playStationService.setSystems();
            systems = playStationService.getSystems();
        }
        if (customers === null) {
            playStationService.setCustomers();
            customers = playStationService.getCustomers();
        }

        scope.systems = systems;
        scope.customers = customers;
        scope.master = [];
        scope.waitList = [];

        scope.activeCustomers = [];
        scope.inActiveCustomers = [];

        var laterTime;
        var date;

        scope.membersList = [{
            key: "1 or 2 Players",
            value: "1"
        }, {
            key: "3 or 4 Players",
            value: "2"
        }, {
            key: "5 or 6 Players",
            value: "3"
        }];
        scope.durationsList = [{
            key: "30 mins",
            value: "1"
        }, {
            key: "60 mins",
            value: "2"
        }];
        var priceList = [
            [10, 20],
            [30, 40],
            [50, 60]
        ];

        scope.enableStart = function(index) {
            if (!scope.systems[index].customer.name && !scope.systems[index].members.count && !scope.systems[index].duration.hours) {
                scope.systems[index].startBtn.disable = true;
            } else {
                scope.systems[index].startBtn.disable = false;
            }
        };

        scope.start = function(index) {
            date = new Date();
            laterTime = new Date(date.getTime() + scope.systems[index].duration.hours * 30 * 60 * 1000);
            scope.systems[index].customer.disable = true;
            scope.systems[index].members.disable = true;
            scope.systems[index].duration.disable = true;

            scope.systems[index].startBtn.disable = true;
            scope.systems[index].startBtn.show = false;

            scope.systems[index].stopBtn.disable = false;
            scope.systems[index].stopBtn.show = true;

            scope.systems[index].editBtn.disable = false;
            scope.systems[index].editBtn.show = true;

            scope.systems[index].editStartTimePanel.show=false;

            scope.systems[index].timeStamp = new Date();

            scope.systems[index].startTime.value = date;
            scope.systems[index].endTime.value = new Date(laterTime);

            scope.systems[index].invoiceDetails.push({
                'mem': scope.membersList[scope.systems[index].members.count - 1].key,
                'mins': scope.durationsList[scope.systems[index].duration.hours - 1].key,
                'duration': {st:scope.systems[index].startTime.value, et:scope.systems[index].endTime.value},
                'amt': priceList[scope.systems[index].members.count - 1][scope.systems[index].duration.hours - 1]
            });
            scope.systems[index].status = true;

            for (var i = 0; i < scope.systems[index].invoiceDetails.length; i++) {
                scope.systems[index].amount += scope.systems[index].invoiceDetails[i].amt;
            }

            localStorage.setItem("sys", JSON.stringify(scope.systems));
            promise = timeout(function() {

                    scope.systems[index].timeFinish = true;
                    scope.systems[index].members.disable = false;
                    scope.systems[index].duration.disable = false;
                    scope.systems[index].continueBtn.disable = false;
                    scope.systems[index].continueBtn.show = true;

                    scope.systems[index].editBtn.disable = true;
                    scope.systems[index].editBtn.show = false;

                    document.getElementById("play" + index).play();
		            localStorage.setItem("sys", JSON.stringify(scope.systems));
                },
//                (scope.systems[index].duration.hours * 30 * 1000 * 60)
                1000
            );
        };

        scope.enableEdit = function(index) {
            if (!scope.systems[index].customer.name && !scope.systems[index].members.count && !scope.systems[index].duration.hours && scope.systems[index].startBtn.disable) {
                scope.systems[index].editBtn.disable = false;
                scope.systems[index].editBtn.show = true;
            } else {
                scope.systems[index].editBtn.disable = true;
                scope.systems[index].editBtn.show = false;
            }
            localStorage.setItem("sys", JSON.stringify(scope.systems));
        };

        scope.edit = function(index) {
            scope.systems[index].startBtn.disable = true;
            scope.master[index] = angular.copy(scope.systems[index]);
            scope.systems[index].editMode = true;

            scope.systems[index].members.disable = false;
            scope.systems[index].duration.disable = false;


            scope.systems[index].editBtn.disable = true;
            scope.systems[index].editBtn.show = false;

            scope.systems[index].updateBtn.disable = false;
            scope.systems[index].updateBtn.show = true;

            scope.systems[index].cancelBtn.disable = false;
            scope.systems[index].cancelBtn.show = true;

			scope.systems[index].editStartTimePanel.show=true;

			scope.systems[index].cancelGameBtn.show=true;
            
            localStorage.setItem("sys", JSON.stringify(scope.systems));
	    };

        scope.update = function(index) {
            scope.systems[index].amount = null;
            scope.systems[index].endTime.value = new Date(new Date(scope.systems[index].startTime.value).getTime() + (scope.systems[index].duration.hours * 30 * 60 * 1000));
            scope.systems[index].invoiceDetails[scope.systems[index].invoiceDetails.length - 1].mem = scope.membersList[scope.systems[index].members.count - 1].key;
            scope.systems[index].invoiceDetails[scope.systems[index].invoiceDetails.length - 1].duration = {st:scope.systems[index].startTime.value, et:scope.systems[index].endTime.value};
            scope.systems[index].invoiceDetails[scope.systems[index].invoiceDetails.length - 1].mins = scope.durationsList[scope.systems[index].duration.hours - 1].key;
            scope.systems[index].invoiceDetails[scope.systems[index].invoiceDetails.length - 1].amt = priceList[scope.systems[index].members.count - 1][scope.systems[index].duration.hours - 1];

			scope.systems[index].editMode = false;
			
			scope.systems[index].editStartTimePanel.show=false;

			scope.systems[index].cancelGameBtn.show=false;

            for (var i = 0; i < scope.systems[index].invoiceDetails.length; i++) {
                scope.systems[index].amount += scope.systems[index].invoiceDetails[i].amt;
            }

            promise = timeout(function() {
                    scope.systems[index].timeFinish = true;
                    scope.systems[index].members.disable = false;
                    scope.systems[index].duration.disable = false;
                    scope.systems[index].continueBtn.show = true;
                    scope.systems[index].editBtn.show = false;
                    document.getElementById("#play" + index).play();
		            localStorage.setItem("sys", JSON.stringify(scope.systems));
                },
                (scope.systems[index].duration.hours * 30 * 1000 * 60)
            );

            scope.systems[index].members.disable = true;
            scope.systems[index].duration.disable = true;
            scope.systems[index].startBtn.disable = true;
            
            scope.systems[index].editBtn.disable = false;            
            scope.systems[index].editBtn.show = true;
            
            scope.systems[index].updateBtn.show = false;
            scope.systems[index].cancelBtn.show = false;
            localStorage.setItem("sys", JSON.stringify(scope.systems));            
        }
        scope.cancel = function(index) {
            angular.copy(scope.master[index], scope.systems[index]);
            // scope.systems[index].editMode = false;
            // scope.systems[index].editBtn.show = true;
            // scope.systems[index].updateBtn.show = false;
            // scope.systems[index].cancelBtn.show = false;

            localStorage.setItem("sys", JSON.stringify(scope.systems));            
        }

        scope.continue = function(index) {
            scope.systems[index].amount = null;
            scope.systems[index].members.disable = true;
            scope.systems[index].duration.disable = true;
            scope.systems[index].editBtn.show = true;
            scope.systems[index].editBtn.disable = false;

            scope.systems[index].continueBtn.disable = true;
            scope.systems[index].continueBtn.show = false;
            scope.systems[index].startTime.show = true;

            var et = new Date(scope.systems[index].endTime.value).getTime() + (scope.systems[index].duration.hours * 30 * 60 * 1000);
			scope.systems[index].endTime.show=true;
            scope.systems[index].invoiceDetails.push({
                'mem': scope.membersList[scope.systems[index].members.count - 1].key,
                'mins': scope.durationsList[scope.systems[index].duration.hours - 1].key,
                'duration': {st:scope.systems[index].endTime.value, et: new Date(et)},
                'amt': priceList[scope.systems[index].members.count - 1][scope.systems[index].duration.hours - 1]
            });

            scope.systems[index].endTime.value = new Date(et);
            scope.systems[index].status = true;

            for (var i = 0; i < scope.systems[index].invoiceDetails.length; i++) {
                scope.systems[index].amount += scope.systems[index].invoiceDetails[i].amt;
            }

            scope.systems[index].timeFinish = false;
            document.getElementById("play" + index).pause();

            promise = timeout(function() {
                    scope.systems[index].timeFinish = true;
                    scope.systems[index].members.disable = false;
                    scope.systems[index].duration.disable = false;
                    scope.systems[index].continueBtn.disable = false;
                    scope.systems[index].continueBtn.show = true;
	    	        scope.systems[index].editBtn.show = false;
    	    	    scope.systems[index].editBtn.disable = true;


                    document.getElementById("play" + index).play();
                    localStorage.setItem("sys", JSON.stringify(scope.systems));            
                },
                (scope.systems[index].duration.hours * 30 * 1000 * 60)
//  1000
            );
            localStorage.setItem("sys", JSON.stringify(scope.systems));            

        };

        scope.enableContine = function(index) {
            if (scope.systems[index].members.count == null && scope.systems[index].duration.hours == null && !scope.systems[index].timeFinish) {
                return true;
            } else {
                return false;
            }
        }

        scope.stop = function(index) {
			scope.customers.push(scope.systems[index]);
	        localStorage.setItem("customers", JSON.stringify(scope.customers));

            angular.element("#editStartTimeBtn" + index).hide();
            document.getElementById("play" + index).pause();
            scope.systems[index] = reset(index+1);
            timeout.cancel(promise);
            localStorage.setItem("sys", JSON.stringify(scope.systems));
        };

        scope.cancelGame = function(index) {

            document.getElementById("play" + index).pause();
            angular.element("#editStartTimeBtn" + index).hide();
            scope.systems[index] = reset(index+1);
            timeout.cancel(promise);
            localStorage.setItem("sys", JSON.stringify(scope.systems));
        }

        scope.waiting = {
            customer: {
                name: null
            },
            members: {
                count: null
            },
            duration: {
                hours: null
            }
        };

        scope.enableWait = function() {
            if (scope.waiting.customer.name != null && scope.waiting.members.count != null && scope.waiting.duration.hours != null) {
                return false;
            } else {
                return true;
            }

        }
        scope.wait = function() {

            scope.waitList.push({
                customer: {
                    name: scope.waiting.customer.name
                },
                members: {
                    count: scope.waiting.members.count
                },
                duration: {
                    hours: scope.waiting.duration.hours
                }
            });
            scope.waiting.customer.name = null;
            scope.waiting.members.count = null;
            scope.waiting.duration.hours = null;

        };
        scope.assignSystem = function(index, sysNum) {
            scope.systems[sysNum].customer.name = scope.waitList[index].customer.name;
            scope.systems[sysNum].members.count = scope.waitList[index].members.count;
            scope.systems[sysNum].duration.hours = scope.waitList[index].duration.hours;
            scope.waitList.splice(index, 1);

        };

        scope.removeWaiting = function(index) {
            scope.waitList.splice(index, 1);
        }

        scope.cleanSystems=function(){
        	localStorage.removeItem("sys")
        }

        scope.cleanCustomers=function(){
        	localStorage.removeItem("customers")
        }

        var pad2 = function(number) {
            return (number < 10 ? '0' : '') + number
        }
        var reset = function(systemNumber) {
            return {
                systemNumber: systemNumber,
                customer: {
                    name: null,
                    disable: false
                },
                members: {
                    count: 1,
                    disable: false
                },
                duration: {
                    hours: 1,
                    disable: false
                },
                startBtn: {
                    disable: true,
                    show: true
                },
                continueBtn: {
                    disable: true,
                    show: false
                },
                editBtn: {
                    disable: true,
                    show: false
                },
                stopBtn: {
                    disable: true,
                    show: false
                },
                cancelBtn: {
                    disable: true,
                    show: false
                },
                updateBtn: {
                    disable: true,
                    show: false
                },
                invoiceDetails: [],
                startTime: {
                    value: null,
                    show: false
                },
                endTime: {
                    value: null,
                    show: false
                },
                timeStamp: null,
                amount: null,
                status: false,
                editMode: false,
                cancelGameBtn: {
                    disable: true,
                    show: false
                },
                timeFinish: false, 
                editStartTimePanel: {
                            disable: true, 
                            show: false
                        }
            }
        }
    }
]);