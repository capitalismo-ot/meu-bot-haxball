const { HBInit } = require("haxball.js"); // Mudança aqui: pegando a função direto
const http = require('http');

// Servidor para o Render não desligar
http.createServer((req, res) => {
    res.write('Sala Capitalismo Online');
    res.end();
}).listen(10000);

console.log("--- INICIANDO SALA CAPITALISMO ---");

try {
    const tokenNovo = process.env.TOKEN ? process.env.TOKEN.trim() : null;

    if (!tokenNovo) {
        console.log("ERRO: O TOKEN não foi encontrado no Environment do Render.");
    } else {
        // Chamando a função diretamente sem o .then()
        const room = HBInit({
            roomName: "Capitalismo",
            maxPlayers: 15,
            public: true,
            token: tokenNovo
        });

        room.onRoomLink = (link) => {
            console.log("=========================================");
            console.log("SUCESSO! LINK DA SALA:");
            console.log(link);
            console.log("=========================================");
        };

        room.onPlayerJoin = (player) => {
            room.sendAnnouncement("Bem-vindo ao Capitalismo, " + player.name + "!");
        };
        
        console.log("Aguardando link oficial do Haxball...");
    }
} catch (error) {
    console.log("Erro ao inicializar: " + error.message);
}
