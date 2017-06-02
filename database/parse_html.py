import os
import pprint
import json
from bs4 import BeautifulSoup

pp = pprint.PrettyPrinter(indent=4,depth=6)
cpc_files = "cpcs_by_state"
database = {}

# read in the file
for f in os.listdir(cpc_files):
	html = open(cpc_files + "/" + f).read()
	soup = BeautifulSoup(html)
	state = f[:-5]
	cpcs = soup.findAll('p')
	for cpc in cpcs:
		entry = {}
		website_exists = False
		for i,s in enumerate(cpc.strings):
			s = s.strip()
			if i == 0:
				entry["name"] = s.replace('\u2019',"'")
			elif i == 1:
				entry["address"] = s
			elif i == 2:
				entry["address"] += " " + s
			else:
				if website_exists == False and "number" not in entry:
					entry["number"] = s
				elif "Website" in s:
					website_exists = True
				else:
					if website_exists:
						entry["state"] = state
						database[s] = entry
					break
pp.pprint(database)

# store data in a json called ca_database
with open("database.json", "w") as out:
 	json.dump(database, out, indent=4)