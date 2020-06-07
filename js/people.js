var addPeopleSearchFilter = function() {
	var target = document.getElementById("peopleFilter");
	// add on change
	target.addEventListener("keydown", function() {
		renderPeople();
	})
}


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


var eventCard = function(eventDate, eventEntry, idx) {
	return `<div class="card">
    	<div class="card-header" id="heading${idx}">
      		<h2 class="mb-0">
        	<button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapse${idx}" aria-expanded="false" aria-controls="collapse${idx}">
          		${eventDate}
        	</button>
      		</h2>
    	</div>

    	<div id="collapse${idx}" class="collapse" aria-labelledby="heading${idx}" data-parent="#eventEntries">
      		<div class="card-body">
        		${eventEntry}
      		</div>
    	</div>
  	</div>`
}


var addPeopleClick = function(nodes) {
	// click node highlights map
	// add journal entries to text area
	nodes.on('click', function (person) {
		var events = dataset.filter(function (d) {
			return ( d.people.includes(person) ) 
		})
		var accordion = document.getElementById("eventEntries");
		// clear old journal entries
		accordion.innerHTML = "";
		events.forEach(function(event, idx) {
			accordion.innerHTML += eventCard(event.year_mo_da, event.text, idx);
		})
		
	})
}


var renderPeople = function() {
	var target = document.getElementById("peopleFilter");
	var searchVal = target.value;
	var peopleLegend = d3.select("#people-legend")

	d3.selectAll(".peoplelabels").remove();

	var nodes = peopleLegend.selectAll("peoplelabels")
	  .data(people)
	  .enter()
	  .append("text")
	  .filter(function(d) {
	  	if ((searchVal === undefined) || (searchVal === "")) {
	  		return true;
	  	} else {
	  		return d.toLowerCase().includes(searchVal.toLowerCase());
	  	}
	  })
	    .attr("x", 20)
	    .attr("y", function(d,i){ return 15 + i*25}) // 10 is where the first dot appears. 25 is the distance between dots
	    .style("fill", "green")
	    .text(function(d){ return d})
	    .attr("text-anchor", "left")
	    .style("alignment-baseline", "middle")
	    .attr("class", "peoplelabels")

	addPeopleHighlight(nodes);
	addPeopleClick(nodes);
}


var addPeopleLegend = function() {
	var dupPeople = dataset.map(function (el) { return el.people; });
	dupPeople = dupPeople.flat();
	people = Array.from(new Set(dupPeople));

	var peopleLegend = d3.select("#people")
		.append("svg")
		.attr("width", 200)
		.attr("height", function() {
			var itemHeight = 25;
			return itemHeight * people.length;
		})
		.attr("id", "people-legend");

	renderPeople();
	addPeopleSearchFilter();
}

