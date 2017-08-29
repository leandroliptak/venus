function formatDate(date) {
	var monthNames = [
		"Enero", "Febrero", "Marzo",
		"Abril", "Mayo", "Junio", "Julio",
		"Agosto", "Septiembre", "Octubre",
		"Noviembre", "Diciembre"
	];

	var day = date.getDate();
	var monthIndex = date.getMonth();
	var year = date.getFullYear();

	return day + ' de ' + monthNames[monthIndex];
}

// Cargar eventos
$.ajax(
	{
	 url: "https://graph.facebook.com/v2.10/858237270948057/events?access_token=479920608871249|3lRkuaNjJhlOR30l0nfYUhaCWOA",
	 type: "GET"
	}).done(

	function (events) { 
		for (var number in events["data"]) {
			var event = events["data"][number];
			var link = "http://facebook.com/events/" + event["id"];
			var place = event["place"]
			var place_name = place["name"]
			if ("location" in place) {
				place_name = place_name + " (" + place["location"]["street"] + ", " + 
					place["location"]["city"] + ")";
			}

			var start_date = new Date(event["start_time"]);

			var html = "<p>\
					<p style='font-size: 120%'><span class='icon fa-calendar'/> <a target='_blank' href='"
					+ link + "'>" + event["name"] + "</a></p>" +
					"<p style='margin-left: 5%'>Fecha: " + formatDate(start_date) +
					"<br>Lugar: " + place_name + "</p>";

			if (start_date > Date.now())
				$("#event-list").append(html);
			else
				$("#event-list-past").append(html);
		}
	}
);

// Cargar los astros de ahora
$.ajax(
{
	url: "http://cursodeastrologia.com.ar:8080/astrolog/now",
	type: "GET"
}).done(
	function (text) {
		$("#planets").append("<span style='font-family: Astrology;'>" + text + "</span>");
	}
);

// Cargar tránsitos del día
$.ajax(
{
	url: "http://cursodeastrologia:8080/astrolog/transits",
	type: "GET"
}).done(
	function (text) {
		$("#transits").append(text);
	}
);