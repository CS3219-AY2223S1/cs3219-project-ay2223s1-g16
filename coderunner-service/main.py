from http.server import BaseHTTPRequestHandler, HTTPServer
import subprocess
import json

hostName = "localhost"
serverPort = 8080
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

class Server(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
            self.send_response(200, "ok")
            self.send_header('Access-Control-Allow-Origin', "*")
            self.send_header('Access-Control-Allow-Methods', '*')
            self.send_header("Access-Control-Allow-Headers", "*")
            self.end_headers()

    def do_POST(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', "*")
        self.send_header("Content-type", "text/html")
        self.end_headers()
        req = json.loads(self.rfile.read(int(self.headers.get('Content-Length'))))

        res = handle_request(req)
        self.wfile.write(bytes(json.dumps(
            {
                "result": res
            }
        ),"utf-8"))

if __name__ == '__main__':
    webServer = HTTPServer((hostName, serverPort), Server)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")
