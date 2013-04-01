// configuration for diffferent Environments

process.env.NODE_ENV = (process.env.NODE_ENV) ? process.env.NODE_ENV : 'prod'; // default to production

module.exports = {	
	config : function(){    
			switch(process.env.NODE_ENV){
				case 'test':
					return {					
							env	: 'test',
							port : 9920
							};
				break;
				
				case 'dev':
					return {
							env : 'dev',					
							port : 9915
							};
				break;
				
				case 'prod':
					return {
							env : 'prod',					
							port : 9910
						};
				break;
				
				default:					
					console.log('Error: make sure the NODE_ENV variable is set (prod | dev | test)');
					node.exit();					
				break;
			}
	}
}