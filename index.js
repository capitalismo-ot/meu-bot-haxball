const http = require('http');

// 1. Mantém o bot vivo no Render
http.createServer((req, res) => {
    res.write('Servidor de Elite Haxball - Online');
    res.end();
}).listen(10000);

console.log("--- INICIANDO SISTEMA LOCAL ---");

// 2. MOTOR DO HAXBALL EMBUTIDO (API OFICIAL)
const HBInit = (function(n){var r={};function t(e){if(r[e])return r[e].exports;var o=r[e]={i:e,l:!1,exports:{}};return n[e].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=n,t.c=r,t.d=function(n,r,e){t.o(n,r)||Object.defineProperty(n,r,{enumerable:!0,get:e})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,r){if(1&r&&(n=t(n)),8&r)return n;if(4&r&&"object"==typeof n&&n&&n.__esModule)return n;var e=Object.create(null);if(t.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:n}),2&r&&"string"!=typeof n)for(var o in n)t.d(e,o,function(r){return n[r]}.bind(null,o));return e},t.n=function(n){var r=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(r,"a",r),r},t.o=function(n,r){return Object.prototype.hasOwnProperty.call(n,r)},t.p="",t(t.s=0)}([function(n,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var e=function(){function n(){}return n.HBInit=function(n){return window.HBInit(n)},n}();r.default=e,module.exports=e.HBInit}]).default);

// 3. INICIALIZAÇÃO DA SUA SALA
try {
    const room = HBInit({
        roomName: "SALA DO TOP 1 - SEM BABA OVO",
        maxPlayers: 12,
        public: true,
        token: process.env.TOKEN 
    });

    room.onRoomLink = (link) => {
        console.log("=========================================");
        console.log("SALA CRIADA COM SUCESSO!");
        console.log("LINK PARA ENTRAR:");
        console.log(link);
        console.log("=========================================");
    };

    room.onPlayerJoin = (player) => {
        room.sendAnnouncement("Bem-vindo à sala onde o mérito vale mais que a panela! Divirta-se, " + player.name);
    };

} catch (e) {
    console.log("ERRO AO ABRIR SALA: Verifique se o TOKEN é novo!");
}
