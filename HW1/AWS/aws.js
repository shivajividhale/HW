var AWS = require('aws-sdk');
fs = require('fs');
os = require('os');

// configure AWS security tokens
AWS.config.update({accessKeyId: process.env.AccessKeyID,
  secretAccessKey: process.env.SecretAccessKey});

// Set your region for future requests.
AWS.config.update({region: 'us-west-1'});

var ec2 = new AWS.EC2({apiVersion: '2015-04-15'});


var paramsa = {
  ImageId: 'ami-d383af96', // Amazon Linux AMI x86_64 EBS
  InstanceType: 't1.micro',
  KeyName: 'HW1',
  MinCount: 1, MaxCount: 1
};

// Create the instance
/*ec2.runInstances(params, function(err, data) {
  if (err) { console.log("Could not create instance", err); return; }

//  var instanceId = data.Instances[0].InstanceId;

});*/
  var instanceId = 'i-588247ea';
  var params = {
  	InstanceIds: [instanceId]
  }
  console.log("Created instance", instanceId);
  ec2.describeInstances(params, function(err,data){
  	if (err) { console.log("Could not create instance", err); return; }
  	//var instanceId = data.Instance[0].InstanceId;
  	//var ip =  data.Instances[0].PublicIpAddress;
  	//console.log(instanceId);
  //	[servers]
/*node0 ansible_ssh_host=198.199.XX.XX ansible_ssh_user=root ansible_ssh_private_key_file=./id_rsa
*/  	console.log();
  	var ip = data.Reservations[0].Instances[0].PublicIpAddress;
  	var file_data = '[servers]\nnode0 ansible_ssh_host='+ip+' ansible_ssh_user=ubuntu'+
  	' ansible_ssh_private_key_file='+process.env.HOME+'/Downloads/HW1.pem';
  	//homedir = os.homedir();
  	dir  = process.env.HOME+"/HW/HW1/inventory";

  	fs.writeFile(dir,file_data, function (err) {
  if (err) return console.log(err);

});
  });

var txtFile = "~/HW/HW1/test.txt";
var str = "My string of text";


