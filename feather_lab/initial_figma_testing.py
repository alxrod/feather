import requests
import simplejson

token = "figd_U-EM9bbpd6Z72EA_UmQ1tFaPXPhhXB-49UHe-W3N"
link = "https://www.figma.com/file/9v2Q8deW86vbdvAKd15CM4/Untitled?node-id=0%3A1&t=FWaYpDQ3BNiICnnq-1"
key = "9v2Q8deW86vbdvAKd15CM4"

# Write code that makes a request to the Figma API for a file key and returns the JSON response
def request_file(session, key):
    url = f"https://api.figma.com/v1/files/{key}"
    response = session.get(url)
    return response.json()  

# Define the session to use
session = requests.Session()
# Set the session header Authorization as Bearer <token>
session.headers.update({'X-Figma-Token': token})

fileContents = request_file(session, key)

figmaFile = open("test_pull.json", "w")
# magic happens here to make it pretty-printed
figmaFile.write(simplejson.dumps(fileContents, indent=2, sort_keys=True))
figmaFile.close()