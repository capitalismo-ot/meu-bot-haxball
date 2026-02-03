const HaxballJS = require("haxball-headless-api");

HaxballJS.HBInit({
    roomName: "Minha Sala de Haxball",
    maxPlayers: 16,
    public: true,
    token: process.env.HAXBALL_TOKEN, // Isso pega o token que você salvou no Render
    noPlayer: true 
}).then((room) => {
    console.log("Sala aberta com sucesso!");
    console.log("Link da sala: https://www.haxball.com/play?c=" + room.getToken());

    room.onPlayerJoin = (player) => {
        console.log(player.name + " entrou na sala!");
        room.sendAnnouncement("Bem-vindo ao servidor, " + player.name + "!", player.id);
    };
});
