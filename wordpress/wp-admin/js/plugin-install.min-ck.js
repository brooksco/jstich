var tb_position;jQuery(document).ready(function(e){tb_position=function(){var t=e("#TB_window"),n=e(window).width(),r=e(window).height()-(n>850?60:20),i=n>850?830:n-20;return t.size()&&(t.width(i).height(r),e("#TB_iframeContent").width(i).height(r),t.css({"margin-left":"-"+parseInt(i/2,10)+"px"}),"undefined"!=typeof document.body.style.maxWidth&&t.css({top:(n>850?30:10)+"px","margin-top":"0"})),e("a.thickbox").each(function(){var t=e(this).attr("href");t&&(t=t.replace(/&width=[0-9]+/g,""),t=t.replace(/&height=[0-9]+/g,""),e(this).attr("href",t+"&width="+i+"&height="+r))})},e(window).resize(function(){tb_position()}),e(".plugins").on("click","a.thickbox",function(){return tb_click.call(this),e("#TB_title").css({"background-color":"#222",color:"#cfcfcf"}),e("#TB_ajaxWindowTitle").html("<strong>"+plugininstallL10n.plugin_information+"</strong>&nbsp;"+e(this).attr("title")),!1}),e("#plugin-information-tabs a").click(function(t){var n=e(this).attr("name");t.preventDefault(),e("#plugin-information-tabs a.current").removeClass("current"),e(this).addClass("current"),e("#section-holder div.section").hide(),e("#section-"+n).show()}),e("a.install-now").click(function(){return confirm(plugininstallL10n.ays)})});