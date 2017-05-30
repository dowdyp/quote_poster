webhook = {
	url : 'https://discordapp.com/api/webhooks/312654628074291200/Vf28ictvzk294UvQzRKFoSHVVSxjOtpcYDDf9XffKgAHc8ioy3OVDEuKDjtOBxe8rD4b'
}

var quoter = angular.module('webApp', []);

quoter.config(function($httpProvider) {
$httpProvider.defaults.useXDomain = true;
});
quoter.controller('appController', ['$scope', '$http', 
	function($scope, $http) {

	$scope.defaultValues = {
		message : '',
		name : '',
		state : '',
		town : '',
		occupation : [
			'Student', 
			'Teacher', 
			'Administrator', 
			'Coach', 
			'Parent'
		],
		states : [
			'AK',
			'AL',
			'AR',
			'AZ',
			'CA',
			'CO',
			'CT',
			'DC',
			'DE',
			'FL',
			'GA',
			'GU',
			'HI',
			'IA',
			'ID',
			'IL',
			'IN',
			'KS',
			'KY',
			'LA',
			'MA',
			'MD',
			'ME',
			'MH',
			'MI',
			'MN',
			'MO',
			'MS',
			'MT',
			'NC',
			'ND',
			'NE',
			'NH',
			'NJ',
			'NM',
			'NV',
			'NY',
			'OH',
			'OK',
			'OR',
			'PA',
			'PR',
			'PW',
			'RI',
			'SC',
			'SD',
			'TN',
			'TX',
			'UT',
			'VA',
			'VI',
			'VT',
			'WA',
			'WI',
			'WV',
			'WY',
		]
	};


	$scope.inputValues = {
		message : '',
		name : '',
		state : '',
		town : '',
		occupation : '',
		previewShowing : ''
	};

	$scope.quoteValue = {
		content : ''
	}

	// $scope.postQuote = function() {
	// 	$http.post
	// }
}]);