$(document).ready(function (){
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
            $.post( 'http://localhost:9000/api/user/register', fields, function(data) {
                $('#results').html(data);
            });
        }
        else {
            $('#results').html(errors);
            //Put error message generator here...
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

        $.post( 'http://localhost:9000/api/user/auth', fields, function(data) {
            console.log(data);
        });
    }

    
});