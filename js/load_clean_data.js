
var load_clean_data = async function(dataFile) {
	let data = await d3.csv(dataFile);
	var parseTime = d3.timeParse("%Y-%m-%d");
	// clean data
	data.forEach(function(d) {
		d.people = JSON.parse(d.people);
		d.year_mo_da = parseTime(d.year_mo_da);
		d.text = d.text;
		d.latitude = parseFloat(d.latitude);
		d.longitude = parseFloat(d.longitude);
	});
	return data;
}
