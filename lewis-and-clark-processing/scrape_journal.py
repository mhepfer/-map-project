import requests
import json
import csv


with open('lewis-and-clark-expedition-lewis-and-clark-campsites-bergant.csv', newline='') as csvfile:
	reader = csv.DictReader(csvfile)
	for row in reader:
		res = requests.get(row['Hyperlink'])
		with open("raw-pages/" + row['YEAR_MO_DA'].replace("/", "-") + ".html", 'w') as outfile:
			json.dump(res.text, outfile)
