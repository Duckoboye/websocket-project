//const { on } = require("ws")
const WebSocket = require("ws")
const express = require("express")
const app = express()
const path = require("path")
app.use("/", express.static(path.resolve(__dirname, "../client")))

const server = app.listen(8989)

const wss = new WebSocket.Server({
    server,
    verifyClient: (info) => { 
        return true
    }
})


wss.on('connection', function (ws) {
    ws.send("Client connected")
    ws.on('message', function(data) {
        wss.clients.forEach(function each(client) {
            if (client.readyState===WebSocket.OPEN) {
                client.send(data.toString("utf-8"))
            }
        })
        //clients.forEach(client => client.send(data.toString("utf-8")))
    })
})