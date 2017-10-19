/*
** Controller da págia home
*/
app.controller('HomeCtrl', ['$scope', 'apiConnect', '$location', '$routeParams', '$rootScope', '$timeout', function($scope, apiConnect, $location, $routeParams, $rootScope, $timeout){

	$scope.opcaoCategoria = '1';
	$scope.opcaoTipo = '1';
	$scope.buscar = "";

	$rootScope.title = 'Seu Imóvel novo pode está aqui.';

	$scope.getChangeValue = function($param){
		$rootScope.bodyClass = 'home ' + Cl.categorySlug($param);
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
	    $scope.isPage = response.data.length > 1 ? response.data.length : 1;
	    $rootScope.loaded = false;

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
	    $scope.isPage = response.data.length > 1 ? response.data.length : 1;
	    $rootScope.loaded = false;

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
		    			pages.push({'link': rotaDefult, 'num': i, 'class':  i == current ? 'active' : ''});
		    		}
		    		if(i > 1){
		    			pages.push({'link': rotaDefult + '/page/' + i, 'num': i, 'class':  i == current ? 'active' : ''});		    		
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