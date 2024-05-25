/*! FeedEk jQuery RSS/ATOM Feed Plugin v3.1.1
* https://jquery-plugins.net/FeedEk/FeedEk.html  https://github.com/enginkizil/FeedEk
* Author : Engin KIZIL */

(function ($) {
    
	$.fn.FeedEk = function (opt) {
		var def = $.extend({
			MaxCount: 5,
			ShowDesc: true,
			ShowPubDate: true,
			DescCharacterLimit: 0,
			TitleLinkTarget: "_blank",
			DateFormat: "",
			DateFormatLang: "en"
		}, opt);

		var id = $(this).attr("id"), s = "", dt;
		$("#" + id).empty();
		if (def.FeedUrl == undefined) return;
        
		$("#" + id).append('<img src="loader.gif"/>');
        
        
        setTimeout(function (){
            if (def.FeedUrl == ""){
                $("#" + id).append("<br>(Pssst, choose one of the buttons from the menu above...)");
            };
        }, 2500);
        
		$.ajax({
			url: "https://feed.jquery-plugins.net/load?url=" + encodeURIComponent(def.FeedUrl) + "&maxCount=" + def.MaxCount + "&dateCulture=" + def.DateFormatLang + "&dateFormat=" + def.DateFormat,
			dataType: "json",
			success: function (result) {
				$("#" + id).empty();
				if (result.data == null)
					return;
            
				$.each(result.data, function (e, itm) {
					s += '<li><div class="itemTitle"><a href="' + itm.link + '" target="' + def.TitleLinkTarget + '">' + itm.title + '</a></div>';
					
					
					if (def.ShowPubDate) {
						dt = new Date(itm.publishDate);
						s += '<div class="itemDate">';
						if ($.trim(def.DateFormat).length > 0) {
							s += itm.publishDateFormatted;
						}
						else {
							s += dt.toLocaleDateString();
						}
						s += '</div>';
					}
					if (def.ShowDesc) {
						s += '<div class="itemContent">';
						if (def.DescCharacterLimit > 0 && itm.description.length > def.DescCharacterLimit) {
							s += itm.description.substring(0, def.DescCharacterLimit) + '...';
						}
						else {
							s += itm.description;
						}
                        
                        const commentSection = document.createElement("div");
                        commentSection.innerHTML = '<details><summary id ="' + itm.link + '" class= "kmnt">Comments!</summary><p></p></details>';
                        s += commentSection.innerHTML;
						s += '</div>';
					}
				});
                
                 $(function () {
                    $('<script>')
                        .attr('type', 'text/javascript')
                        .attr("class", "commScript")
                        .attr("src", "https://kmnt.scketchzone.com/js/commento.js")
                        .attr("async", false)
                        .attr("defer", true)
                        .attr("data-no-websockets", true)
                        .attr("crossorigin", "anonymous")
                        .attr("data-css-override", "./css/commento.css")
                        .attr("data-page-id", "empty")
                        .appendTo("body");
                    });
                 
                
				$("#" + id).append('<ul class="feedEkList">' + s + '</ul>');
                $(document).ready(function() {
                        
                    $('.feedEkList li:first').append("<span id='commento'/>");
                    $("#commento").attr("style","display:none;");
                            
                    const allDetails = document.querySelectorAll('details');

                    allDetails.forEach(dtl=>{
                        dtl.addEventListener('toggle', toggleOpenOneOnly)
                    })

                    function toggleOpenOneOnly(e) {
                        if (this.open) {
                            allDetails.forEach(dtl=>{
                            if (dtl!=this && dtl.open) dtl.open = false
                            });
                        }
                    }
                            
                    $(".kmnt").unbind().click(function() {
                        //console.log($(this).next("p").parent().attr("open"));
                        if(!$(this).next("p").parent().attr("open")){
                            $("#commento").detach().appendTo($(this).next("p"));
                            window.commento.reInit({
                                pageId: $(this).attr("id"),
                            });
                            $("#commento").attr("style","display:show;");
                        };
                    });
                    
                });
              
			}
		});
	};
})(jQuery);
