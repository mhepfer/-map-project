//tranferred

// var projection = d3.geoAlbersUsa()
// 	.translate([w/2, (h/2 + h/12)])
// 	.scale([w - margin]);

// var path = d3.geoPath(projection);

// var svg = d3.select("#dataviz")
// 	.append("svg")
// 	.attr("width", w)
// 	.attr("height", h);

// d3.json("data/us-states.json").then(function(json) {
// 	svg.selectAll("path")
// 		.data(json.features)
// 		.enter()
// 		.append("path")
// 		.attr("d", path)
// 		.style("fill", "steelblue");;
// });

//to here

// var peopleLegend = d3.select("#people")
// 	.append("svg")
// 	.attr("width", 200)
// 	.attr("height", 500); // update to change heights based on # of people


d3.csv("data/clean-lewis-and-clark-data.csv").then(function(data) {
	var dataset = dataStore.data;
	var points = [];
	for (index = 0; index < dataset.length; index++) {
		points.push([
			dataset[index].latitude, 
			dataset[index].longitude
		]);
	}

	// add people legend

	// var dup_people = dataset.map(function (el) { return el.people; });
	// dup_people = dup_people.flat();
	// var people = Array.from(new Set(dup_people));

	// peopleLegend.selectAll("peopledots")
	//   .data(people)
	//   .enter()
	//   .append("circle")
	//     .attr("cx", 10)
	//     .attr("cy", function(d,i){ return 10 + i*25}) // 10 is where the first dot appears. 25 is the distance between dots
	//     .attr("r", 7)
	//     .style("fill", "green")

	// // Add one dot in the legend for each name.
	// var nodes = peopleLegend.selectAll("peoplelabels")
	//   .data(people)
	//   .enter()
	//   .append("text")
	//     .attr("x", 20)
	//     .attr("y", function(d,i){ return 15 + i*25}) // 10 is where the first dot appears. 25 is the distance between dots
	//     .style("fill", "green")
	//     .text(function(d){ return d})
	//     .attr("text-anchor", "left")
	//     .style("alignment-baseline", "middle")


	// var parseTime = d3.timeParse("%Y-%m-%d");
	// var formatDate = d3.timeFormat("%b %Y");

	// var startDate = d3.min(dataset, function(d) { return d.year_mo_da; })
	// var endDate = d3.max(dataset, function(d) { return d.year_mo_da; })

	
	// slider
	var x = d3.scaleTime()
	    .domain([
	    	startDate, 
	    	endDate
	    ])
	    .range([margin, w - margin]);

	var moving = false;
	var currentValue = 0;
	var targetValue = w - margin;
	// var playButton = d3.select("#play-button");

	// var x = d3.scaleTime()
	//     .domain([startDate, endDate])
	//     .range([0, targetValue])
	//     .clamp(true);

	// var slider = svg.append("g")
	//     .attr("class", "slider")
	//     .attr("transform", "translate(" + margin + "," + h/12 + ")");

	// slider.append("line")
	//     .attr("class", "track")
	//     .attr("x1", x.range()[0] + margin)
	//     .attr("x2", x.range()[1] - margin)
	//   .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
	//     .attr("class", "track-inset")
	//   .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
	//     .attr("class", "track-overlay")
	//     .call(d3.drag()
	//         .on("start.interrupt", function() { slider.interrupt(); })
	//         .on("start drag", function() {
	//           currentValue = d3.event.x;
	//           update(x.invert(currentValue)); 
	//         })
	//     );

	//  // ticks are placed on the overlay
	//  slider.insert("g", ".track-overlay")
	//     .attr("class", "ticks")
	//     .attr("transform", "translate(" + margin + "," + 18 + ")")
	//   .selectAll("text")
	//     .data(x.ticks(10))
	//     .enter()
	//     .append("text")
	//     .attr("x", x)
	//     .attr("y", 10)
	//     .attr("text-anchor", "middle")
	//     .text(function(d) { return formatDate(d); });


	// var handle = slider.insert("circle", ".track-overlay")
	//     .attr("class", "handle")
	//     .attr("transform", "translate(" + margin + ",0)")
	//     .attr("r", 9);

	// var label = slider.append("text")  
	//     .attr("class", "label")
	//     .attr("text-anchor", "middle")
	//     .text(formatDate(startDate))
	//     .attr("transform", "translate(" + 30 + "," + (-25) + ")")


	// plot'dem points

	var plot = svg.append("g")
	    .attr("class", "plot")
	    .attr("transform", "translate(" + margin + "," + margin + ")");


	plotPoints(data);

	var locations = plot.selectAll(".location")
	// Add the highlighting by person functionality
    nodes.on('mouseover', function (legend_d) {
        // Highlight the nodes: every node is green except of him
        nodes.style('fill', "#B8B8B8")
        d3.select(this).style('fill', '#69b3b2')
        // Highlight the connections
        locations
          .style('fill', function (location_d) { 
          	if (JSON.parse(location_d['people']).includes(legend_d)) {
          		return "yellow";
          	} else {
          		return "gray";
          	}
      	})
      }).on('mouseout', function (legend_d) {
        locations.style('fill', "yellow");
      })

	// playButton
	//     .on("click", function() {
	// 	    var button = d3.select(this);
	// 	    if (button.text() == "Pause") {
	// 	      moving = false;
	// 	      clearInterval(timer);
	// 	      // timer = 0;
	// 	      button.text("Play");
	// 	    } else {
	// 	      moving = true;
	// 	      timer = setInterval(step, 100);
	// 	      button.text("Pause");
	// 	    }
	// 	    console.log("Slider moving: " + moving);
	//   })


	// function step() {
	//   update(x.invert(currentValue));
	//   currentValue = currentValue + (targetValue/151);
	//   if (currentValue > targetValue) {
	//     moving = false;
	//     currentValue = 0;
	//     clearInterval(timer);
	//     // timer = 0;
	//     playButton.text("Play");
	//     console.log("Slider moving: " + moving);
	//   }
	// }

	// create a tooltip
 //    var Tooltip = d3.select("#dataviz")
 //      .append("div")
 //      .style("opacity", 0)
 //      .attr("class", "tooltip")
 //      .style("background-color", "white")
 //      .style("border", "solid")
 //      .style("border-width", "2px")
 //      .style("border-radius", "5px")
 //      .style("padding", "5px")
 //      .style("position", "absolute");

 //      // Three function that change the tooltip when user hover / move / leave a cell
 //      var mouseover = function(d) {
 //        Tooltip
 //          .style("opacity", 1)
 //      }
 //      var mousemove = function(d) {
 //        Tooltip
 //          .html(
 //          	"Date: " + d.year_mo_da + "<p>People: " + d.people + "</p>")
 //          .style("left", (d3.mouse(this)[0]+70) + "px")
 //          .style("top", (d3.mouse(this)[1]) + "px")
 //          .style("opacity", 1)
 //      }
 //      var mouseleave = function(d) {
 //        Tooltip
 //          .style("opacity", 0)
 //      }

 //      var displayEntry = function(d) {
 //      	d3.select("#text")
 //      		.html("<p>" + d.text + "</p>")
 //      }

	// function plotPoints(data) {
	//   var locations = plot.selectAll(".location")
	//     .data(data);

	//   locations.enter()
	// 	.append("circle")
	// 	.attr("class", "location")
	// 	.attr("cx", function(d) {
	// 		return projection([d.latitude, d.longitude])[0] - margin;
	// 	})
	// 	.attr("cy", function(d) {
	// 		return projection([d.latitude, d.longitude])[1] - margin;
	// 	})
	// 	.attr("r", 3)
	// 	.style("fill", "yellow")
	// 	.style("stroke", "gray")
	// 	.style("stroke-width", 0.25)
	// 	.style("opacity", "0.75")
	// 	.on("mouseover", mouseover)
 //        .on("mousemove", mousemove)
 //        .on("mouseleave", mouseleave)
 //        .on("click", displayEntry)
	// 	.transition();

	//   // if filtered dataset has less circles than already existing, remove excess
	//   locations.exit()
	//     .remove();
	// }

	// function update(h) {
	//   // update position and text of label according to slider scale
	//   handle.attr("cx", x(h));
	//   label.attr("x", x(h))
	//     .text(formatDate(h));

	//   // filter data set and redraw plot
	//   var newData = dataset.filter(function(d) {
	//     return d.year_mo_da < h;
	//   })
	//   plotPoints(newData);
	// }
	return points;
})
