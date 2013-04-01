/* Require module */
module.exports = {
    mongo: function() {        
        return MongoDB();
    }
}




/*
 * @Class 
 * handles notifications for iOS, Android and BlackBerry 
 */ 
var MongoDB = function() {
	
	/* variables */	
	var mongoose = require('mongoose');
	
	
	/* constructor */
	__const = function(){
		
		mongoose.connect('mongodb://appzhao.com:27017');
		
		var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function callback () {
		  // yay!
		  console.log("Mongo DB is Open!!!");
		});
		
	}
	
	
		
	/* methods */
	
	
	
	
	/* fake const */
	__const();
	
	//return instant
	return this	
}
