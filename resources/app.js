$( document ).ready( function() {

	$( "#search" ).on( "click", function( event ) {
		event.preventDefault();

		var searchText = $( "#search-text").val();

		if ( searchText == "") {
			alert("Empty value");
			return;
		}

		var url = "https://en.wikipedia.org/w/api.php?action=opensearch&limit=9&format=json&search=" + searchText;

		$("#firstRow").html('');
		$("#secondRow").html('');
		$("#thirdRow").html('');

		$.ajax({
			url: url,
			dataType: 'jsonp',
			success: function( response ) {
				putContent( response );
			}
		});
	});
});

function putContent( data ) {
	var titles = data[1];
	var contents = data[2];
	var links = data[3];

	for ( var i = 0; i < titles.length; i++ ) {
		var row = "#firstRow";

		if ( i >= 3 ) { 
			row = "#secondRow";
		}

		if ( i >= 6 ) {
			row = "#thirdRow";
		}

		$( row ).append('<a href="' + links[i] + '"target="_blank">' +
						'<div class="col-md-4 ">' +
						'<div class="panel panel-default result-list">' +
						'<div class="panel-heading"' +
						'<h4>' + titles[i] + '</h4>' +
						'</div>' +
						'<div class="panel-body">' +
						'<p>' + contents[i] + '</p>' +
						'</div></div></div></a>'
						).addClass("animated fadeOut");

		$('#search-text').val('');
	}
}
