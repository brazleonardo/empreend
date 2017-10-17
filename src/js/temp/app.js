(function(){
	'use strict'

	var Cl = {

		/*Função que cria as rotas de busca de imóveis*/
		getRouteSearch: function(cat, tip){
			var route = 'imoveis/';
			if(cat == 1){
				route += 'comprar/';
			}

			if(cat == 2){
				route += 'alugar/';
			}

			if(cat == 3){
				route += 'lancamentos/';
			}

			if(tip == 1){
				route += 'apartamento/'
			}

			if(tip == 2){
				route += 'casa/'
			}

			if(tip == 3){
				route += 'casa-de-condominio/'
			}

			if(tip == 4){
				route += 'sobrado/'
			}

			return route;
		},

		/*Função que exite o títlo de acordo com o resultado retornado dos imóveis*/
		resultTitle: function(rota, result, typeImov){
			var resTotal = '';

			if(rota == 'comprar'){
		   		if(result == 0){
		   			resTotal = 'Nenhum imóveis para comprar';
		   		}
		   		if(result == 1){
		   			resTotal = result + ' Imóvel para comprar';
		   		}
		   		if(result > 1){
		   			resTotal = result + ' Imóveis para comprar';
		   		}

		   	}

		   	if(rota == 'alugar'){
		   		if(result == 0){
		   			resTotal = 'Nenhum imóveis para alugar';
		   		}
		   		if(result == 1){
		   			resTotal = result + ' Imóvel para alugar';
		   		}
		   		if(result > 1){
		   			resTotal = result + ' Imóveis para alugar';
		   		}
		   	}

		   	if(rota == 'lancamentos'){
		   		if(result == 0){
		   			resTotal = 'Nenhum lançamento de imóvel novo';
		   		}
		   		if(result == 1){
		   			resTotal = result + ' Lançamento de imóvel novo';
		   		}
		   		if(result > 1){
		   			resTotal = result + ' Lançamentos de imóveis novos';
		   		}
		   	}

		   	return resTotal;
		},

		/*Método que retorna o slug de acordo com o parametro (int) */
		categorySlug: function(param){
			var result = 'comprar';
			if(param == 2) result = 'alugar';
			if(param == 3) result = 'lancamentos';

			return result;
		},

		/*Método que cria o mapa de acordo com as coordenadas passadas como parametros*/
		initMap: function(la, lg){
			var myLatLng = {lat: la, lng: lg};

			var map = new google.maps.Map(document.getElementById('map'), {
				center: myLatLng,
				scrollwheel: false,
				zoom: 15
			});

			var marker = new google.maps.Marker({
				position: myLatLng,
				map: map,
				title: 'Hello World!'
			});
		},

		/*Método que cria um cookie*/
		setCookie: function(key, value, duration, path, domain, secure){
			var today = new Date(),
			expire = new Date();

			expire.setTime(today.getTime() + 3600000*24*duration);

			var cook = key+"="+escape(value) +
				((expire) ? "; expires=" + expire.toGMTString() : "") + 
				((path) ? "; path=" + path   : "") + 
				((domain) ? "; domain=" + domain : "") + 
				((secure) ? "; secure" : ""); 

			document.cookie = cook;
		},

		/*Método que retorna o cookie de acordo com o parametro passado*/
		getCookie: function(key){
			var cookies = document.cookie,
			prefix = key + "=",
			begin = cookies.indexOf("; " + prefix);
	 
			if (begin == -1) {				 
				begin = cookies.indexOf(prefix);						 
				if (begin != 0) {
					return null;
				}				 
			} 
			else {
				begin += 2;
			}
		 
			var end = cookies.indexOf(";", begin);
			 
			if (end == -1) {
				end = cookies.length;                        
			}
		 
			return unescape(cookies.substring(begin + prefix.length, end));
		},

		/*Método que deleta o cookie de acordo com o parametro passado*/
		removeCookie: function(key){
			if (Cl.getCookie(key)) {
				document.cookie = key + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
		   }
		}

	};

	/*
	* Declara o modulo para App
	*/

	var app = angular.module('App', ['ngRoute', 'ngSanitize', 'ngResource']),
		apiURL = 'https://meuempreend.000webhostapp.com';

	app.config(['$routeProvider', '$locationProvider',  function($routeProvider, $locationProvider){
		
		$routeProvider

			.when('/', {
				templateUrl: 'app/templates/views/home.html',
				controller: 'HomeCtrl',
				className: 'home'
			})

			.when('/imoveis/:category', {
				templateUrl: 'app/templates/views/lista-imoveis.html',
				controller: 'ImoveisCtrl',
				className: 'imoveis'
			})	

			.when('/imoveis/:category/page/:numbPage', {
				templateUrl: 'app/templates/views/lista-imoveis.html',
				controller: 'ImoveisCtrl',
				className: 'imoveis'
			})

			.when('/imoveis/:category/:type', {
				templateUrl: 'app/templates/views/lista-imoveis.html',
				controller: 'ImoveisCtrl',
				className: 'imoveis'
			})	

			.when('/imoveis/:category/:type/page/:numbPage', {
				templateUrl: 'app/templates/views/lista-imoveis.html',
				controller: 'ImoveisCtrl',
				className: 'imoveis'
			})

			.when('/imoveis/:category/:type/:uf', {
				templateUrl: 'app/templates/views/lista-imoveis.html',
				controller: 'ImoveisCtrl',
				className: 'imoveis'
			})

			.when('/imoveis/:category/:type/:uf/page/:numbPage', {
				templateUrl: 'app/templates/views/lista-imoveis.html',
				controller: 'ImoveisCtrl',
				className: 'imoveis'
			})

			.when('/imoveis/:category/:type/:uf/:city', {
				templateUrl: 'app/templates/views/lista-imoveis.html',
				controller: 'ImoveisCtrl',
			})

			.when('/imoveis/:category/:type/:uf/:city/page/:numbPage', {
				templateUrl: 'app/templates/views/lista-imoveis.html',
				controller: 'ImoveisCtrl',
			})

			.when('/imoveis/:category/:type/:uf/:city/:district', {
				templateUrl: 'app/templates/views/lista-imoveis.html',
				controller: 'ImoveisCtrl',
				className: 'imoveis'
			})

			.when('/imoveis/:category/:type/:uf/:city/:district/page/:numbPage', {
				templateUrl: 'app/templates/views/lista-imoveis.html',
				controller: 'ImoveisCtrl',
				className: 'imoveis'
			})

			.when('/imovel/:slug', {
				templateUrl: 'app/templates/views/imovel.html',
				controller: 'ImovelCtrl',
				className: 'imovel',
				routeName: 'slug',
				css: [
					'/dist/css/libs/owl.carousel.min.css'
				],
				js: [
					'https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js',
					'https://maps.googleapis.com/maps/api/js?key=AIzaSyCnTbp7Okfk-O8xkygex9gegjisIurICs0',
					'/dist/js/libs/owl.carousel.min.js'
				] 
			})	

			.otherwise ({ 
				templateUrl: 'app/templates/views/404.html' 
			});


		$locationProvider.html5Mode(true).hashPrefix('!');

	}]);

	var loadCSS = function(file, name){
		var link = document.createElement("link");
		link.setAttribute('data-name', name);
		link.rel = 'stylesheet';
        link.href = file;

        var s1 = document.querySelectorAll('[rel="stylesheet"]')[1];
        s1.parentNode.insertBefore(link, s1.previousSibling);
	};

	var loadScript = function(file, name){
		var script = document.createElement("script");
		script.setAttribute('data-name', name);
        script.src = file;

        //document.body.appendChild(script);

        //var s = document.getElementsByTagName('script')[0];
        var s = document.querySelectorAll('[type="text/javascript"]')[1];
        s.parentNode.insertBefore(script, s.previousSibling);
	};


	/*
	* Configure rootScope para title
	*/

	app.run(['$rootScope', '$document', function($rootScope, $document) {

		$rootScope.$on('$routeChangeStart', function(e, next, current){

			/*if(current && current.$$route && current.$$route.css) {
				var cs = angular.element($document[0].querySelectorAll('link[data-name'));
				cs.remove();
			}
			if(next && next.$$route && next.$$route.css){
				next.$$route.css.forEach(function(css, index){
					loadCSS(css, next.$$route.routeName);
				});

			}

			if(current && current.$$route && current.$$route.js){
				var sc = angular.element($document[0].querySelectorAll('script[data-name'));
				sc.remove();
			}
			if(next && next.$$route && next.$$route.js){
				next.$$route.js.forEach(function(script, index){
					loadScript(script, next.$$route.routeName);
				});

			}*/

			$rootScope.title = 'Conectando...';
			$rootScope.loaded = true;

		});


	    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {  

	        var rota = current.params.category,
	        	categoria = rota;

			if(current.$$route.className == 'home'){
				categoria = Cl.categorySlug(1);
			}

			if(current.$$route.className == 'imovel'){
				var cat = current.params.slug,
					pos = cat.indexOf('+');

				categoria = 'imovel ' + cat.substring(0, pos);
			} 

			$rootScope.bodyClass = current.$$route.className + " " + categoria;
	        $rootScope.currentRoute = current.$$route.className;
	        $rootScope.currentCat = rota;

	    });
	}]);
/*
** Controller da págia home
*/
app.controller('HomeCtrl', ['$scope', 'apiConnect', '$location', '$routeParams', '$rootScope', '$timeout', function($scope, apiConnect, $location, $routeParams, $rootScope, $timeout){

	$scope.opcaoCategoria = '1';
	$scope.opcaoTipo = '1';
	$scope.buscar = "";

	$rootScope.loaded = false;
	$rootScope.title = 'Seu Imóvel novo pode está aqui.';

	$scope.getChangeValue = function($param){
		$rootScope.bodyCl = 'home ' + Cl.categorySlug($param);
	}
	
	//$scope função submit da busca de imóveis
	$scope.searchImovel = function(){
		var cat = this.opcaoCategoria,
			tip = this.opcaoTipo;

		var routeForm = Cl.getRouteSearch(cat, tip);

		$location.path(routeForm);
	}

	//$scope função que exite uma barra com dicas. informações no formulário
	$scope.help = function(state){
		if(state == false){
			$timeout(function(){
				$scope.completing = false;
				$scope.sugest = false;
			}, 200);
		}
		if(state == true && this.buscar == ""){
			$scope.sugest = true;
		}
		if(state == true && this.buscar != "") {
			$scope.completing = true;
		}
		console.log("buscar: "+this.buscar);
	}

	//$scope função que exite o resultado da busca
	$scope.search = function(buscar){

		if(buscar == ""){
			$scope.bairros = "";
			$scope.cidades = "";
			$scope.completing = false;
			$scope.sugest = true;
		}
		else {	

			$scope.urlPath = Cl.getRouteSearch(this.opcaoCategoria, this.opcaoTipo);

			var cate = this.opcaoCategoria,
				type = this.opcaoTipo,
				params = buscar + '&cat=' + cate + '&type=' + type;

			apiConnect.getLocalizacao('localizacao', params)
				.then(function (response) {									

					if(response.data != "null"){

						$scope.sugest = false;
						$scope.completing = true;

						$scope.bairros = response.data.bairros;
						$scope.cidades = response.data.cidades;
						$scope.resultZero = false;
					}
					else {
						$scope.bairros = "";
						$scope.cidades = "";
						$scope.resultZero = true;
						$scope.completing = true;
					}
					

				}, function (error) {
				    console.error(error);
				});		

		}
	}

	var $cookie = JSON.parse(Cl.getCookie("locations"));

	if($cookie) {
		var $cookieUf = $cookie.uf,
			$cookieCity = $cookie.city;

		$scope.localizacao = " em " + $cookie.local;
	}
	if(!$cookie) {
		var $cookieUf = "",
			$cookieCity = "";
	}


	var $localCat = 3, $localType = 1, $localUF = $cookieUf, $localCity = $cookieCity,
		params = $localCat +'&type=' + $localType + '&uf=' + $localUF + '&city=' + $localCity;

	

	//Buaca os imoveis Lançamentos
	apiConnect.getCustomHome('home', params)
	  .then(function (response) {

	    $scope.lancamentosImoveis = response.data.imovel;

	    $(function(){
			$('.owl-carousel').owlCarousel({
				loop: true,
				margin: 10,
				items: 1,
				autoplay: true,
			    autoplayTimeout: 5000,
			    autoplayHoverPause: true,
			    nav: true
			});
		});

	  }, function (error) {
	    console.error(error);
	  });


	$localCat = 1;
	$localType = null;
	params = $localCat +'&type=' + $localType + '&uf=' + $localUF + '&city=' + $localCity;

	//Buaca os imoveis Lançamentos
	apiConnect.getCustomHome('home', params)
	  .then(function (response) {

	    $scope.sugestoesImoveis = response.data.imovel;

	    $(function(){
			$('.owl-carousel').owlCarousel({
				loop: true,
				margin: 10,
				items: 1,
				autoplay: true,
			    autoplayTimeout: 5000,
			    autoplayHoverPause: true,
			    nav: true
			});
		});

	  }, function (error) {
	    console.error(error);
	  });

}]);

/*
** Controller de listagem de imóveis 
*/
app.controller('ImoveisCtrl', [
	'$scope', 'apiConnect', '$location', '$routeParams', '$rootScope', function($scope, apiConnect, $location, $routeParams, $rootScope){
		
		$scope.allImoveis = '';
		$scope.category = $routeParams.category;
		$scope.type = $routeParams.type;

		console.log($routeParams);

		var rotaDefult = 'imoveis/';
		rotaDefult += ($routeParams.category != null) ? $routeParams.category : '';
		rotaDefult += ($routeParams.type != null) ?  "/" + $routeParams.type : '';
		rotaDefult += ($routeParams.uf != null) ? "/" + $routeParams.uf : '';
		rotaDefult += ($routeParams.city != null) ? "/" + $routeParams.city : '';
		rotaDefult += ($routeParams.district != null) ? "/" +  $routeParams.district : '';

		$scope.rotaDefultPage = rotaDefult;


		var arrCat = {
			'comprar': 1,
			'alugar': 2,
			'lancamentos': 3
		}

		var arrType = {
			'apartamento': 1,
			'casa': 2,
			'casa-de-condominio': 3,
			'sobrado': 4
		}

		var pageNum = ($routeParams.numbPage != null) ? $routeParams.numbPage : 1,
			$type = ($routeParams.type != null) ? arrType[$routeParams.type] : null,
			$uf = ($routeParams.uf != null) ? $routeParams.uf : null,
			$city = ($routeParams.city != null) ? $routeParams.city : null,
			$district = ($routeParams.district != null) ? $routeParams.district : null,
			params = 
				arrCat[$routeParams.category] 
				+ '&type=' + $type + '&uf=' + $uf + '&city=' + $city + '&district=' + $district;



		//Buaca os imoveis
		apiConnect.getImoveis('imoveis', pageNum, params)
		  .then(function (response) {

		  	$scope.currentPage = response.data.currentPage;

		  	var current = parseInt(response.data.currentPage);

		  	$rootScope.loaded = false;
		  	$rootScope.title = response.data.head.title;
		  	$scope.isPage = response.data.length > 1 ? response.data.length : 1;

		  	/*Funções referente a paginação*/
		    $scope.page = function(){
		    	var start = 0,
		    		end = 7,
		    		pages = [],
		    		totalPages = response.data.totalPages;

		    	for(var i = 1; i <= totalPages; i++){	
		    		if(i == 1){
		    			pages.push({'link': rotaDefult, 'num': i, 'Cl':  i == current ? 'active' : ''});
		    		}
		    		if(i > 1){
		    			pages.push({'link': rotaDefult + '/page/' + i, 'num': i, 'Cl':  i == current ? 'active' : ''});		    		
		    		}    		
			   	}

			   	if(totalPages > 7) {
		    		if(current > 3 && current < (pages.length - 3)){
						start = (current - 4);
						end = (current + 3);
					}

					if(current >= (pages.length - 3) && totalPages > 3){
						start = (pages.length - 7);
					 	end = pages.length;
					}
		    	}

		    	return pages.slice(start, end);
		    }

		    $scope.prev = function(){
		    	var num = null;
		    	if(current > 1){
		    		num =  ( (parseInt(current) - 1) == 1 ) ? '' : '/page/' + (parseInt(current) - 1);
		    	}

		    	return num;
		    }

		    $scope.next = function(){
		    	var num = '/page/' + response.data.totalPages;
		    	var lastPage = response.data.totalPages;
		    	if(current < lastPage){
		    		num = '/page/' + (parseInt(current) + 1);
		    	}

		    	return num;
		    }
		    /*Fim das funções referente a paginação*/

		    $scope.resultTotal = Cl.resultTitle($routeParams.category, response.data.retults, $routeParams.type);

		    $scope.breadcumbs = response.data.breadcumbs;
		    $scope.allImoveis = response.data.imovel;

		    $(function(){
				$('.owl-carousel').owlCarousel({
					loop: true,
					margin: 10,
					items: 1,
					autoplay: false,
				    autoplayTimeout: 0,
				    nav: true
				});
			});

		    if($uf != null && $uf != "" && $city != null && $city != ""){
		    	var $localJson = {"uf": $uf, "city": $city, "local": $scope.breadcumbs[4].label + " - " + $scope.breadcumbs[3].label };
		   		Cl.setCookie("locations", JSON.stringify($localJson), 7, "/");
		    }

		  }, function (error) {
		    console.error(error);
		  });

		
		//Scope função submit da busca de imóveis
		$scope.searchImovel = function(){
			var cat = this.opcaoCategoria,
				tip = this.opcaoTipo,
				bus = this.buscar;

			var routeForm = Cl.getRouteSearch(cat, tip);

			$location.path(routeForm);
		}
		
	}
]);


/*
** Controller do imóvel
*/
app.controller('ImovelCtrl', [
	'$scope', 'apiConnect', '$location', '$routeParams', '$rootScope', '$window', '$timeout', function($scope, apiConnect, $location, $routeParams, $rootScope, $window, $timeout){
		
		var pageSug =  $routeParams.slug;

		
		//Buaca os imoveis
		apiConnect.getImovel('imovel', encodeURIComponent(pageSug))
		  .then(function (response) {			

		  	$rootScope.loaded = false;		
		  	$rootScope.currentCat = Cl.categorySlug(response.data['imovel'].categoria);

		  	$scope.isPage = response.data.length > 1 ? response.data.length : 1;

		  	$rootScope.title = response.data.head.title;
		  	$scope.breadcumbs = response.data.breadcumbs;
		    $scope.imovel = response.data['imovel'];
		    $scope.relation = response.data.relacionados;

		    $(function(){
				$('.gallery-main .owl-carousel').owlCarousel({
					loop: true,
					margin: 10,
					items: 1,
					autoplay: true,
				    autoplayTimeout: 3000,
				    autoplayHoverPause: true,
				    nav: true
				});

				$('#relation .gallery .owl-carousel').owlCarousel({
					loop: true,
					margin: 10,
					items: 1,
					autoplay: false,
				    autoplayTimeout: 0,
				    nav: true
				});
			});


		    var $localJson = {
		    		"uf": $scope.imovel['slug_uf'][0], 
		    		"city": $scope.imovel['slug_city'][0], 
		    		"local": $scope.breadcumbs[4].label + " - " + $scope.breadcumbs[3].label
		    	};

		   	Cl.setCookie("locations", JSON.stringify($localJson), 7, "/");

		    $scope.googleMap = true;

		    if( response.data['imovel'].address_lat == "" && response.data['imovel'].address_lng == "" ){
		    	$scope.googleMap = false;
		    }

		    var la = parseFloat(response.data['imovel'].address_lat),
		    	lg = parseFloat(response.data['imovel'].address_lng);

		    $timeout(function(){							
			    Cl.initMap(la, lg);		    
			}, 500);


		  }, function (error) {
		    console.error(error);
		  });
		
	}
]);

  app.factory('apiConnect', ['$q', '$http', function ($q, $http) {
    return {
      getCustomHome: function (info, params) {

        if(params == 'undefined'){
          params = null;
        }

        var deferred = $q.defer(),
            httpPromise = $http.get(apiURL+'/service/?info='+info+'&cat='+params+'&token=8c54dbf7be1b415eeecff30f9f2288c7');

        httpPromise.then(function (response) {
          deferred.resolve(response);
        }, function (error) {
          console.error(error);
        });

        return deferred.promise;
      },
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