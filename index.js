const express = require("express");
const app = express();

//criando instancia do servidor http padrao do node
const http = require("http").createServer(app);

app.set("view engine", "ejs");

app.get("/", (req,res)=>{
    res.render("index");
});

//importando o socket io
const io = require("socket.io")(http);

//socket.io
io.on("connection", (socket) =>{
    socket.on("join", (data)=>{
        console.log(`${data.nickname} entrou no chat`);
        //mandando os dados para o front
        io.emit("join", data);
    });
    //recebendo a mensagem do chat
    socket.on("message", (data) =>{
        console.log(data)
        io.emit("showmsg", data);
    });
});


const port = 3000;
const host = "0.0.0.0";
http.listen(port, host, () =>{
    console.log("aplicação rodando em: " + port);
}); 


