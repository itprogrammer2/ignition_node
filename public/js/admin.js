$(document).ready(function (){
    
    setTimeout(function(){
        fetch_drafts(); 
    }, 1000);
        

    $('#apply_changes_btn').on('click', function(){
        check_user(function(user_id){
            if(user_id === undefined){
                $('#session_expired').modal({ keyboard: false });
                $('#session_expired').modal('show');
            }
            else {
                $.post('http://ignition.biz:9001/api/content/update', { user_id : Cookies.get(md5('_id')) }, function(data){
                    if(data.status == true){
                        $('.sticky-sidebar').fadeOut(200);
                    }
                });
            }
        });        
    });

    $('#cancel_changes_btn').on('click', function(){
        check_user(function(user_id){
            if(user_id === undefined){
                $('#session_expired').modal({ keyboard: false });
                $('#session_expired').modal('show');
            }
            else {
                $.post('http://ignition.biz:9001/api/content/revert', { user_id : Cookies.get(md5('_id')) }, function(data){
                    if(data.status == true){
                        $('.sticky-sidebar').fadeOut(200);
                    }
                });
            }
        });
    });

    function fetch_drafts(){
        $.post('http://ignition.biz:9001/api/content/drafts', { user_id : Cookies.get(md5('_id')) }, function(data){
            if(data.status == true){
                $('.sticky-sidebar').fadeIn(200);

                var contents = data.data;

                for(var i in contents){
                    $('#' + contents[i].name).editable('setValue', contents[i].details, true);
                }
            }
        });
    }

    function check_user(callback){
        var user_id = Cookies.get(md5('_id'));

        return callback(user_id);
    }
});