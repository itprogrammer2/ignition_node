$(document).ready(function (){ 
	var hostname = window.location.hostname;
	console.log(hostname);

	$.fn.editable.defaults.mode = 'inline';
    /*$.fn.editable.defaults.mode = 'popup';*/

    var user_id = Cookies.get(md5('_id'));

    $.get('http://'+hostname+':9001/api/contents', function(data){
    	if(data.status == true){
    		var contents = data.data;

    		for(var i in contents){
	    		$('#' + contents[i].name).empty().html(contents[i].details);

	    		check_user(function(user_id){
	    			if(user_id !== undefined){
	    				$('#' + contents[i].name).tooltip()
	    				.css({ cursor: "pointer" })
	    				.editable({
						    type: contents[i].field_type,
						    pk: contents[i].id,
						    url: 'http://'+hostname+':9001/api/content/insert',
						    validate: function(value){
						    	if(value.replace(/\s/g,'') == '') {
							        return 'This field is required';
							    }
							    else {
							    	check_user(function(user_id){
							    		if(user_id === undefined){
							    			$('#session_expired').modal({ keyboard: false });
			                				$('#session_expired').modal('show');

			                				Cookies.remove(md5('_id'));
			                				Cookies.remove(md5('_token'));
							    		}
							    	});
							    }
							    	
						    },
						    success: function(response, newValue) {
						    	$('.sticky-sidebar').fadeIn(200);

					            return { 'newValue': newValue }
					        },
					        error: function(response){
					        	if(response.status == 401){
					        		$('#session_expired').modal({ keyboard: false });
			                		$('#session_expired').modal('show');

			                		Cookies.remove(md5('_id'));
			                		Cookies.remove(md5('_token'));
					        	}
					        },
						    title: contents[i].details,
						    params: {
						    	user_id: user_id,
						    	auth_token: Cookies.get(md5('_token'))
						    }
						});
		    		}
		    	});
	    	}
    	}
    });

	function check_user(callback){
		var user_id = Cookies.get(md5('_id'));

		return callback(user_id);
	}   
});

