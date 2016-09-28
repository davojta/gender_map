// JavaScript Document

$(document).ready(function(){
	$('a.lnk-nav-second').click(function()
	{
		$(this).parent().toggleClass('visible');
	});
});

$(document).click(function(event){ 
    if($(event.target).closest('a.lnk-nav-second').length==0)
        $('a.lnk-nav-second').parent().removeClass('visible');
});

