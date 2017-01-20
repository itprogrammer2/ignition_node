var panels = [];

function togglepanel(panel){
    if(!in_array(panels, panel)){
        panels.push(panel);
    }
    else {
        for(var i in panels){
            if(panels[i] == panel){
                panels.splice(i, 1);
            }
        }
    }
}

function in_array(arr, str){
    var found=false;
    for(var i in arr){
        if(arr[i] == str){
            found = true
        }
    }

    return found;
}

$(document).ready(function (){    

    

  // $('#submitinterest').on('click', function(data){
  //   $.post('/user/interest', { interests : panels.join(','), customer_id : $('#hidden_customerid').val() }, function(data){
  //     $('#Register_thankyou').modal('toggle');
  //   });
  // });

  // $('#close_thankyou').on('click', function(data){
  //   window.location = '/';
  // });

  // $('.required-icon').tooltip({
  //     placement: 'left',
  //     title: 'Required field'
  // });

    var Accordion = function(el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;

        // Variables privadas
        var links = this.el.find('.link');
        // Evento
        links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
    }

    Accordion.prototype.dropdown = function(e) {
        var $el = e.data.el;
            $this = $(this),
            $next = $this.next();

        $next.slideToggle();
        $this.parent().toggleClass('open');

        if (!e.data.multiple) {
            $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
        };
    } 

    var accordion = new Accordion($('#accordion'), false);

    $(".panel-choices").click(function(){
        $(this).toggleClass("checked");
    });

    // $.backstretch("../images/sketch_bg.png");

    $('.owl-carousel').owlCarousel({
        items:1,
        autoplay: true,
        loop:true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        smartSpeed:1500
    });
});