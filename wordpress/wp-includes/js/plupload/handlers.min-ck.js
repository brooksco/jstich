function fileQueued(e){jQuery(".media-blank").remove();var t=jQuery("#media-items").children(),n=post_id||0;1==t.length&&t.removeClass("open").find(".slidetoggle").slideUp(200),jQuery('<div class="media-item">').attr("id","media-item-"+e.id).addClass("child-of-"+n).append('<div class="progress"><div class="percent">0%</div><div class="bar"></div></div>',jQuery('<div class="filename original">').text(" "+e.name)).appendTo(jQuery("#media-items")),jQuery("#insert-gallery").prop("disabled",!0)}function uploadStart(){try{"undefined"!=typeof topWin.tb_remove&&topWin.jQuery("#TB_overlay").unbind("click",topWin.tb_remove)}catch(e){}return!0}function uploadProgress(e,t){var n=jQuery("#media-item-"+t.id);jQuery(".bar",n).width(200*t.loaded/t.size),jQuery(".percent",n).html(t.percent+"%")}function fileUploading(e,t){var n=104857600,r=parseInt(e.settings.max_file_size,10);r>n&&t.size>n&&setTimeout(function(){t.status<3&&0===t.loaded&&(wpFileError(t,pluploadL10n.big_upload_failed.replace("%1$s",'<a class="uploader-html" href="#">').replace("%2$s","</a>")),e.stop(),e.removeFile(t),e.start())},1e4)}function updateMediaForm(){var e=jQuery("#media-items").children();1==e.length?(e.addClass("open").find(".slidetoggle").show(),jQuery(".insert-gallery").hide()):e.length>1&&(e.removeClass("open"),jQuery(".insert-gallery").show()),e.not(".media-blank").length>0?jQuery(".savebutton").show():jQuery(".savebutton").hide()}function uploadSuccess(e,t){var n=jQuery("#media-item-"+e.id);return t=t.replace(/^<pre>(\d+)<\/pre>$/,"$1"),t.match(/media-upload-error|error-div/)?void n.html(t):(jQuery(".percent",n).html(pluploadL10n.crunching),prepareMediaItem(e,t),updateMediaForm(),void (post_id&&n.hasClass("child-of-"+post_id)&&jQuery("#attachments-count").text(1*jQuery("#attachments-count").text()+1)))}function setResize(e){e?window.resize_width&&window.resize_height?uploader.settings.resize={enabled:!0,width:window.resize_width,height:window.resize_height,quality:100}:uploader.settings.multipart_params.image_resize=!0:delete uploader.settings.multipart_params.image_resize}function prepareMediaItem(e,t){var n="undefined"==typeof shortform?1:2,r=jQuery("#media-item-"+e.id);2==n&&shortform>2&&(n=shortform);try{"undefined"!=typeof topWin.tb_remove&&topWin.jQuery("#TB_overlay").click(topWin.tb_remove)}catch(i){}isNaN(t)||!t?(r.append(t),prepareMediaItemInit(e)):r.load("async-upload.php",{attachment_id:t,fetch:n},function(){prepareMediaItemInit(e),updateMediaForm()})}function prepareMediaItemInit(e){var t=jQuery("#media-item-"+e.id);jQuery(".thumbnail",t).clone().attr("class","pinkynail toggle").prependTo(t),jQuery(".filename.original",t).replaceWith(jQuery(".filename.new",t)),jQuery("a.delete",t).click(function(){return jQuery.ajax({url:ajaxurl,type:"post",success:deleteSuccess,error:deleteError,id:e.id,data:{id:this.id.replace(/[^0-9]/g,""),action:"trash-post",_ajax_nonce:this.href.replace(/^.*wpnonce=/,"")}}),!1}),jQuery("a.undo",t).click(function(){return jQuery.ajax({url:ajaxurl,type:"post",id:e.id,data:{id:this.id.replace(/[^0-9]/g,""),action:"untrash-post",_ajax_nonce:this.href.replace(/^.*wpnonce=/,"")},success:function(){var t,n=jQuery("#media-item-"+e.id);(t=jQuery("#type-of-"+e.id).val())&&jQuery("#"+t+"-counter").text(jQuery("#"+t+"-counter").text()-0+1),post_id&&n.hasClass("child-of-"+post_id)&&jQuery("#attachments-count").text(jQuery("#attachments-count").text()-0+1),jQuery(".filename .trashnotice",n).remove(),jQuery(".filename .title",n).css("font-weight","normal"),jQuery("a.undo",n).addClass("hidden"),jQuery(".menu_order_input",n).show(),n.css({backgroundColor:"#ceb"}).animate({backgroundColor:"#fff"},{queue:!1,duration:500,complete:function(){jQuery(this).css({backgroundColor:""})}}).removeClass("undo")}}),!1}),jQuery("#media-item-"+e.id+".startopen").removeClass("startopen").addClass("open").find("slidetoggle").fadeIn()}function wpQueueError(e){jQuery("#media-upload-error").show().html('<div class="error"><p>'+e+"</p></div>")}function wpFileError(e,t){itemAjaxError(e.id,t)}function itemAjaxError(e,t){var n=jQuery("#media-item-"+e),r=n.find(".filename").text(),i=n.data("last-err");i!=e&&n.html('<div class="error-div"><a class="dismiss" href="#">'+pluploadL10n.dismiss+"</a><strong>"+pluploadL10n.error_uploading.replace("%s",jQuery.trim(r))+"</strong> "+t+"</div>").data("last-err",e)}function deleteSuccess(e){var t,n,r;return"-1"==e?itemAjaxError(this.id,"You do not have permission. Has your session expired?"):"0"==e?itemAjaxError(this.id,"Could not be deleted. Has it been deleted already?"):(n=this.id,r=jQuery("#media-item-"+n),(t=jQuery("#type-of-"+n).val())&&jQuery("#"+t+"-counter").text(jQuery("#"+t+"-counter").text()-1),post_id&&r.hasClass("child-of-"+post_id)&&jQuery("#attachments-count").text(jQuery("#attachments-count").text()-1),1==jQuery("form.type-form #media-items").children().length&&jQuery(".hidden","#media-items").length>0&&(jQuery(".toggle").toggle(),jQuery(".slidetoggle").slideUp(200).siblings().removeClass("hidden")),jQuery(".toggle",r).toggle(),jQuery(".slidetoggle",r).slideUp(200).siblings().removeClass("hidden"),r.css({backgroundColor:"#faa"}).animate({backgroundColor:"#f4f4f4"},{queue:!1,duration:500}).addClass("undo"),jQuery(".filename:empty",r).remove(),jQuery(".filename .title",r).css("font-weight","bold"),jQuery(".filename",r).append('<span class="trashnotice"> '+pluploadL10n.deleted+" </span>").siblings("a.toggle").hide(),jQuery(".filename",r).append(jQuery("a.undo",r).removeClass("hidden")),void jQuery(".menu_order_input",r).hide())}function deleteError(){}function uploadComplete(){jQuery("#insert-gallery").prop("disabled",!1)}function switchUploader(e){e?(deleteUserSetting("uploader"),jQuery(".media-upload-form").removeClass("html-uploader"),"object"==typeof uploader&&uploader.refresh()):(setUserSetting("uploader","1"),jQuery(".media-upload-form").addClass("html-uploader"))}function uploadError(e,t,n,r){var i,s=104857600;switch(t){case plupload.FAILED:wpFileError(e,pluploadL10n.upload_failed);break;case plupload.FILE_EXTENSION_ERROR:wpFileError(e,pluploadL10n.invalid_filetype);break;case plupload.FILE_SIZE_ERROR:uploadSizeError(r,e);break;case plupload.IMAGE_FORMAT_ERROR:wpFileError(e,pluploadL10n.not_an_image);break;case plupload.IMAGE_MEMORY_ERROR:wpFileError(e,pluploadL10n.image_memory_exceeded);break;case plupload.IMAGE_DIMENSIONS_ERROR:wpFileError(e,pluploadL10n.image_dimensions_exceeded);break;case plupload.GENERIC_ERROR:wpQueueError(pluploadL10n.upload_failed);break;case plupload.IO_ERROR:i=parseInt(r.settings.filters.max_file_size,10),i>s&&e.size>s?wpFileError(e,pluploadL10n.big_upload_failed.replace("%1$s",'<a class="uploader-html" href="#">').replace("%2$s","</a>")):wpQueueError(pluploadL10n.io_error);break;case plupload.HTTP_ERROR:wpQueueError(pluploadL10n.http_error);break;case plupload.INIT_ERROR:jQuery(".media-upload-form").addClass("html-uploader");break;case plupload.SECURITY_ERROR:wpQueueError(pluploadL10n.security_error);break;default:wpFileError(e,pluploadL10n.default_error)}}function uploadSizeError(e,t,n){var r;r=n?pluploadL10n.big_upload_queued.replace("%s",t.name)+" "+pluploadL10n.big_upload_failed.replace("%1$s",'<a class="uploader-html" href="#">').replace("%2$s","</a>"):pluploadL10n.file_exceeds_size_limit.replace("%s",t.name),jQuery("#media-items").append('<div id="media-item-'+t.id+'" class="media-item error"><p>'+r+"</p></div>"),e.removeFile(t)}var topWin=window.dialogArguments||opener||parent||top,uploader,uploader_init;jQuery(document).ready(function(e){e(".media-upload-form").bind("click.uploader",function(t){var n,r,i=e(t.target);i.is('input[type="radio"]')?(n=i.closest("tr"),n.hasClass("align")?setUserSetting("align",i.val()):n.hasClass("image-size")&&setUserSetting("imgsize",i.val())):i.is("button.button")?(r=t.target.className||"",r=r.match(/url([^ '"]+)/),r&&r[1]&&(setUserSetting("urlbutton",r[1]),i.siblings(".urlfield").val(i.data("link-url")))):i.is("a.dismiss")?i.parents(".media-item").fadeOut(200,function(){e(this).remove()}):i.is(".upload-flash-bypass a")||i.is("a.uploader-html")?(e("#media-items, p.submit, span.big-file-warning").css("display","none"),switchUploader(0),t.preventDefault()):i.is(".upload-html-bypass a")?(e("#media-items, p.submit, span.big-file-warning").css("display",""),switchUploader(1),t.preventDefault()):i.is("a.describe-toggle-on")?(i.parent().addClass("open"),i.siblings(".slidetoggle").fadeIn(250,function(){var t,n,r=e(window).scrollTop(),i=e(window).height(),s=e(this).offset().top,o=e(this).height();i&&s&&o&&(t=s+o,n=r+i,t>n&&(s-r>t-n?window.scrollBy(0,t-n+10):window.scrollBy(0,s-r-40)))}),t.preventDefault()):i.is("a.describe-toggle-off")&&(i.siblings(".slidetoggle").fadeOut(250,function(){i.parent().removeClass("open")}),t.preventDefault())}),uploader_init=function(){var t=-1!=navigator.userAgent.indexOf("Trident/")||-1!=navigator.userAgent.indexOf("MSIE ");t||"flash"!==plupload.predictRuntime(wpUploaderInit)||wpUploaderInit.required_features&&wpUploaderInit.required_features.hasOwnProperty("send_binary_string")||(wpUploaderInit.required_features=wpUploaderInit.required_features||{},wpUploaderInit.required_features.send_binary_string=!0),uploader=new plupload.Uploader(wpUploaderInit),e("#image_resize").bind("change",function(){var t=e(this).prop("checked");setResize(t),t?setUserSetting("upload_resize","1"):deleteUserSetting("upload_resize")}),uploader.bind("Init",function(t){var n=e("#plupload-upload-ui");setResize(getUserSetting("upload_resize",!1)),t.features.dragdrop&&!e(document.body).hasClass("mobile")?(n.addClass("drag-drop"),e("#drag-drop-area").bind("dragover.wp-uploader",function(){n.addClass("drag-over")}).bind("dragleave.wp-uploader, drop.wp-uploader",function(){n.removeClass("drag-over")})):(n.removeClass("drag-drop"),e("#drag-drop-area").unbind(".wp-uploader")),"html4"===t.runtime&&e(".upload-flash-bypass").hide()}),uploader.init(),uploader.bind("FilesAdded",function(t,n){e("#media-upload-error").html(""),uploadStart(),plupload.each(n,function(e){fileQueued(e)}),t.refresh(),t.start()}),uploader.bind("UploadFile",function(e,t){fileUploading(e,t)}),uploader.bind("UploadProgress",function(e,t){uploadProgress(e,t)}),uploader.bind("Error",function(e,t){uploadError(t.file,t.code,t.message,e),e.refresh()}),uploader.bind("FileUploaded",function(e,t,n){uploadSuccess(t,n.response)}),uploader.bind("UploadComplete",function(){uploadComplete()})},"object"==typeof wpUploaderInit&&uploader_init()});