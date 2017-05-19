'use strict';


// Zlogs controller
angular.module('zlogs').controller('ZlogController', ['$scope', '$stateParams','UrlService', '$location','Authentication', 'Zlogs',
	function($scope, $stateParams,UrlService, $location,Authentication, Zlogs) {
		$scope.authentication = Authentication;
//----------------------------------------------------------------
 
/*$scope.myDate = new Date();
 $scope.minDate = new Date(
      $scope.myDate.getFullYear(),
      $scope.myDate.getMonth() - 2,
      $scope.myDate.getDate());
  $scope.maxDate = new Date(
      $scope.myDate.getFullYear(),
      $scope.myDate.getMonth() + 2,
      $scope.myDate.getDate());
  $scope.onlyWeekendsPredicate = function(date) {
    var day = date.getDay();
    return day === 0 || day === 6;
  };
 $scope.open1 = function() {
    $scope.data.isOpen=true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.fromDate = new Date(year, month, day);
  };

  $scope.setDate = function(year, month, day) {
    $scope.toDate = new Date(year, month, day);
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];
*/

// var that = this;

    $scope.isOpen = false;

    $scope.openCalendar = function(e) {
        e.preventDefault();
        e.stopPropagation();

        $scope.isOpen = true;
    };
//-------------------------------------------------------------------
		// Create new Article
		$scope.create = function() {
			// Create new Article object
			var zlog = new Zlogs({
				title: this.title,
				content: this.content
			});

			// Redirect after save
			zlog.$save(function(response) {
				$location.path('zlogs/' + response._id);

				// Clear form fields
				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Article
		$scope.remove = function(zlog) {
			if (zlog) {
				zlog.$remove();

				for (var i in $scope.zlogs) {
					if ($scope.zlogs[i] === zlog) {
						$scope.zlogs.splice(i, 1);
					}
				}
			} else {
				$scope.zlog.$remove(function() {
					$location.path('zlogs');
				});
			}
		};

		// Update existing Article
		$scope.update = function() {
			var zlog = $scope.zlog;

			zlog.$update(function() {
				$location.path('zlogs/' + zlog._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Zlogs
		$scope.find = function() {
			$scope.zlogs = Zlogs.query();
		};
//search Function
		$scope.search = function() {

			var imei = UrlService.getQueryStringVar('imei');
			var meid = UrlService.getQueryStringVar('meid');
			var l_itemid = UrlService.getQueryStringVar('itemid');
			var l_fromDate =  unescape(UrlService.getQueryStringVar('fromDate'));
			var l_toDate =  unescape(UrlService.getQueryStringVar('toDate'));

			var query ={};
			//query.erase_imei = imei;
			$scope.zlogs = Zlogs.query({erase_imei:imei,erase_meid:meid,itemid:l_itemid,fromDate:l_fromDate,toDate:l_toDate});
			//$location.path('/search/').search({imei: 'value'});
			//console.log($scope.zlogs);
			
			
		};

		// Find existing Article
		$scope.findOne = function() {
			$scope.zlog = Zlogs.get({
				articleId: $stateParams.articleId
			});
		};
	}
]);