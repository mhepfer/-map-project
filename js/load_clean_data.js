var load_clean_data = async function (dataFile) {
	let data = await d3.csv(dataFile);
	var parseTime = d3.timeParse("%Y-%m-%d");

	return data.map(function (d) {
		return {
			latitude: parseFloat(d.latitude),
			longitude: parseFloat(d.longitude),
			people: JSON.parse(d.people),
			text: d.text,
			year_mo_da: parseTime(d.year_mo_da)
		};
	});
}
