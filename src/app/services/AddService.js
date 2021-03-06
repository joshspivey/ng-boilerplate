angular.module('services.AddService', [])
    .factory('AddService', function AddService($http, $q) {
        return {
            addNew: function(sendData) {
                var deferred = $q.defer();

                $http({
                    method: 'GET',
                    url: 'http://api.cashcreators.honeycombits.com/stores/',
                    data: sendData
                }).
                success(function(data, status, headers, config) {
                    deferred.resolve(data);
                }).
                error(function(data, status, headers, config) {
                    deferred.reject(status);
                });

                return deferred.promise;
            }
        };
});
