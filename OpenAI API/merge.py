import pandas as pd
import json
import glob 

# merge.py is used to combine all of the ingredient json files into a single json file
master = {
    "data":[]
}
files = glob.iglob('json/*.json')
for f in files:
    j = open(f)
    data = json.load(j)
    master["data"].append(data)
    j.close()

with open("all_data.json", "w") as f: 
    json.dump(master, f)