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
quoter.controller('appController', ['$scope', '$http', '$interval', '$timeout',
  function($scope, $http, $interval, $timeout) {

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
      headers: {
        Authorization: false,
      },
      limit: 15
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
      quotes: null,
      ids: [],
      earliest: null,
      latest: null
    };

    $scope.buffer = 30;

    $scope.getreq_config.headers.Authorization = "Bot " + $scope.config.app_token;

// <--------- END SCOPE VALUES --------->




    //Prints most active data values to trace any errors in data placement.

    debugging = function() {
      console.log($scope.quote_data.quotes);
      console.log($scope.quote_data.ids);
      console.log($scope.quote_data.latest);
      console.log($scope.quote_data.earliest);
    }




    //Sets values for first and last quote
    
    setFirstLast = function() {
      $scope.quote_data.earliest = _.last($scope.quote_data.ids);
      $scope.quote_data.latest = _.first($scope.quote_data.ids);
    }




    //Load Channel

    $scope.init = function() {

      var req = {
        get_url: $scope.config.api_root + "/channels/" + $scope.config.channel_id + "/messages?limit=" + $scope.getreq_config.limit,
        headers: $scope.getreq_config
      };

      $http.get(req.get_url, req.headers)

      .then(function(response) {
        $scope.quote_data.quotes = response.data;
        
        angular.forEach($scope.quote_data.quotes,
        
        function(value) {
          this.push(value.id);
        },

        $scope.quote_data.ids);
        setFirstLast();

        //Initialize polling

        $interval($scope.autoLoad, 5000);

      },

      function(error) {
        console.log('GET fail');
      });

    };




    //Load Post After Newest

    $scope.autoLoad = function() {

      var req = {
        url: $scope.config.api_root + /channels/ + $scope.config.channel_id + "/messages?after=" + $scope.quote_data.latest,
        headers: $scope.getreq_config
      };

      $http.get(req.url, req.headers)
    
      .then(function(response) {
    
        var values = [];
        var values = response.data.reverse();
        
        angular.forEach(values, function(value) {

          $scope.quote_data.ids.unshift(value.id);
          $scope.quote_data.quotes.unshift(value);
          setFirstLast();
        }, $scope.quote_data) 

      },
        
        function(error) {
          console.log('Autoload fail');
        })
      };




      //Load past messages

      $scope.loadPast = function() {

        var req = {
          url: $scope.config.api_root + /channels/ + $scope.config.channel_id + "/messages?before=" + $scope.quote_data.earliest + "&limit=" + $scope.getreq_config.limit,
          headers: $scope.getreq_config
        };

      $http.get(req.url, req.headers)
    
      .then(function(response) {
    
        var values = [];
        var values = response.data;
        
        angular.forEach(values, function(value) {

          $scope.quote_data.ids.push(value.id);
          $scope.quote_data.quotes.push(value);
          setFirstLast();
        }, $scope.quote_data)
      },
        
        function(error) {
          console.log('Autoload fail');
        });
      };


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
          $scope.autoLoad();
        },

        function() {
          $scope.defaultValues.postStatus = $scope.inputValues.postFail;
          console.log('rip');
        });
    };

    //Infinite Scroll

    $( 'result-container' ).scroll(function() {

      var scrollPos = $("div.result-container").scrollTop();
      var parent = $("div.result-container").height();
      var child = $("div.fullview").height();
      var scrollThreshhold = Math.abs(parent - child - $scope.buffer);

      console.log(scrollPos, parent, child, scrollThreshhold);

      if (scrollPos >= scrollThreshhold) {
        $scope.loadPast();
      };
    });

    //Initialize

    $scope.init();

}]);