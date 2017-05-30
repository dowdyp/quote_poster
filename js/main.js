var selector = angular.module('webApp', []);

selector.controller('appController', ['$scope', 
	function($scope) {

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
		'WY'
		]
	};


	$scope.inputValues = {
		message : '',
		name : '',
		state : '',
		town : '',
		occupation : ''
	};

}]);