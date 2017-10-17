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
