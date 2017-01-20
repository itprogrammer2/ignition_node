$(document).ready(function (){
    var hostname = window.location.hostname;

    $("#email_address").verimail({
        messageElement: "span#email_msg"
    });

    $('#register').on('click', function(e){
        register();
    });

    $('#signin').on('click', function(e){
        signin();
    });

    function register(){
        var fields = {
            name_of_business: '',
            nature_of_business: '',
            contact_person: '',
            contact_number: '',
            email_address: ''
        };

        var errors=[];
        for(var i in fields){
            var fld = $('#'+i).val();
            if(fld.replace(/\s/g, '') == ''){
                errors.push({
                                field: i, 
                                msg: 'Required field.'
                            });
            }
            else {
                fields[i] = fld;
            }
        }

        if(!validateEmail(fields.email_address)){
            errors.push({
                            field: 'email_address',
                            msg: 'Invalid Email.'
                        });
        }

        if(errors.length == 0){
            $.post( 'http://'+hostname+':9001/api/user/register', fields, function(data) {
                $('#results').html(data);
            });
        }
        else {
            $('#results').html(errors);
            /* Put error message generator here... */
        }
    }

    function validateEmail(email){
        var z = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if(z.test(email)){
            return true;
        }
        else {
            return false;
        }
    }

    function signin(){
        var fields = {
            email: '',
            password: '',
            stay_signin: ''
        };

        var errors=[];
        for(var i in fields){
            var fld = $('#'+i).val();
           
            if(fld.replace(/\s/g, '') == ''){
                errors.push({
                                field: i, 
                                msg: 'Required field.'
                            });
            }
            else {
                if(i == "stay_signin"){
                    fld = $('#'+i+':checked').is(':checked');
                }
                
                fields[i] = fld;
            }
        }
        
        $.post( 'http://'+hostname+':9001/api/user/auth', fields, function(data) {
            if(data.status){
                // removed because auth_token has its own expiration
                // var duration = (1 / 24); /* default is 1 hour only */

                // if(fields.stay_signin == true){
                //     duration = 1; /* day */
                // }

                var expiration = new Date(data.data[0].auth_token_expiration);
                // Cookies.set(md5('_id'), data.data[0].profile_id, { expires : expiration, path : '' });
                // Cookies.set(md5('_token'), data.data[0].auth_token, { expires : expiration, path : '' });
                $.cookie(md5('_id'), data.data[0].profile_id, { expires: expiration, path: '/' });
                $.cookie(md5('_token'), data.data[0].auth_token, { expires: expiration, path: '/' });


                getUserProfile(data.data[0]);

            }
            else {
                // login attempt failed
                console.log('else');
            }    
        });
    }

    function getUserProfile(user_data){
        $.post( 'http://'+hostname+':9001/api/user', user_data, function(data) {
            if(data.status){
                //Cookies.set(md5('_profile'), data.data[0], { expires : new Date(user_data.auth_token_expiration), path : '' });
                $.cookie(md5('_profile'), data.data[0], { expires: new Date(user_data.auth_token_expiration), path: '/' });

                console.log($.cookie(md5('_id')));
                console.log($.cookie(md5('_token')));
                console.log($.cookie(md5('_profile')));
                //window.location = '/';
            }
            else {

                //there was an error fetching user profile
                console.log('else');
            }    
        });
    }

    
});