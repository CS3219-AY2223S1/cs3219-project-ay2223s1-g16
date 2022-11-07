from http.server import BaseHTTPRequestHandler, HTTPServer
import json
from executor import Executor

hostName = "0.0.0.0"
serverPort = 6969


def handle_request(req):
    if 'src' not in req: return "Missing source"
    if 'lang' not in req: return "Missing Language"
    src = req['src']
    lang = req['lang']
    if not Executor.is_language_supported(lang): return "Language not supported"

    src = src.replace('"', '\"').replace("'", '\"')
    if not src: return ""

    res, err = Executor.new(lang).run(src)

    return { "result" : err if err else res, "iserror": bool(err) }

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
        self.wfile.write(bytes(json.dumps(handle_request(req)),"utf-8"))

if __name__ == '__main__':
    webServer = HTTPServer((hostName, serverPort), Server)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")
