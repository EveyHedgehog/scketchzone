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
                        commentSection.innerHTML = '<details><summary id ="' + itm.link + '" class= "kmnt">Comments!</summary><span class = "here" id="commento"/></details>';
                        s += commentSection.innerHTML;
						s += '</div>';
					}
				});
                
                const loadScript = (FILE_URL, async = true, type = "text/javascript") => {
                    return new Promise((resolve, reject) => {
                        try {
                           const scriptEle = document.createElement("script");
                            scriptEle.type = type;
                            
                            scriptEle.src = FILE_URL;
                            scriptEle.defer = true;
                            scriptEle.setAttribute('id', 'commtainer');
                            scriptEle.setAttribute('data-no-websockets', true);
                            scriptEle.setAttribute('crossorigin', 'anonymous');
                            scriptEle.setAttribute('data-auto-init', false);
                            scriptEle.setAttribute('data-page-id', "empty");
			
                            scriptEle.addEventListener("load", (ev) => {
                                resolve({
                                    status: true
                                });
                                
                                
                            });
                            

                            scriptEle.addEventListener("error", (ev) => {
                                reject({
                                   status: false, message: `Failed to load the script ${FILE_URL}`
                                });
                            });
                            
                            document.body.appendChild(scriptEle);
                        } catch (error) {
                            reject(error);
                        }
                    });
                    };

                commScript = loadScript("https://kmnt.scketchzone.com/js/commento.js") ;

                commScript.then( data  => {
                    console.log("Script loaded successfully", data);
                    
                   
                }).catch( err => {
                    console.error(err);
                });

                
                var bool = false;
				$("#" + id).append('<ul class="feedEkList">' + s + '</ul>');
                $(document).ready(function() {
                            $(".kmnt").unbind().click(function() {
                                bool = !bool;
                                if(!bool){
                                    //console.log($("#commtainer"));
                                    $(this).next(".here").attr("id","nocomm");
                                    $("#commtainer").attr("data-page-id", "empty");
                                }else{
                                    $(this).next(".here").attr("id","commento");
                                    $("#commtainer").attr("data-page-id", $(this).attr("id"));
                                    
                                   //$("#commtainer").reInit({
                                   //    pageId: $(this).attr("id"),
                                  //     idRoot: "commento"
                                  // });
                                }
                            });
                        });
              
			}
		});
	};
})(jQuery);
