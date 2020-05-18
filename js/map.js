var drawMap = function(w, h, margin) {
	var projection = d3.geoAlbersUsa()
		.translate([w/2, h/2])
		.scale([w - margin]);

	var path = d3.geoPath(projection);

	var map_svg = d3.select("#map")
		.append("svg")
		.attr("width", w)
		.attr("height", h);

	d3.json("data/us-states.json").then(function(json) {
		map_svg.selectAll("path")
			.data(json.features)
			.enter()
			.append("path")
			.attr("d", path)
			.style("fill", "steelblue");;
	});
	map_defaults['projection'] = projection;
}