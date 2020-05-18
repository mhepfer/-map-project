
var addEventDisplay = function(events) {
	events.on("click", function(d) {
		d3.select("#text")
			.html("<p>" + d.text + "</p>")
	})
}


var addToolTipHover = function(events) {
	events.on("mouseover", function(d){
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


// var add_tooltip = function(plot) {
// 	var locations = plot.selectAll(".location")
// 	// Add the highlighting by person functionality
//     nodes.on('mouseover', function (legend_d) {
//         // Highlight the nodes: every node is green except of him
//         nodes.style('fill', "#B8B8B8")
//         d3.select(this).style('fill', '#69b3b2')
//         // Highlight the connections
//         locations
//           .style('fill', function (location_d) { 
//           	if (JSON.parse(location_d['people']).includes(legend_d)) {
//           		return "yellow";
//           	} else {
//           		return "gray";
//           	}
//       	})
//       }).on('mouseout', function (legend_d) {
//         locations.style('fill', "yellow");
//       })
// }

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

	 //    .on("click", displayEntry)
		// .transition();
};



function plotPoints(data) {


  // if filtered dataset has less circles than already existing, remove excess
  // locations.exit()
  //   .remove();
}