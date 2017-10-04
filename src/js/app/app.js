(function(){
	'use strict'

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
				categoria = categoria_slug(1);
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