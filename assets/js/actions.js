jQuery(document).ready(function($) {
	var location = $('.location');
	/*-----------------------------------------------*/
	/*	FIND EVENT BY STATE HOME	*/
	/*-----------------------------------------------*/
	$('#form-search-uf').on('change', function() {
		$('#form-search-city option').each(function() {
			if ( $(this).val() != 0 ) {
				$(this).remove();
			}
		});
		var optionVal = $(this).val();
		if(optionVal != 0) {
			$('#form-search-city option:contains("Cidade")').text('Carregando...');
			$.ajax({  
				type: "GET",  
				url: ajaxurl, 
				dataType: "json", 
				data: {'uf': optionVal},
				success: function(data) {
					console.data
					$('#form-search-city option:contains("Carregando...")').text('Cidade');
					$.each(data, function(key, value) {
						  $("#form-search-city").append(new Option(value.name, value.id));
					});
				},
				error: function(xlx, erro, lll) {
					console.info(xlx);
					console.info(erro);
					console.info(lll);
				},
				complete: function() {}
			});
		}
	});
	$('#form-search-city').on('change', function() {
		var optionVal = $(this).val();
		if(optionVal != 0) {
			
			$.ajax({  
				type: "GET",  
				url: ajaxurl2, 
				dataType: "json", 
				data: {'city': optionVal},
				success: function(data) {
					$('.location').remove();
					$.each(data, function(key, value) {
						var newLocation = location.clone();
						newLocation.children().children('.name').html(value.nome);
						newLocation.children().children('.address-line1').html(value.rua);
						newLocation.children().children('.address-line2').html(value.cidade + " - " + value.estado);
						newLocation.children().children('.hour').html("Horário: <span>" + value.horario + "</span>");
						$( ".modal-body" ).append(newLocation);
					});
					$('#myModal').modal('show');
				},
				error: function(erro) {
					console.info(erro);
				},
				complete: function() {}
			});
		}
	});
	
	// RODA AS FUNÇÕES AO REDIMENCIONAR
	window.onresize = function(){
		var alturaTela = $(window).height();
		var larguraTela = $(window).width();
		if(larguraTela <= 992) {
			
		}
		
	};
});