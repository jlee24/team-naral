import re
import pprint
import json

pp = pprint.PrettyPrinter(indent=4,depth=6)

# read in the file
html = open("ca_prolife.html").read().decode('utf-8').replace(u"\u2019", "'")
html = html.replace("<br>", " ")

# split data into cities
html_by_city = re.split('<h3>(.+)</h3>', html)
database = {}

# for each city
for i in xrange(1,len(html_by_city),2): 
	city = html_by_city[i]
	# create an array that will store the CPCs
	# database[city] = [] 
	cpcs = html_by_city[i+1].strip("\n")
	cpcs_list = re.split('<p>(.+)<\/p>', cpcs)
	# for each CPC in the city
	for cpc in cpcs_list:               
		# get the name, number (if exists), and website (if exists)
		name = re.search(r'\<em\>(.+)\<\/e', cpc)
		if name != None:
			name = name.group(1)
			website = re.search(r'(\w{3}\.\w+\.\w{3})', cpc)
			website = website.group(1) if website != None else "N/A"
			if website != None:
				cpc_obj = {}
				number = re.search(r'(href="(tel:)?)?(\(?\d{3}\)?[- ]?\d{3}-\d{4})', cpc)
				number = number.group(3).strip() if number != None else "N/A"
				cpc_obj['name'] = name
				cpc_obj['number'] = number
				cpc_obj['city'] = city
				database[website] = cpc_obj

				# database.append(cpc_obj)
				# database[city].append(cpc_in_city)
		
pp.pprint(database)
# store data in a json called ca_database
with open("ca_database.json", "w") as out:
	json.dump(database, out, indent=4)