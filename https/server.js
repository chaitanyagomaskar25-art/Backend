import http from "http"

const server = http.createServer((req, res)=>{

    if (req.url === "/"){
    res.end("Hello from node.js!!!!!!!!, /")

    } else if (req.url == "/about"){
    res.end("Hello from node.js!!!!!!!! /about")

    } else{
        res.statusCode = 404
        res.end("page not found")
    }
})

server.listen(3000, ()=>{
    console.log("server strted");
    
})