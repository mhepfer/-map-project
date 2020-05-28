var drawMap = function(w, h, margin) {
	var projection = d3.geoAlbersUsa()
		.translate([w/2, h/2])
		.scale([w - margin]);

	var path = d3.geoPath(projection);

	var map_svg = d3.select("#map")
		.append("svg")
		.attr("width", w)
		.attr("height", h);

	d3.json("data/1800.json").then(function(json) {
		mapData = topojson.feature(json, json.objects.stdin);

		map_svg.selectAll("path")
			.data(mapData.features)
			.enter()
			.append("path")
			.attr("d", path)
			.style("fill", "steelblue");
	});
	map_defaults['projection'] = projection;
}
