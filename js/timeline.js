var initPlayButton = function() {
	var playButton = d3.select("#play-button");
	playButton
	    .on("click", function() {
		    var button = d3.select(this);
		    if (button.text() == "Pause") {
		      defaults.moving = false;
		      clearInterval(defaults.timer);
		      button.text("Play");
		    } else {
		      defaults.moving = true;
		      defaults.timer = setInterval(step, 100);
		      button.text("Pause");
		    }
		    console.log("Slider moving: " + moving);
	  	})
}

var step = function() {
	  update(x.invert(currentValue));
	  currentValue = currentValue + (targetValue/151);
	  if (currentValue > targetValue) {
	    moving = false;
	    currentValue = 0;
	    clearInterval(timer);
	    // timer = 0;
	    playButton.text("Play");
	    console.log("Slider moving: " + moving);
	  }
	}

function update(h) {
	  // update position and text of label according to slider scale
	  handle.attr("cx", x(h));
	  label.attr("x", x(h))
	    .text(formatDate(h));

	  // filter data set and redraw plot
	  var newData = dataset.filter(function(d) {
	    return d.year_mo_da < h;
	  })
	  plotPoints(newData);
	}

var parseTime = d3.timeParse("%Y-%m-%d");
var formatDate = d3.timeFormat("%b %Y");

var startDate = d3.min(dataset, function(d) { return d.year_mo_da; })
var endDate = d3.max(dataset, function(d) { return d.year_mo_da; })

var x = d3.scaleTime()
    .domain([startDate, endDate])
    .range([0, targetValue])
    .clamp(true);

var slider = svg.append("g")
    .attr("class", "slider")
    .attr("transform", "translate(" + margin + "," + h/12 + ")");

slider.append("line")
    .attr("class", "track")
    .attr("x1", x.range()[0] + margin)
    .attr("x2", x.range()[1] - margin)
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-inset")
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-overlay")
    .call(d3.drag()
        .on("start.interrupt", function() { slider.interrupt(); })
        .on("start drag", function() {
          currentValue = d3.event.x;
          update(x.invert(currentValue)); 
        })
    );

 // ticks are placed on the overlay
 slider.insert("g", ".track-overlay")
    .attr("class", "ticks")
    .attr("transform", "translate(" + margin + "," + 18 + ")")
  .selectAll("text")
    .data(x.ticks(10))
    .enter()
    .append("text")
    .attr("x", x)
    .attr("y", 10)
    .attr("text-anchor", "middle")
    .text(function(d) { return formatDate(d); });


var handle = slider.insert("circle", ".track-overlay")
    .attr("class", "handle")
    .attr("transform", "translate(" + margin + ",0)")
    .attr("r", 9);

var label = slider.append("text")  
    .attr("class", "label")
    .attr("text-anchor", "middle")
    .text(formatDate(startDate))
    .attr("transform", "translate(" + 30 + "," + (-25) + ")")