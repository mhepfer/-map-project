from bs4 import BeautifulSoup
import json
import csv

def is_person(regularization):
    people_tags = [
        "../search?lc_native_nation_ss",
        "../search?people",
    ]
    skip_tags = [
        "../search?places"
    ]
    href = regularization["href"]
    for person in people_tags:
        if href.startswith(person):
            return regularization["title"]

    found = False
    for tag in skip_tags:
        if href.startswith(tag):
            found = True
            break

    if not found:
        print(href)

    return None


with open('lewis-and-clark-expedition-lewis-and-clark-campsites-bergant.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    res = []
    for row in reader:
        with open("raw-pages/" + row['YEAR_MO_DA'].replace("/", "-") + ".html", 'r') as infile:
            tmp = json.load(infile)
            soup = BeautifulSoup(tmp, 'html.parser')
            all_entries = soup.find_all("div", {"class", "entry"})
            all_people = []
            all_text = ""
            for entry in all_entries:
                author_entry = entry.find("h4", {"class": "entry_author"})
                if not author_entry:
                    print("no author: " + row["YEAR_MO_DA"])
                    author = None
                else:
                    author = author_entry.text
                    all_people.append(author.replace('[', '').replace(']', ''))
                text = [x.get_text() for x in entry.find_all("p")]
                regularizations = entry.find_all("a", {"class", "regularization"})
                all_people.extend([
                    is_person(x) for x in regularizations if is_person(x)
                ])
                if author:
                    all_text = all_text + "##" + author + "\n" + "\n".join(text) + "\n" 
                else:
                    all_text = all_text + "\n".join(text) + "\n" 
        
        write_dict = {
            "people": json.dumps([x for x in set(all_people)]),
            "year_mo_da": row["YEAR_MO_DA"],
            "text": all_text.strip(),
            "latitude": row['Shape_X'],
            "longitude": row['Shape_Y'],
        }
        res.append(write_dict)
    with open("clean-lewis-and-clark-data.csv", "w") as outfile:
        fieldnames = res[0].keys()
        writer = csv.DictWriter(outfile, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(res)



