# Coderunner Service

Start service using `docker-compose up code-runner-svc` from project root.


Using the API is simple, just send a POST request to the service with a JSON payload with 2 keys, `src` and `lang`.

`src` - the source code to be executed
`lang` - what language is the source code written in

## Example usage
``` javascript
function submit() {
    fetch("http://localhost:6969", {
        method: 'POST',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            "src": <<SRC_CODE>>,
            "lang": <<LANGUAGE>>
        }),
        redirect: 'follow'
    })
    .then(response => response.json())
    .then(result => console.log)
}
```