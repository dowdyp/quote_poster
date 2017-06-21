var scroll = angular.module('scroller', [])

scroll.controller('scrollCrtl', ['$scope', function($scope) {

	$scope.items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

	//Adds 10 new numbers in sequential order so you will never run out of numbers, thus capable of scrolling infinitely.

	$scope.addNumbers = function() {

		for(var i=0; i < 10; i++){
			
			var last = _.last($scope.items);

			var next = last + 1;

			$scope.items.push(next);

			//console.log(_.last($scope.items));
		}

		console.log(_.last($scope.items));

	}

	$( "div.scrollbox" ).scroll(function() {

        var scrollPos = $("div.scrollbox").scrollTop();
        var parent = $("div.scrollbox").height();
        var child = $("div.fullview").height();
        var scrollThreshhold = Math.abs(parent - child);

        console.log(scrollPos, parent, child, scrollThreshhold);

        if (scrollPos >= scrollThreshhold) {

        	$scope.addNumbers();

        	console.log("I should be doing something but im not");

			//console.log(_.last($scope.items));
		};

	});

}]);