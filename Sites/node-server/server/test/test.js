module.exports = {		     
	server : function(http , url , mongodb , notif) {
			return http.createServer(function (req, res) {    				
			
						if(req.method === "POST") {
							var fullBody='';  
								
							req.on('data', function(chunk)  
							{
								// load content body
								fullBody += chunk;
								console.log("Full body " + fullBody);
							});
					
							// trigger once all data is obtain
							req.on('end', function()
							{				            			
								var data = JSON.parse(fullBody);
											
								notif.token = data.DeviceToken;
								notif.deviceType = (data.DeviceType) ? data.DeviceType : "i";	
																												
								if(data.Method === "login" || data.Password){																				
													
									console.log("logging in with device: "+notif.deviceType);
									console.log("Url Path: "+url.parse(req.url).pathname);
								}
								else {											
									notif.timestamp = data.timestamp;				
									
									// geo and push to proper device
									notif.geo(data.Latitude, data.Longitude);            
								}
										   
								// Every request gets the same "Hello Connect" response.    		
								res.end("0");			
							});
						}							
			});
	}	
}



