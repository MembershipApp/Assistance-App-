/* Require module */
module.exports = {
    notifications: function(rootPath) {        
        return Notifications(rootPath);
    }
}

/*
 * @Class 
 * handles notifications for iOS, Android and BlackBerry 
 */ 
var Notifications = function(rootPath) {
    
	/* variables */	
	var apn = require('apn');
	var gcm = require('node-gcm');
    var bbp  = require('blackberry-push');
	var geocoder = require('geocoder');
	this.deviceType;
	this.token;
	this.timestamp;
	this.state;
	
	__construct = function() {
		console.log(rootPath);
		//sendGCM("My Address");
	}
	
	
		
	/* methods */
	/* get address from lat long */
	this.geo = function(lat , long) {		
		// handle the geocoding 
        console.log('The lat: '+lat+'  The long: '+long);
		if(parseInt(lat) !== 0 && parseInt(long) !== 0) {
                geocoder.reverseGeocode( lat , long , function ( err, dt ) {								
        				
        				var address = (dt) ? dt.results[0].formatted_address : 'No Lat Long Provide Alert';				
        				
        				console.log(address);
        				
        					
        				if(deviceType === 'i'){
        					sendAPNS(0 , address);	
        					console.log("iOS Device Type");
        				}
        				else if(deviceType === 'A'){
        					sendGCM(address);
        					console.log("Android Device Type");
        				}
        				else if(deviceType === 'BB'){
        					sendBBPS(address);
                            console.log("Blackberry Device Type");
        				}
                        
        				// Now we need to store it! MongoDB below...
        												
        		});
		}
	};
	
	

	this.mongo = function(){
		
		
	};
	
	
	/* send a Apple push notifications */
	var sendAPNS = function(badgeNum , address) {
			var myDevice = new apn.Device(token);
			var note = new apn.Notification();				
            var now = new Date(); 
            var date = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
		date = date.toString().split("GMT")[0];	
            console.log(date);
            
            note.badge = badgeNum;
			note.sound = "default";
			note.alert = (this.state === "foreground") ? 
            "You checked in near "+address : 
            "You checked in near "+address+"\n"+date ;
			
            note.device = myDevice;
            note.timestamp = timestamp;
					 
			// handle error
			var callback = function(errorNum, notification){
					console.log('Error is: %s', errorNum);
					console.log("Note " + notification);
			}
			
			var options = {
					gateway: 'gateway.push.apple.com', // this URL is different for Apple's Development Servers ex:(gatway.sandbox.push.apple.com)
					errorCallback: callback,
					cert: rootPath+'/apns_cer/apns-prod-cert.pem',                 
					key:  rootPath+'/apns_cer/apns-prod-key-noenc.pem',                                   
					port: 2195,                       
					enhanced: true,                   
					cacheLength: 100                  
			}
			console.log("push ios success");
			var apnsConnection = new apn.Connection(options);
			apnsConnection.sendNotification(note);
	};
	
	
	// send a Google cloud message
	var sendGCM = function(address){
			var message = new gcm.Message();
			var sender = new gcm.Sender('AIzaSyApU0DhtIMQ6jgMfpmoKVg2tounbUOqyOQ');
			var registrationIds = [];
			
			// Optional
			message.addData('message', "You checked in near "+address+" $$"+timestamp);			
			message.collapseKey = 'demo';
			//message.delayWhileIdle = true;
			message.timeToLive = 3;
			
			// At least one required
			console.log(token);
			registrationIds.push(token);			
			//"APA91bFTSAJTRWTKtfjYjxc4cbpESu3iVsekOG_ahIIhxjJdXrY6TY_cBBS5Ot2Z__jgfNkHslpVpJOV2AXSsIhe8VzRxwQQyOnKuglQdhA5KYw8Recj7lm9uC8BXKr5i7SKe9VNldGWH7yFdIxPmpeWfZK2dGe0cg"
	
		
		
			/**
			 * Parameters: message-literal, registrationIds-array, No. of retries, callback-function
			 */
			sender.send(message, registrationIds, 4, function (err, result) {
				console.log(result);
			});		
	};
    
    
    var sendBBPS = function(address) {                        
            //https://pushapi.eval.blackberry.com/mss/PD_pushRequest
            
            var push = bbp('https://pushapi.eval.blackberry.com/mss/PD_pushRequest', 
                        '3131-l5c0059eyee03ro92666558cc0e53568568',
                        '8nKLVOck');
        
            console.log(token);
            
            push(token, "You checked in near "+address+" $$"+timestamp, function(err, result) {
                console.log('The results : ' + result+ '  :'+err); 
            });
           
           //{ code: '1001', desc: 'The request has been accepted for processing.' }        
    }
	
	
	__construct();
	
	//return instant
	return this	
}
