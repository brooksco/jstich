/* global tinymce, QTags */// send html to the post editor
var wpActiveEditor,send_to_editor;send_to_editor=function(e){var t,n=typeof tinymce!="undefined",r=typeof QTags!="undefined";if(!wpActiveEditor){if(n&&tinymce.activeEditor){t=tinymce.activeEditor;wpActiveEditor=t.id}else if(!r)return!1}else n&&(t=tinymce.get(wpActiveEditor));t&&!t.isHidden()?t.execCommand("mceInsertContent",!1,e):r?QTags.insertContent(e):document.getElementById(wpActiveEditor).value+=e;if(window.tb_remove)try{window.tb_remove()}catch(i){}};var tb_position;(function(e){tb_position=function(){var t=e("#TB_window"),n=e(window).width(),r=e(window).height(),i=720<n?720:n,s=0;e("#wpadminbar").length&&(s=parseInt(e("#wpadminbar").css("height"),10));if(t.size()){t.width(i-50).height(r-45-s);e("#TB_iframeContent").width(i-50).height(r-75-s);t.css({"margin-left":"-"+parseInt((i-50)/2,10)+"px"});typeof document.body.style.maxWidth!="undefined"&&t.css({top:20+s+"px","margin-top":"0"})}return e("a.thickbox").each(function(){var t=e(this).attr("href");if(!t)return;t=t.replace(/&width=[0-9]+/g,"");t=t.replace(/&height=[0-9]+/g,"");e(this).attr("href",t+"&width="+(i-80)+"&height="+(r-85-s))})};e(window).resize(function(){tb_position()})})(jQuery);