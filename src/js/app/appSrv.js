
  app.factory('apiConnect', ['$q', '$http', function ($q, $http) {
    return {
      getImoveis: function (info, pageNum, params) {

        if(params == 'undefined'){
          params = null;
        }

        var deferred = $q.defer(),
            httpPromise = $http.get(apiURL+'/service/?info='+info+'&pag='+pageNum+'&cat='+params+'&token=8c54dbf7be1b415eeecff30f9f2288c7');

        httpPromise.then(function (response) {
          deferred.resolve(response);
        }, function (error) {
          console.error(error);
        });

        return deferred.promise;
      },
      getImovel: function (info, pageSlug) {
        var deferred = $q.defer(),
            httpPromise = $http.get(apiURL+'/service/?info='+info+'&slug='+pageSlug+'&token=8c54dbf7be1b415eeecff30f9f2288c7');

        httpPromise.then(function (response) {
          deferred.resolve(response);
        }, function (error) {
          console.error(error);
        });

        return deferred.promise;
      },
      getLocalizacao: function(info, params){
        var deferred = $q.defer(),
            httpPromise = $http.get(apiURL+'/service/?info='+info+'&param='+params+'&token=8c54dbf7be1b415eeecff30f9f2288c7');

        httpPromise.then(function (response) {
          deferred.resolve(response);
        }, function (error) {
          console.error(error);
        });

        return deferred.promise;
      }
    };
  }]);

}());