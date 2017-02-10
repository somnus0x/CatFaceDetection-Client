var $ = jQuery.noConflict();



// Progress Bar

$(document).ready(function ($) {
    "use strict";

    $('.skill-shortcode').appear(function () {
        $('.progress').each(function () {
            $('.progress-bar').css('width',  function () { return ($(this).attr('data-percentage') + '%')});
        });
    }, {accY: -100});


});

//Owl Carousel
$(document).ready(function() {

    $("#owl-demo").owlCarousel({

        slideSpeed : 300,
        paginationSpeed : 400,
        singleItem:true

        // "singleItem:true" is a shortcut for:
        // items : 1,
        // itemsDesktop : false,
        // itemsDesktopSmall : false,
        // itemsTablet: false,
        // itemsMobile : false

    });

});

function foo(){
    $("#input_image").hide();
    $("#result_image").show();
}

function bar(){
    $("#input_image").show();
    $("#result_image").hide();
}

var loadFile = function(e) {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img,0,0);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
};

function submit(){
    var image = $("#choose_image")[0];
    if(image.files[0]){
        var data = new FormData();
        data.append('file', image.files[0])
        submitFile(data);
    }
}

function submitFile(formData){
    $.ajax({
        url: '/api/detect/',  //server script to process data
        type: 'POST',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        complete: function(response, textStatus){
            var detected = response.responseJSON;
            console.log(detected);
            detected.forEach(function(rect){
                drawRect(rect);
            });
        }
    });
}

function drawRect(detected){
    var x = detected.x,
    y = detected.y,
    height = detected.height,
    width = detected.width;
    console.log(x, y)
    console.log(height, width)
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#ff0000';
    ctx.strokeRect(x, y, height, width);
}
