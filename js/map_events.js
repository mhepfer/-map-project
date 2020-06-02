var hideDisplayEvents = function(currentDate) {
	map_svg = d3.select("#map").select("svg")
	map_svg.selectAll("circle")
		.data(dataset)
		.style("opacity", function(d) {
			if (d.year_mo_da < currentDate) {
				return "0.75";
			} else {
				return "0.1";
			}
		})
}

var addEventDisplay = function(events) {
	events.on("click", function(d) {
		d3.select("#text")
			.html("<p>" + d.text + "</p>")
	})
}

var addToolTipHover = function(events) {
	events.on("mouseover", function(d) {
		d3.select("#tooltip")
		  .style("left", (d3.mouse(this)[0]+70) + "px")
		  .style("top", (d3.mouse(this)[1]) + "px")
		  .select("#tooltipDate")
		  .text(d.year_mo_da);

		d3.select("#tooltipPeople")
		  .text(d.people)

		d3.select("#tooltip")
			.classed("hidden", false);
	}).on("mouseout", function(d) {
		d3.select("#tooltip")
			.classed("hidden", true);
	})
}

var populate_map = function() {
	var map_svg = d3.select("#map").select("svg");
	var map_margin = map_defaults.map_margin;

	var plot = map_svg.append("g")
	    .attr("class", "plot")
	    .attr("transform", "translate(" + map_margin + "," + map_margin + ")");

	var projection = map_defaults.projection;

	events = map_svg.selectAll("circle")
		.data(dataset)
		.enter()
		.append("circle")
		.attr("class", "location")
		.attr("cx", function(d) {
			return projection([d.latitude, d.longitude])[0];
		})
		.attr("cy", function(d) {
			return projection([d.latitude, d.longitude])[1];
		})
		.attr("r", 3)
		.style("fill", "yellow")
		.style("stroke", "gray")
		.style("stroke-width", 0.25)
		.style("opacity", "0.75");

	addToolTipHover(events);
	addEventDisplay(events);
};
