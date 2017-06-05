webhook = {
  url: 'https://discordapp.com/api/webhooks/312654628074291200/Vf28ictvzk294UvQzRKFoSHVVSxjOtpcYDDf9XffKgAHc8ioy3OVDEuKDjtOBxe8rD4b'
};

auth = {
  headers: {
    Authorization: false
  }
};

var quoter = angular.module('webApp', []);

quoter.config(function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
});
quoter.controller('appController', ['$scope', '$http', '$interval',
function($scope, $http, $interval) {

  $scope.defaultValues = {
    message: '',
    name: '',
    state: '',
    town: '',
    occupation: [
      'Student',
      'Teacher',
      'Administrator',
      'Coach',
      'Parent'
    ],
    states: [
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

  $scope.auth_config = {
    headers : {
      Authorization : false
    }
  }

  $scope.inputValues = {
    message: '',
    name: '',
    state: '',
    town: '',
    occupation: '',
    previewShowing: '',
    postSuccess: 'Quote Posted!',
    postFail: 'Error posting.',
    postStatus: ''
  };

  $scope.config = {
    api_root: 'https://discordapp.com/api',
    channel_id: '319222002361696256',
    app_token: 'MTc5NjEyNzk2NjA0OTA3NTIw.DBIvuQ.adN1QX9JNQEHvTl3zYxg3PVwIhc',
    webhook_url: 'https://discordapp.com/api/webhooks/319222030958460929/QHd2gP-4FvVzXlnopLLnQkl4Kq7ONAHsIvHdpIHAI8IpLThj7irvRLYP7Q987qAbRidS'
  };

  $scope.quote_data = {
    quotes : null
  };

  $scope.quoteids = {
    last : null,
    first : null
  };

  //Load Channel

  $scope.loadQuotes = function() {

    $scope.auth_config.headers.Authorization = "Bot " + $scope.config.app_token;

    var req = {
      get_url: $scope.config.api_root + "/channels/" + $scope.config.channel_id + "/messages",
      headers: $scope.auth_config
    };

    $http.get(req.get_url, req.headers).then(function(response) {
        $scope.quote_data.quotes = response.data;
        console.log('GET success');
      },
      function(error) {
        alert('GET fail' + error.statusText)
        console.log('GET fail');
      });
  };


  //Load Post After Newest

  $scope.autoLoad = function() {

  }


  //Post to Channel

  $scope.postQuote = function() {

    var req = {
      url: $scope.config.webhook_url,
      headers: auth.headers,
      data: {
        content: "\"" + $scope.inputValues.message + "\"\n-" + $scope.inputValues.name + ", " + $scope.inputValues.occupation + "\n" + $scope.inputValues.town + ", " + $scope.inputValues.state
      }
    };

    $http.post(req.url, req.data, req.headers).then(function(response) {
        $scope.defaultValues.postStatus = $scope.inputValues.postSuccess;
      },
      function() {
        $scope.defaultValues.postStatus = $scope.inputValues.postFail;
        console.log('rip');
      });
    };

    $scope.loadQuotes();
    //Polling Interval

}]);
