'use strict';

app.controller('playStationCtrl', ['$scope', "$timeout", "playStationService", function(scope, timeout, playStationService){

angular.element(".app-header").hide();
angular.element(".app-footer").hide();

var promise;
var systems=playStationService.getSystems();

if(systems===null)
{
playStationService.setSystems();
systems=playStationService.getSystems();
}

 scope.systems = systems;
 scope.master=[];
 scope.waitList=[];

 scope.activeCustomers=[];
 scope.inActiveCustomers=[];

var unitHalfHour= 20;
var unitFullHour= 30;

var laterTime;
var date;

scope.membersList =[{key:"1 or 2 Players", value:"1" }, {key:"3 or 4 Players", value:"2" }, {key:"5 or 6 Players", value:"3" }];
scope.durationsList =[{key:"30 mins", value:"1" }, {key:"60 mins", value:"2" }];
scope.priceList=[[10, 20], [30, 40], [50, 60]];

	scope.start = function (index) {
		date= new Date();
		laterTime = new Date(date.getTime() + scope.systems[index].duration * 30 * 60 * 1000);
		scope.systems[index].customer.disable=false;
		angular.element("#customerName"+ index).attr("disabled", true);
		angular.element("#members"+index).attr("disabled", true);
		angular.element("#duration"+index).attr("disabled", true);
		angular.element("#start"+index).hide();
		angular.element("#start"+index).attr("disabled", true);

		angular.element("#stop"+index).attr("disabled", false);
		angular.element("#cancelGameBtn"+index).show();		
		angular.element("#edit"+index).show();
		angular.element("#displayStartTimePanel"+index).show();

		scope.systems[index].timeStamp=new Date();

		scope.systems[index].startTime=date;
		scope.systems[index].endTime=laterTime;

		scope.systems[index].invoiceDetails.push({'mem':scope.membersList[scope.systems[index].members-1].key, 'mins':scope.durationsList[scope.systems[index].duration-1].key, 'duration': pad2(date.getHours('HH')) + ":" + pad2(date.getMinutes('MM')) + "-" + pad2(laterTime.getHours('HH')) + ":" + pad2(laterTime.getMinutes('MM')), 'amt':scope.priceList[scope.systems[index].members-1][scope.systems[index].duration-1]} );
		scope.systems[index].status = true;
		
		for(var i=0;i<scope.systems[index].invoiceDetails.length; i++)
		{
			scope.systems[index].amount  += scope.systems[index].invoiceDetails[i].amt;	
		}
		
		localStorage.removeItem("sys")
		localStorage.setItem("sys", JSON.stringify(scope.systems));
		promise = timeout(function() {
			angular.element("#sys"+index).addClass("timeFinished");
			angular.element("#members"+index).attr("disabled", false);
			angular.element("#duration"+index).attr("disabled", false);
			angular.element("#continue"+index).show();
			angular.element("#edit"+index).hide();

			document.getElementById("play"+index).play();			
		}, 

		 (scope.systems[index].duration * 30 * 1000 * 60) 
//		1000
		);

	};
	scope.enableStart=function(index){

		if(scope.systems[index].customerName!=null && scope.systems[index].members!=null && scope.systems[index].duration!=null){
			return false;
		}
		else
		{
			return true;
		}

	};
	scope.enableEdit=function(index){
		
		if(scope.systems[index].customerName!=null && scope.systems[index].members!=null && scope.systems[index].duration!=null){
			return false;
		}
		else
		{
			return true;
		}		

	};


	scope.edit=function(index){

		scope.master[index]= angular.copy(scope.systems[index]);
		scope.systems[index].editMode=true;
		angular.element("#members"+index).attr("disabled", false);
		angular.element("#duration"+index).attr("disabled", false);
		angular.element("#edit"+index).hide();
		angular.element("#update"+index).show();
		angular.element("#cancel"+index).show();
		angular.element("#startTime"+index).show();

	};

	scope.update=function(index){
		scope.systems[index].amount=null;
		scope.systems[index].invoiceDetails[scope.systems[index].invoiceDetails.length-1].mem=scope.membersList[scope.systems[index].members-1].key;
		scope.systems[index].invoiceDetails[scope.systems[index].invoiceDetails.length-1].duration= date.getHours('HH') + ":" + date.getMinutes('MM') + "-" + laterTime.getHours('HH') + ":" + laterTime.getMinutes('MM');		
		scope.systems[index].invoiceDetails[scope.systems[index].invoiceDetails.length-1].mins=scope.durationsList[scope.systems[index].duration-1].key;
		scope.systems[index].invoiceDetails[scope.systems[index].invoiceDetails.length-1].amt=scope.priceList[scope.systems[index].members-1][scope.systems[index].duration-1];		

		for(var i=0;i<scope.systems[index].invoiceDetails.length; i++)
		{
			scope.systems[index].amount  += scope.systems[index].invoiceDetails[i].amt;	
		}


		scope.systems[index].endTime=new Date(scope.systems[index].startTime.getTime() + scope.systems[index].duration * 30 * 60 * 1000);
		scope.systems[index].invoiceDetails.push({'mem':scope.membersList[scope.systems[index].members-1].key, 'mins':scope.durationsList[scope.systems[index].duration-1].key, 'duration': scope.systems[index].startTime.getHours('HH') + ":" + scope.systems[index].startTime.getMinutes('MM') + "-" + scope.systems[index].endTime.getHours('HH') + ":" + scope.systems[index].endTime.getMinutes('MM'), 'amt':scope.priceList[scope.systems[index].members-1][scope.systems[index].duration-1]} );

		promise = timeout(function() {
			angular.element("#sys"+index).addClass("timeFinished");
			angular.element("#members"+index).attr("disabled", false);
			angular.element("#duration"+index).attr("disabled", false);
			angular.element("#continue"+index).show();
			angular.element("#edit"+index).hide();

			document.getElementById("play"+index).play();			
		}, 

		 (scope.systems[index].duration * 30 * 1000 * 60)
//		1000
		);
	
		angular.element("#members"+index).attr("disabled", true);
		angular.element("#duration"+index).attr("disabled", true);
	
		angular.element("#edit"+index).show();
		angular.element("#update"+index).hide();
		angular.element("#startTime"+index).hide();
		angular.element("#cancel"+index).hide();
	}
	scope.cancel=function(index){
		angular.copy(scope.master[index], scope.systems[index]);
		scope.systems[index].editMode=false;
		angular.element("#members"+index).attr("disabled", true);
		angular.element("#duration"+index).attr("disabled", true);
		angular.element("#edit"+index).show();
		angular.element("#update"+index).hide();
		angular.element("#cancel"+index).hide();
		angular.element("#startTime"+index).hide();
	}

	scope.continue= function(index){

		date= laterTime;
		laterTime = new Date(date.getTime() + scope.systems[index].duration * 30 * 60 * 1000);
		angular.element("#members"+index).attr("disabled", true);
		angular.element("#duration"+index).attr("disabled", true);
		angular.element("#continue"+index).attr("disabled", true);
		angular.element("#edit"+index).show();
		angular.element("#continue"+index).hide();	
		angular.element("#startTime"+index).hide();

		scope.systems[index].amount=null;

		scope.systems[index].invoiceDetails.push({'mem':scope.membersList[scope.systems[index].members-1].key, 'mins':scope.durationsList[scope.systems[index].duration-1].key, 'duration': date.getHours('HH') + ":" + date.getMinutes('MM') + "-" + laterTime.getHours('HH') + ":" + laterTime.getMinutes('MM'), 'amt':scope.priceList[scope.systems[index].members-1][scope.systems[index].duration-1]} );

		scope.systems[index].endTime=laterTime.getHours('HH') + ":" + laterTime.getMinutes('MM');
		scope.systems[index].status = true;

		for(var i=0;i<scope.systems[index].invoiceDetails.length; i++)
		{
			scope.systems[index].amount += scope.systems[index].invoiceDetails[i].amt;	
		}


		angular.element("#sys"+index).removeClass("timeFinished");

		
		document.getElementById("play"+index).pause();			

		promise = timeout(function() {
			angular.element("#sys"+index).addClass("timeFinished");
			angular.element("#members"+index).attr("disabled", false);
			angular.element("#duration"+index).attr("disabled", false);
			angular.element("#continue"+index).attr("disabled", false);
			document.getElementById("play"+index).play();			
			angular.element("#continue"+index).show();			
		}, 

		(scope.systems[index].duration * 30 * 1000 * 60)

		);

	}; 

	scope.enableContine = function(index)
	{
		if(scope.systems[index].members==null && scope.systems[index].duration==null && !angular.element("#sys"+index).hasClass('timeFinished')){
			return true;
		}
		else
		{
			return false;
		}

	}

	scope.editStartTime=function(index){
		scope.master[index]= angular.copy(scope.systems[index]);	

		angular.element("#editStartTimePanel"+index).show();		
		angular.element("#displayStartTimePanel"+index).hide();		

	}
	scope.updateStartTime=function(index){
		angular.element("#editStartTimePanel"+index).hide();		
		angular.element("#displayStartTimePanel"+index).show();		

	}
	scope.cancelStartTime=function(index){
		angular.copy(scope.master[index], scope.systems[index]);
		angular.element("#editStartTimePanel"+index).hide();		
		angular.element("#displayStartTimePanel"+index).show();		

	}

	scope.stop= function(index){

	
		angular.element("#customerName"+ index).attr("disabled", false);
		angular.element("#members"+index).attr("disabled", false);
		angular.element("#duration"+index).attr("disabled", false);
		angular.element("#start"+index).show();
		angular.element("#continue"+index).hide();
		angular.element("#edit"+index).hide();				
		angular.element("#start"+index).attr("disabled", true);
		angular.element("#startTime"+index).hide();

		document.getElementById("play"+index).pause();

		angular.element("#cancelGameBtn"+index).hide();			
		angular.element("#stop"+index).attr("disabled", true);
		angular.element("#sys"+index).removeClass("timeFinished");

		scope.systems[index].customerName= null; 
		scope.systems[index].members= null; 
		scope.systems[index].duration= null;
		scope.systems[index].invoiceDetails= [];
		scope.systems[index].startTime= null; 
		scope.systems[index].endTime= null;
		scope.systems[index].amount= [];	
		scope.systems[index].status = false;
		scope.systems[index].editMode=false;

		angular.element("#edit"+index).hide();
		angular.element("#update"+index).hide();
		angular.element("#cancel"+index).hide();
		angular.element("#editStartTimeBtn"+index).hide();


		timeout.cancel(promise);

	}; 

	scope.cancelGame=function(index){
		angular.element("#customerName"+ index).attr("disabled", false);
		angular.element("#members"+index).attr("disabled", false);
		angular.element("#duration"+index).attr("disabled", false);
		angular.element("#start"+index).show();
		angular.element("#continue"+index).hide();
		angular.element("#edit"+index).hide();	

		angular.element("#start"+index).attr("disabled", true);
		angular.element("#cancelGameBtn"+index).hide();			
		angular.element("#startTime"+index).hide();

		document.getElementById("play"+index).pause();

		angular.element("#stop"+index).attr("disabled", true);
		angular.element("#sys"+index).removeClass("timeFinished");

		scope.systems[index].customerName= null; 
		scope.systems[index].members= null; 
		scope.systems[index].duration= null;
		scope.systems[index].invoiceDetails= [];
		scope.systems[index].startTime= null; 
		scope.systems[index].endTime= null;
		scope.systems[index].amount= [];	
		scope.systems[index].status = false;
		scope.systems[index].editMode=false;

		angular.element("#edit"+index).hide();
		angular.element("#update"+index).hide();
		angular.element("#cancel"+index).hide();
		angular.element("#editStartTimeBtn"+index).hide();

		timeout.cancel(promise);		
	}

	scope.waiting={
		customer:null,
		members: null,
		duration: null

	};

	scope.enableWait=function(){
		if(scope.waiting.customer!=null && scope.waiting.members!=null && scope.waiting.duration!=null){
			return false;
		}
		else
		{
			return true;
		}

	}
	scope.wait=function(){

		scope.waitList.push({customerName: scope.waiting.customer, members: scope.waiting.members, duration: scope.waiting.duration});
		scope.waiting.customer=null;
		scope.waiting.members=null; 
		scope.waiting.duration=null;

	};
	scope.assignSystem=function(index, sysNum){
		scope.systems[sysNum].customerName=scope.waitList[index].customerName;
		scope.systems[sysNum].members=scope.waitList[index].members;
		scope.systems[sysNum].duration=scope.waitList[index].duration;		
		scope.waitList.splice(index, 1);

	};

	scope.removeWaiting=function(index)
	{
		scope.waitList.splice(index, 1);
	}

var pad2=function(number) {
   return (number < 10 ? '0' : '') + number
}

}]);
