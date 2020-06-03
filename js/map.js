var drawMap = function(w, h, margin) {
	var projection = d3.geoAlbersUsa()
		.translate([w/2, h/2])
		.scale([w - margin]);

	var path = d3.geoPath(projection);

	var mapSvg = d3.select("#map")
		.append("svg")
		.attr("width", w)
		.attr("height", h);

	// This order sets our boundry layer on the bottom where it belongs
	var mapBoundary = mapSvg.append("g")
		.attr("id", "boundary")

	var mapTerritory = mapSvg.append("g")
		.attr("id", "territory")

	d3.json("data/usa.json").then(function(json) {
		mapBoundary.selectAll("path")
        .data(json.features)
        .enter()
      	.append("path")
        .attr("d", path)
				.style("fill",  "none");
	});

	d3.json(map_defaults.statesFile).then(function(json) {
		mapData = topojson.feature(json, json.objects.stdin);

		mapTerritory.selectAll("path")
			.data(mapData.features)
			.enter()
			.append("path")
			.attr("d", path)
			.style("fill", "steelblue");
	});
	map_defaults['projection'] = projection;
}
