
const url = `ws://127.0.0.1:8989/websocket` //localhost one
//const url = `ws://storpojke.com:8989/websocket` //public

const server = new WebSocket(url)

const message = document.getElementById("messages")
const input = document.getElementById("message")
const button = document.getElementById("send")

button.disabled = true
button.addEventListener("click", sendMessage, false)

server.onopen = function() {
    button.disabled = false
}

server.onmessage = function(event) {
    const { data } = event
    generateMessageEntry(data, "Server")    
}

function generateMessageEntry(msg, type) {
    const newMessage = document.createElement("div")
    newMessage.innerText = `${type} says: ${msg}`
    message.appendChild(newMessage)
}

function sendMessage() {
    const text = input.value
    generateMessageEntry(text, "You")
    server.send(text)
}