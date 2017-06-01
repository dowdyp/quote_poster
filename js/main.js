webhook = {
	url : 'https://discordapp.com/api/webhooks/312654628074291200/Vf28ictvzk294UvQzRKFoSHVVSxjOtpcYDDf9XffKgAHc8ioy3OVDEuKDjtOBxe8rD4b'
};

auth = {
	headers: {
		Authorization : false
	}
};

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
		],
		postStatus : ''
	};


	$scope.inputValues = {
		message : '',
		name : '',
		state : '',
		town : '',
		occupation : '',
		previewShowing : '',
		postSuccess : 'Quote Posted!',
		postFail : 'Error posting.'
	};

	$scope.config = {
		channel_id : 319222002361696256,
		app_token : 'MzEyNjQzMTMyNzA3NTY5NjY1.C_eEfQ.8DVBHgDEV3BQu98HtsxwHdNFp8w',
		webhook_url : 'https://discordapp.com/api/webhooks/319222030958460929/QHd2gP-4FvVzXlnopLLnQkl4Kq7ONAHsIvHdpIHAI8IpLThj7irvRLYP7Q987qAbRidS'
	};

	auth.headers = {
		'Authorization' : 'Bot ' + $scope.config.app_token
	};

	$scope.quote = {
		content : $scope.inputValues.message
	}

	$scope.postQuote = function() {

		var req = {
			method: 'POST',
			url: $scope.config.webhook_url,
		 	headers: auth.headers,
		 	data: {
				content : $scope.inputValues.message
			}
		}

		$http(req)
		.then(function(response) {
			$scope.defaultValues.postStatus = $scope.inputValues.postSuccess;
		},
		function() {
			$scope.defaultValues.postStatus = $scope.inputValues.postFail;
			console.log('rip');
		});
	}
}]);