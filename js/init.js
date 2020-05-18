var init = async function() {
	// these can happen at the same time
	drawMap(map_defaults.map_w, map_defaults.map_h, map_defaults.map_margin);
	dataset = await load_clean_data("data/clean-lewis-and-clark-data.csv");
	// but these have to happen after the above two
	populate_map();
	addPeopleLegend();
	// add timeline
	// add people
}

init();