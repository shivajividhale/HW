/*var AWS = require('aws-sdk');

// configure AWS security tokens
AWS.config.update({accessKeyId: process.env.AccessKeyID,
  secretAccessKey: process.env.SecretAccessKey});

// Set your region for future requests.
AWS.config.update({region: 'us-west-1'});

var ec2 = new AWS.EC2();

var params = {
  ImageId: 'ami-d383af96', // Amazon Linux AMI x86_64 EBS
  InstanceType: 't1.micro',
  MinCount: 1, MaxCount: 1,
  KeyName: 'HW1'
};

// Create the instance
ec2.runInstances(params, function(err, data) {
  if (err) { console.log("Could not create instance", err); return; }

  var instanceId = data.Instances[0].InstanceId;
  console.log("Created instance", instanceId);
});*/

/*DigitalOcean token = b111958beec902fe4fae1ad2d8d9e4a900284768167688968ae06dc747a12707
API key = f7ec00339b430482187981c1f609fe78
client id = e7877497b52455266aa10b2026458a98*/
//sshid: 1325247

var needle = require("needle");
var os   = require("os");
console.log("heyyy");

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
//var image = "centos-5-8-x64"; // Fill one in from #2;
var image = "ubuntu-14-04-x64";
var dropletID;
client.createDroplet(name, region, image, function(err, resp, body)
{
	console.log(body);
	var data = resp.body;
	dropletID = data.droplet.id;
	//var IP = data.droplet.networks.v4[0].ip_address;
	console.log("please print");
	console.log("ID:",dropletID);
	//console.log("IP:",IP);
	// StatusCode 202 - Means server accepted request.
	if(!err && resp.statusCode == 202)
	{
		console.log( JSON.stringify( body, null, 3 ) );
	}
});
	//console.log(" y oID:",dropletID);

/*client.listDropletIp(dropletID,function(error,response){
	var data =response.body;
	console.log(data);
	console.log("IP: ",data.droplet.networks.v4[0].ip_address);

});

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
/*{ droplet:
   { id: 7322785,
     name: 'UnityIdShivaji',
     memory: 512,
     vcpus: 1,
     disk: 20,
     locked: true,
     status: 'new',
     kernel:
      { id: 81,
        name: 'CentOS 5.8 x64 vmlinuz-2.6.18-308.1.1.el5',
        version: '2.6.18-308.1.1.el5' },
     created_at: '2015-09-13T16:53:45Z',
     features: [ 'virtio' ],
     backup_ids: [],
     next_backup_window: null,
     snapshot_ids: [],
     image: {},
     size: {},
     size_slug: '512mb',
     networks: {},
     region: {} },
  links: { actions: [ [Object] ] } }
{
   "droplet": {
      "id": 7322785,
      "name": "UnityIdShivaji",
      "memory": 512,
      "vcpus": 1,
      "disk": 20,
      "locked": true,
      "status": "new",
      "kernel": {
         "id": 81,
         "name": "CentOS 5.8 x64 vmlinuz-2.6.18-308.1.1.el5",
         "version": "2.6.18-308.1.1.el5"
      },
      "created_at": "2015-09-13T16:53:45Z",
      "features": [
         "virtio"
      ],
      "backup_ids": [],
      "next_backup_window": null,
      "snapshot_ids": [],
      "image": {},
      "size": {},
      "size_slug": "512mb",
      "networks": {},
      "region": {}
   },
   "links": {
      "actions": [
         {
            "id": 63664365,
            "rel": "create",
            "href": "https://api.digitalocean.com/v2/actions/63664365"
         }
      ]
   }
}
IP:  162.243.168.87

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
