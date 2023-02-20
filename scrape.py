#Scrapes the SVGs out off mahjon.gg's assets.css file

import re
import base64
import urllib.parse

fileContents = open("assets.css", "r").read()

matches = re.findall(r"\.tile([A-Z1-9]+?)\{background-image:url\(data:image\/svg\+xml;(.*?),(.*?)\)", fileContents)

for match in matches:
    tileId = match[0]
    encoding = match[1]
    data = match[2]
    if(encoding == "base64"):
        decodeString = str(base64.b64decode(data))
    elif(encoding == "charset=utf-8"):
        decodeString = urllib.parse.unquote(data, encoding='utf-8', errors='replace')
    else:
        raise "Invalid Encoding"
    open("./Assets/" + tileId + ".svg", "w").write(decodeString)