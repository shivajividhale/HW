/*DigitalOcean key = 42da553d1d865fb6c59d99276ec91797707371348f01ea211cdd4f3fb2f0c8ffe7877497b52455266aa10b2026458a98
API key = f7ec00339b430482187981c1f609fe78
client id = e7877497b52455266aa10b2026458a98*/

var needle = require("needle");
var os   = require("os");

var config = {};
config.token = "801bc4076840280c3324203dceffba1923a072c7c1c5548de648e7faa088a2df";

var headers =
{
	'Content-Type':'application/json',
	Authorization: 'Bearer ' + config.token
};