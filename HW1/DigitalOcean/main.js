/*DigitalOcean token = b111958beec902fe4fae1ad2d8d9e4a900284768167688968ae06dc747a12707
API key = f7ec00339b430482187981c1f609fe78
client id = e7877497b52455266aa10b2026458a98*/
//sshid: 1325247

var needle = require("needle");
fs = require('fs');
var os   = require("os");
console.log("heyyy");

var dropletID;

var config = {};
//config.token = "801bc4076840280c3324203dceffba1923a072c7c1c5548de648e7faa088a2df";
config.token = "b111958beec902fe4fae1ad2d8d9e4a900284768167688968ae06dc747a12707"
var headers =
{
	'Content-Type':'application/json',
	Authorization: 'Bearer ' + config.token
};


var client =
{
	listImages: function( onResponse )
	{
		//needle.get("https://api.digitalocean.com/v2/images",{headers:headers}, onResponse)
	},

	deleteDroplet: function( dropletID,onResponse )
	{
		var delRequest = "https://api.digitalocean.com/v2/droplets/"+dropletID;
		needle.delete(delRequest,null,{headers:headers}, onResponse);
	},

	listDropletIp: function (dropletID,onResponse)
	{	var getRequest = "https://api.digitalocean.com/v2/droplets/"+dropletID;
		needle.get(getRequest,{headers:headers}, onResponse);
	},

	createDroplet: function (dropletName, region, imageName, onResponse)
	{
		var data =
		{
			"name": dropletName,
			"region":region,
			"size":"512mb",
			"image":imageName,
			// Id to ssh_key already associated with account.
			"ssh_keys":[1326285],
			//"ssh_keys":[625870],
			//"ssh_keys":null,
			"backups":false,
			"ipv6":false,
			"user_data":null,
			"private_networking":null
		};

		console.log("Attempting to create: "+ JSON.stringify(data) );

		needle.post("https://api.digitalocean.com/v2/droplets", data, {headers:headers,json:true}, onResponse );
	}
};


client.listImages(function(error, response){
	var data = response.body;

	if( response.headers ){
		console.log( "Calls remaining", response.headers["ratelimit-remaining"] );
	}

	if( data.images )
	{	for(var i=0; i<data.images.length; i++)
		{
		console.log(data.images[i].slug);

		}
	}
});

var name = "UnityId"+os.hostname();
var region = "nyc1"; // Fill one in from #1
var image = "ubuntu-14-04-x64";
// /var dropletID;
client.createDroplet(name, region, image, function(err, resp, body)
{
	//console.log(body);
	var data = resp.body;
	dropletID = data.droplet.id;
	console.log("ID:",dropletID);
	// StatusCode 202 - Means server accepted request.
	if(!err && resp.statusCode == 202)
	{
		var x =5;//console.log( JSON.stringify( body, null, 3 ) );
	}

  setTimeout(function(){
    client.listDropletIp(dropletID,function(error,response){
    var data =response.body;
    //console.log(data);
    var ip = data.droplet.networks.v4[0].ip_address;
    console.log("IP: ",data.droplet.networks.v4[0].ip_address);
    var file_data = '[servers]\nnode-do ansible_ssh_host='+ip+' ansible_ssh_user=root'+
      ' ansible_ssh_private_key_file='+process.env.HOME+'/.ssh/id_rsa';
    dir  = process.env.HOME+"/HW/HW1/inventory";
          fs.writeFile(dir,file_data, function (err) {
            if (err) return console.log(err);
    });
  });},60000);

});



/*
/* client.deleteDroplet(function(error,response){
 	if(!error && response.statusCode == 204)
 	{
 		console.log("Deleted");
 	}
 	else
 		console.log(response.headers);
 		console.log(error);

 });

*/

/*{
  "name": "DevOPsHW1",
  "version": "0.0.0",
  "description": "\"Provision vms\"",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "needle": "^0.7.10"
  }
  {
  "name": "NodeApp",
  "version": "0.0.1",
  "description": "A Node.js App",
  "dependencies": {
    "express": "*",
    "aws-sdk": "*"
   },
  "engine": "node >=0.6.x"
}

}*/
