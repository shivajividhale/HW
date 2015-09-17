var AWS = require('aws-sdk');
fs = require('fs');
	os = require('os');
var sys = require('sys')
var exec = require('child_process').exec;


// configure AWS security tokens
AWS.config.update({accessKeyId: process.env.AccessKeyID,
secretAccessKey: process.env.SecretAccessKey});

AWS.config.update({region: 'us-west-1'});

var ec2 = new AWS.EC2({apiVersion: '2015-04-15'});


var params = {
  ImageId: 'ami-df6a8b9b', // Amazon Linux AMI x86_64 EBS
  InstanceType: 't2.micro',
  KeyName: 'HW1',
  MinCount: 1, MaxCount: 1
};

// Create the instance
ec2.runInstances(params, function(err, data) {
	if (err) { console.log("Could not create instance", err); return; }
	var instanceId = data.Instances[0].InstanceId;
    console.log("Created instance", instanceId);
    setTimeout();
	var params = {
  		InstanceIds: [instanceId]
  	};

 	ec2.waitFor('instanceRunning', params, function(err, waitForData) {
 		ec2.describeInstances(params, function(err,data){
  		if (err) {
  		console.log("Could not create instance", err); return;
  		}
  		console.log("here");
  		var ip = data.Reservations[0].Instances[0].PublicIpAddress;
	  	console.log(ip);

	  	var file_data = '\nnode-aws ansible_ssh_host='+ip+' ansible_ssh_user=ubuntu'+
	  	' ansible_ssh_private_key_file='+process.env.HOME+'/Downloads/HW1.pem';
		dir  = process.env.HOME+"/HW/HW1/inventory";

	  	fs.appendFile(dir,file_data, function (err) {
	  		    if (err) return console.log(err);
				dir  = process.env.HOME+"/HW/HW1/inventory";

	 	});
  		function puts(error, stdout, stderr) { x =stdout; console.log(x);console.log("end");}
  		if (err) {console.log(err, err.stack);return;} // an error occurred
  		//exec("ansible-playbook ~/HW/HW1/play.yaml -i ~/HW/HW1/inventory", puts);
		});

	});
 });







