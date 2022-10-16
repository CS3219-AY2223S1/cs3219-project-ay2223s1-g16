from http.server import BaseHTTPRequestHandler, HTTPServer
import subprocess
import json

hostName = "localhost"
serverPort = 6969
l = {
    'python' : ["python3", "-c"],
    'js' : ["node", "-e"],
    'cpp' : ['NOT IMPLEMENTED'],
    'java' : ['NOT IMPLEMENTED'],

}
compiled_languages = { 'cpp', 'java' }

def run(l):
    p = subprocess.run(l, capture_output=True)
    return p.stdout.decode('utf-8'), p.stderr.decode('utf-8')

def handle_request(req) -> str:
    if 'src' not in req: return "Missing source"
    if 'lang' not in req: return "Missing Language"
    src = req['src']
    lang = req['lang']
    if lang not in l: return "Language not supported"

    src = src.replace('"', '\"').replace("'", '\"')
    if not src: return ""


    if lang in compiled_languages:
        # create file
        name, err = run(['safe_touch',src,lang])
        if err: return "Unable to create file"

        # TODO: refactor
        if lang == 'cpp': 
            res, err = run(["g++", name,'-o',name.split('.')[0]])
            if err: return err
            res, err = run([name.split('.')[0]])
        else: # java
            res, err = run(["java", name])

    else:
        res, err = run([*l[lang], src])


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
