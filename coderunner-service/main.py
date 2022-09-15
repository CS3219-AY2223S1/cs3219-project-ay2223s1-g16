# This is a sample Python script.

# Press ⌃R to execute it or replace it with your code.
# Press Double ⇧ to search everywhere for classes, files, tool windows, actions, and settings.

import subprocess

l = {
    'python' : ["python3", "-c"],
    'js' : ["node", "-e"],
}

def handle_request(req) -> str:
    if 'src' not in req: return
    src = req['src']
    lang = req['lang'] if 'lang' in req else 'python'

    src = src.replace('"', '\"').replace("'", '\"')
    if not src: return ""
    p = subprocess.run([*l[lang], src], capture_output=True)
    res = p.stdout.decode('utf-8')
    err = p.stderr.decode('utf-8')

    return res if res else err

from http.server import BaseHTTPRequestHandler, HTTPServer
import json

hostName = "localhost"
serverPort = 8080

class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        with open("index.html", "r") as f:
            for x in f:
                self.wfile.write(bytes(x,'utf-8'))

    def do_POST(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        req = json.loads(self.rfile.read(int(self.headers.get('Content-Length'))))

        res = handle_request(req)
        print(res)
        self.wfile.write(bytes(json.dumps(
            {
                "result": res
            }
        ),"utf-8"))
# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
