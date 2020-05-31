var initPlayButton = function() {
	var timeScale = timelineDefaults.timeScale;
	var playButton = d3.select("#play-button");
	timelineDefaults.sliderPos = timelineDefaults.sliderZero;
	playButton
	    .on("click", function() {
		    var button = d3.select(this);
		    if (button.text() == "Pause") {
		      timelineDefaults.moving = false;
		      clearInterval(timelineDefaults.timer);
		      button.text("Play");
		    } else {
		      timelineDefaults.moving = true;
		      timelineDefaults.timer = setInterval(step, 100);
		      button.text("Pause");
		    }
		    console.log("Slider moving: " + timelineDefaults.moving);
	  	})
}

var step = function() {
	var timeScale = timelineDefaults.timeScale;
    update(timeScale.invert(timelineDefaults.sliderPos));
    timelineDefaults.sliderPos = timelineDefaults.sliderPos + (timelineDefaults.sliderZero/151);
    if (timelineDefaults.sliderPos > timelineDefaults.sliderZero) {
    	var playButton = d3.select("#play-button");
    	timelineDefaults.moving = false;
    	timelineDefaults.sliderPos = 0;
    	clearInterval(timelineDefaults.timer);
    	// timer = 0;
    	playButton.text("Play");
    	console.log("Slider moving: " + timelineDefaults.moving);
    }
}

function update(h) {
  // update position and text of label according to slider scale
  var timeScale = timelineDefaults.timeScale;
  var formatDate = d3.timeFormat("%b %Y");
  timelineDefaults.handle.attr("cx", timeScale(h));
  timelineDefaults.label.attr("x", timeScale(h))
    .text(formatDate(h));

  // filter data set and redraw plot
  // var newData = dataset.filter(function(d) {
  //   return d.year_mo_da < h;
  // })
  // set newData opacity to 1, set other data opacity to 0
  // plotPoints(newData);
}

var drawTimeline = function(svg) {
	var parseTime = d3.timeParse("%Y-%m-%d");
	var formatDate = d3.timeFormat("%b %Y");

	var startDate = d3.min(dataset, function(d) { return d.year_mo_da; })
	var endDate = d3.max(dataset, function(d) { return d.year_mo_da; })

	timelineDefaults.sliderZero = timelineDefaults.w - timelineDefaults.margin;

	timelineDefaults.timeScale = d3.scaleTime()
	    .domain([startDate, endDate])
	    .range([0, timelineDefaults.sliderZero])
	    .clamp(true);


	var timeScale = timelineDefaults.timeScale;
	var slider = svg.append("g")
	    .attr("class", "slider")
	    .attr("transform", `translate(${timelineDefaults.margin}, ${timelineDefaults.h / 2})`);

	slider.append("line")
	    .attr("class", "track")
	    .attr("x1", timeScale.range()[0] + timelineDefaults.margin)
	    .attr("x2", timeScale.range()[1] - timelineDefaults.margin)
	  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
	    .attr("class", "track-inset")
	  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
	    .attr("class", "track-overlay")
	    .call(d3.drag()
	        .on("start.interrupt", function() { slider.interrupt(); })
	        .on("start drag", function() {
	          timelineDefaults.timelineDefaults.sliderPos = d3.event.timeScale;
	          update(timeScale.invert(timelineDefaults.timelineDefaults.sliderPos)); 
	        })
	    );

	 // ticks are placed on the overlay
	slider.insert("g", ".track-overlay")
	    .attr("class", "ticks")
	    .attr("transform", "translate(" + timelineDefaults.margin + "," + 18 + ")")
	  .selectAll("text")
	    .data(timeScale.ticks(10))
	    .enter()
	    .append("text")
	    .attr("x", timeScale)
	    .attr("y", 10)
	    .attr("text-anchor", "middle")
	    .text(function(d) { return formatDate(d); });


	timelineDefaults.handle = slider.insert("circle", ".track-overlay")
	    .attr("class", "handle")
	    .attr("transform", "translate(" + timelineDefaults.margin + ",0)")
	    .attr("r", 9);

	timelineDefaults.label = slider.append("text")  
	    .attr("class", "label")
	    .attr("text-anchor", "middle")
	    .text(formatDate(startDate))
	    .attr("transform", "translate(" + 30 + "," + (-25) + ")")
	return timeScale;
}

var initTimeline = function() {
	var svg = d3.select("#timeline")
		.append("svg")
		.attr("width", timelineDefaults.w)
		.attr("height", timelineDefaults.h);

	drawTimeline(svg);
	initPlayButton();
}

