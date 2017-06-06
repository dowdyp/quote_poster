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

  $scope.quoteids = null;

  $scope.getreq_config = {
    headers : {
      Authorization : false,
    },
    limit : 15
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

  $scope.quote_ids = [];

  $scope.earliestQuote = _.last($scope.quote_ids); //Oldest quote from the array

  $scope.latestQuote = _.first($scope.quote_ids); //Newest quote from the array

  $scope.getreq_config.headers.Authorization = "Bot " + $scope.config.app_token;

  //Load Channel

  $scope.loadQuotes = function() {

    var req = {
      get_url: $scope.config.api_root + "/channels/" + $scope.config.channel_id + "/messages?limit=" + $scope.getreq_config.limit,
      headers: $scope.getreq_config
    };

    $http.get(req.get_url, req.headers).then(function(response) {
        $scope.quote_data.quotes = response.data;
        //console.log('GET success');
        angular.forEach($scope.quote_data.quotes, function(value) {
          $scope.quote_ids.push(value.id);
        }, $scope.quote_ids);
        console.log($scope.quote_data.quotes); 
        console.log($scope.quote_ids);
      },

      function(error) {
        console.log('GET fail');
      });
  };

  console.log($scope.quote_ids);

  //Load Post After Newest

  // autoLoad = function() {

  //   var req = {
  //     url: $scope.config.api_root + /channels/ + $scope.config.channel_id + "/messages?after" + $scope.latestQuote,
  //     headers: $scope.getreq_config
  //   };
  // };

  //Post to Channel

  $scope.postQuote = function() {

    var req = {
      url: $scope.config.webhook_url,
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
    $interval(autoLoad, 5000);
}]);
