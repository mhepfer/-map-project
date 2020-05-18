var addPeopleHighlight = function(nodes) {
	var events = d3.selectAll(".location")
	// Add the highlighting by person functionality
    nodes.on('mouseover', function (legend_d) {
        // Highlight the nodes: every node is green except of him
        nodes.style('fill', "#B8B8B8")
        d3.select(this).style('fill', '#69b3b2')
        // Highlight the connections
        events
          .style('fill', function (location_d) { 
          	if (location_d['people'].includes(legend_d)) {
          		return "yellow";
          	} else {
          		return "gray";
          	}
      	})
      }).on('mouseout', function (legend_d) {
        events.style('fill', "yellow");
      })
}

var addPeopleLegend = function() {
	var peopleLegend = d3.select("#people")
		.append("svg")
		.attr("width", 200)
		.attr("height", 500); // update to change heights based on # of people


	var dup_people = dataset.map(function (el) { return el.people; });
	dup_people = dup_people.flat();
	var people = Array.from(new Set(dup_people));

	peopleLegend.selectAll("peopledots")
	  .data(people)
	  .enter()
	  .append("circle")
	    .attr("cx", 10)
	    .attr("cy", function(d,i){ return 10 + i*25}) // 10 is where the first dot appears. 25 is the distance between dots
	    .attr("r", 7)
	    .style("fill", "green")

	// Add one dot in the legend for each name.
	var nodes = peopleLegend.selectAll("peoplelabels")
	  .data(people)
	  .enter()
	  .append("text")
	    .attr("x", 20)
	    .attr("y", function(d,i){ return 15 + i*25}) // 10 is where the first dot appears. 25 is the distance between dots
	    .style("fill", "green")
	    .text(function(d){ return d})
	    .attr("text-anchor", "left")
	    .style("alignment-baseline", "middle")

	addPeopleHighlight(nodes);
}

