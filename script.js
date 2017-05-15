$(document).ready( ()=> {
    
    Backbone.ajax({url: "https://api.myjson.com/bins/10w3ap", success: function(result){
        blimit =  (parseInt(result.length/4))
        for(let i in result){
            let b = (parseInt(i/4)+1);
            let pic = Math.floor((Math.random() * (result[i].images.length-1)));

            templateThumb(thumb(result[i].title, result[i].images[pic]), b);

            if(b > 1)  $('.block-'+b).hide()
        }
        checkbts();
    }});
    
});

var blimit;
var cblock = 1;


function thumb(name='unknow', url='http'){
    var md = Backbone.Model.extend({
        defaults:{ name, url }
    });
    return new md();
}

function templateThumb(model, num) {
    var mview = Backbone.View.extend({
        initialize:function(){
            let temp = `<div class='col-lg-3 col-md-3 col-sm-3 col-xs-3 block-${num}'> <a href='#' class='thumbnail'><img src='${model.toJSON().url}' alt='${model.toJSON().name}'></a></div>`;
            $('#gall').append(temp);
        }
    });
    this.view = new mview(model);
}

//navegation functions
function next(){
    if(cblock < blimit) nav('+'); 
}

function prev(){
    if(cblock > 1) nav('-');
}

function nav(op='-'){
    $('.block-'+cblock).fadeOut('fast', ()=>$('.block-'+cblock).fadeIn());
        (op=='+')? ++cblock: --cblock;
        checkbts();
}

function checkbts(){
    (cblock == blimit)? $('#next').prop("disabled",true) : $('#next').prop("disabled",false);
    (cblock == 1)? $('#prev').prop("disabled",true) : $('#prev').prop("disabled",false);
}