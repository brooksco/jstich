var showNotice,adminMenu,columns,validateForm,screenMeta;(function(e){adminMenu={init:function(){},fold:function(){},restoreMenuState:function(){},toggle:function(){},favorites:function(){}};columns={init:function(){var t=this;e(".hide-column-tog","#adv-settings").click(function(){var n=e(this),r=n.val();n.prop("checked")?t.checked(r):t.unchecked(r);columns.saveManageColumnsState()})},saveManageColumnsState:function(){var t=this.hidden();e.post(ajaxurl,{action:"hidden-columns",hidden:t,screenoptionnonce:e("#screenoptionnonce").val(),page:pagenow})},checked:function(t){e(".column-"+t).show();this.colSpanChange(1)},unchecked:function(t){e(".column-"+t).hide();this.colSpanChange(-1)},hidden:function(){return e(".manage-column").filter(":hidden").map(function(){return this.id}).get().join(",")},useCheckboxesForHidden:function(){this.hidden=function(){return e(".hide-column-tog").not(":checked").map(function(){var e=this.id;return e.substring(e,e.length-5)}).get().join(",")}},colSpanChange:function(t){var n=e("table").find(".colspanchange"),r;if(!n.length)return;r=parseInt(n.attr("colspan"),10)+t;n.attr("colspan",r.toString())}};e(document).ready(function(){columns.init()});validateForm=function(t){return!e(t).find(".form-required").filter(function(){return e("input:visible",this).val()==""}).addClass("form-invalid").find("input:visible").change(function(){e(this).closest(".form-invalid").removeClass("form-invalid")}).size()};showNotice={warn:function(){var e=commonL10n.warnDelete||"";return confirm(e)?!0:!1},note:function(e){alert(e)}};screenMeta={element:null,toggles:null,page:null,init:function(){this.element=e("#screen-meta");this.toggles=e(".screen-meta-toggle a");this.page=e("#wpcontent");this.toggles.click(this.toggleEvent)},toggleEvent:function(t){var n=e(this.href.replace(/.+#/,"#"));t.preventDefault();if(!n.length)return;n.is(":visible")?screenMeta.close(n,e(this)):screenMeta.open(n,e(this))},open:function(t,n){e(".screen-meta-toggle").not(n.parent()).css("visibility","hidden");t.parent().show();t.slideDown("fast",function(){t.focus();n.addClass("screen-meta-active").attr("aria-expanded",!0)})},close:function(t,n){t.slideUp("fast",function(){n.removeClass("screen-meta-active").attr("aria-expanded",!1);e(".screen-meta-toggle").css("visibility","");t.parent().hide()})}};e(".contextual-help-tabs").delegate("a","click focus",function(t){var n=e(this),r;t.preventDefault();if(n.is(".active a"))return!1;e(".contextual-help-tabs .active").removeClass("active");n.parent("li").addClass("active");r=e(n.attr("href"));e(".help-tab-content").not(r).removeClass("active").hide();r.addClass("active").show()});e(document).ready(function(){var t=!1,n,r,i,s,o=e("#adminmenu"),u,a=e("input.current-page"),f=a.val();o.on("click.wp-submenu-head",".wp-submenu-head",function(t){e(t.target).parent().siblings("a").get(0).click()});e("#collapse-menu").on("click.collapse-menu",function(t){var n=e(document.body),r;e("#adminmenu div.wp-submenu").css("margin-top","");r=navigator.userAgent.indexOf("AppleWebKit/")>-1?e(window).width():window.innerWidth;if(r&&r<900)if(n.hasClass("auto-fold")){n.removeClass("auto-fold").removeClass("folded");setUserSetting("unfold",1);setUserSetting("mfold","o")}else{n.addClass("auto-fold");setUserSetting("unfold",0)}else if(n.hasClass("folded")){n.removeClass("folded");setUserSetting("mfold","o")}else{n.addClass("folded");setUserSetting("mfold","f")}});if("ontouchstart"in window||/IEMobile\/[1-9]/.test(navigator.userAgent)){u=/Mobile\/.+Safari/.test(navigator.userAgent)?"touchstart":"click";e(document.body).on(u+".wp-mobile-hover",function(t){e(t.target).closest("#adminmenu").length||o.find("li.wp-has-submenu.opensub").removeClass("opensub")});o.find("a.wp-has-submenu").on(u+".wp-mobile-hover",function(t){var n=e(this),r=n.parent();if(!r.hasClass("opensub")&&(!r.hasClass("wp-menu-open")||r.width()<40)){t.preventDefault();o.find("li.opensub").removeClass("opensub");r.addClass("opensub")}})}o.find("li.wp-has-submenu").hoverIntent({over:function(t){var n,r,i,s,u=e(this).find(".wp-submenu"),a,f,l,c=parseInt(u.css("top"),10);if(isNaN(c)||c>-5)return;a=e(this).offset().top;f=e(window).scrollTop();l=a-f-30;n=a+u.height()+1;r=e("#wpwrap").height();i=60+n-r;s=e(window).height()+f-15;s<n-i&&(i=n-s);i>l&&(i=l);i>1?u.css("margin-top","-"+i+"px"):u.css("margin-top","");o.find("li.menu-top").removeClass("opensub");e(this).addClass("opensub")},out:function(){e(this).removeClass("opensub").find(".wp-submenu").css("margin-top","")},timeout:200,sensitivity:7,interval:90});o.on("focus.adminmenu",".wp-submenu a",function(t){e(t.target).closest("li.menu-top").addClass("opensub")}).on("blur.adminmenu",".wp-submenu a",function(t){e(t.target).closest("li.menu-top").removeClass("opensub")});e("div.wrap h2:first").nextAll("div.updated, div.error").addClass("below-h2");e("div.updated, div.error").not(".below-h2, .inline").insertAfter(e("div.wrap h2:first"));screenMeta.init();e("tbody").children().children(".check-column").find(":checkbox").click(function(o){if("undefined"==o.shiftKey)return!0;if(o.shiftKey){if(!t)return!0;n=e(t).closest("form").find(":checkbox");r=n.index(t);i=n.index(this);s=e(this).prop("checked");0<r&&0<i&&r!=i&&n.slice(r,i).prop("checked",function(){return e(this).closest("tr").is(":visible")?s:!1})}t=this;var u=e(this).closest("tbody").find(":checkbox").filter(":visible").not(":checked");e(this).closest("table").children("thead, tfoot").find(":checkbox").prop("checked",function(){return 0==u.length});return!0});e("thead, tfoot").find(".check-column :checkbox").click(function(t){var n=e(this).prop("checked"),r="undefined"==typeof toggleWithKeyboard?!1:toggleWithKeyboard,i=t.shiftKey||r;e(this).closest("table").children("tbody").filter(":visible").children().children(".check-column").find(":checkbox").prop("checked",function(){return e(this).is(":hidden")?!1:i?e(this).prop("checked"):n?!0:!1});e(this).closest("table").children("thead,  tfoot").filter(":visible").children().children(".check-column").find(":checkbox").prop("checked",function(){return i?!1:n?!0:!1})});e("#default-password-nag-no").click(function(){setUserSetting("default_password_nag","hide");e("div.default-password-nag").hide();return!1});e("#newcontent").bind("keydown.wpevent_InsertTab",function(t){var n=t.target,r,i,s,o,u;if(t.keyCode==27){e(n).data("tab-out",!0);return}if(t.keyCode!=9||t.ctrlKey||t.altKey||t.shiftKey)return;if(e(n).data("tab-out")){e(n).data("tab-out",!1);return}r=n.selectionStart;i=n.selectionEnd;s=n.value;try{this.lastKey=9}catch(a){}if(document.selection){n.focus();u=document.selection.createRange();u.text="	"}else if(r>=0){o=this.scrollTop;n.value=s.substring(0,r).concat("	",s.substring(i));n.selectionStart=n.selectionEnd=r+1;this.scrollTop=o}t.stopPropagation&&t.stopPropagation();t.preventDefault&&t.preventDefault()});e("#newcontent").bind("blur.wpevent_InsertTab",function(e){this.lastKey&&9==this.lastKey&&this.focus()});a.length&&a.closest("form").submit(function(t){e('select[name="action"]').val()==-1&&e('select[name="action2"]').val()==-1&&a.val()==f&&a.val("1")});e("#contextual-help-link, #show-settings-link").on("focus.scroll-into-view",function(e){e.target.scrollIntoView&&e.target.scrollIntoView(!1)});(function(){function i(){t.prop("disabled",""===n.map(function(){return e(this).val()}).get().join(""))}var t,n,r=e("form.wp-upload-form");if(!r.length)return;t=r.find('input[type="submit"]');n=r.find('input[type="file"]');i();n.on("change",i)})()});e(document).bind("wp_CloseOnEscape",function(e,t){if(typeof t.cb!="function")return;(typeof t.condition!="function"||t.condition())&&t.cb();return!0})})(jQuery);