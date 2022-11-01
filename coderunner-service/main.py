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
TIMEOUT = 10 # timeout for running user programs

def run(l):
    output = None
    err = None
    try:
        output = subprocess.check_output(l,  stderr=subprocess.STDOUT, timeout=TIMEOUT).decode('utf-8')
    except subprocess.CalledProcessError as e:
        err = e.output.decode('utf-8')
    except subprocess.TimeoutExpired as e:
        err = f"Program Timed out after {timeout} seconds"

    return output, err

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
