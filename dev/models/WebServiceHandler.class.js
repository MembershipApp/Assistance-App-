/* Require module */
module.exports = {
    webservice : function() {        
        return WebServiceHandler();
    }
}


/*
 * @Class 
 * handles web service calls
 */ 
var WebServiceHandler = function(url) {
    
	/* variables */	
    var soap = require('soap');
	
	/* constructor */
	__const = function(){
        var url = '';
        var args = {name: 'value'};
        soap.createClient(url, function(err, client) {
              
            console.log(err);
                            
            client.MyFunction(args, function(err, result) {
                console.log(result);
            });
        });
        
        
		switch (url) {
            case "GetMobileArticle":
            
            break;
            
		    default:
            break;
		}
		
	};
	
	
		
	/* methods */
	
	
	
	
	/* fake const */
	__const();
	
	//return instant
	return this	
}
