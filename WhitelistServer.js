// we'll use node js bc it's pretty easy to install and i hate php
// we install express so we can run our server

const Express = require("express");
const App = Express();

const Keys = ["OwnerKey.DEV", "ModKey.MOD"]; // our key database of course you can replace it with a query prepared request to a mysql data base or mongodb
const skey2 = "72525588571e244e7b46284dd7df2e9f9d1d47c97b11f624fa48718a32aba36c4ffdfd60236de8b7a6a8ed41f2a5d78a7025eae07aebbb41678e217de4fa7078";
const Crypto = require("crypto");

function hmac(secret, data){
    const hash = Crypto.createHash("sha512");
    hash.update(secret + data + secret);
    return hash.digest("hex").toString();
};

App.get("/checkWhitelist", (request, response) => {
    const Key = request.query.Key;
    const Gamer = request.query.gamer;

    if(Key && Gamer){
        const isKeyValid = Keys.find((key) => key !== null && Key == key);

        if(isKeyValid){
            response.send(hmac(secretKey2, Key + Gamer)) // we'll send the data of the whitelist response to the client once the key is valid
        }
        else{
            response.send("Not Whitelisted");
        }
    }
    else{
        response.send("Not Whitelisted");
    }
});

App.listen(80, () => {
    console.log("App started");
});
// Our website is now ready to listen on port 80