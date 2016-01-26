/* global _wpMediaModelsL10n:false */window.wp=window.wp||{};(function(e){var t,n,r,i,s,o,u;u=wp.media=function(e){var t=u.view.MediaFrame,n;if(!t)return;e=_.defaults(e||{},{frame:"select"});"select"===e.frame&&t.Select?n=new t.Select(e):"post"===e.frame&&t.Post?n=new t.Post(e):"image"===e.frame&&t.ImageDetails?n=new t.ImageDetails(e):"audio"===e.frame&&t.AudioDetails?n=new t.AudioDetails(e):"video"===e.frame&&t.VideoDetails&&(n=new t.VideoDetails(e));delete e.frame;u.frame=n;return n};_.extend(u,{model:{},view:{},controller:{},frames:{}});o=u.model.l10n=typeof _wpMediaModelsL10n=="undefined"?{}:_wpMediaModelsL10n;u.model.settings=o.settings||{};delete o.settings;s=function(e,t,n,r){return _.isEqual(e,t)?n===r?0:n>r?-1:1:e>t?-1:1};_.extend(u,{template:wp.template,post:wp.ajax.post,ajax:wp.ajax.send,fit:function(e){var t=e.width,n=e.height,r=e.maxWidth,i=e.maxHeight,s;!_.isUndefined(r)&&!_.isUndefined(i)?s=t/n>r/i?"width":"height":_.isUndefined(i)?s="width":_.isUndefined(r)&&n>i&&(s="height");return"width"===s&&t>r?{width:r,height:Math.round(r*n/t)}:"height"===s&&n>i?{width:Math.round(i*t/n),height:i}:{width:t,height:n}},truncate:function(e,t,n){t=t||30;n=n||"&hellip;";return e.length<=t?e:e.substr(0,t/2)+n+e.substr(-1*t/2)}});u.attachment=function(e){return t.get(e)};t=u.model.Attachment=Backbone.Model.extend({sync:function(t,n,r){if(_.isUndefined(this.id))return e.Deferred().rejectWith(this).promise();if("read"===t){r=r||{};r.context=this;r.data=_.extend(r.data||{},{action:"get-attachment",id:this.id});return u.ajax(r)}if("update"===t){if(!this.get("nonces")||!this.get("nonces").update)return e.Deferred().rejectWith(this).promise();r=r||{};r.context=this;r.data=_.extend(r.data||{},{action:"save-attachment",id:this.id,nonce:this.get("nonces").update,post_id:u.model.settings.post.id});if(n.hasChanged()){r.data.changes={};_.each(n.changed,function(e,t){r.data.changes[t]=this.get(t)},this)}return u.ajax(r)}if("delete"===t){r=r||{};r.wait||(this.destroyed=!0);r.context=this;r.data=_.extend(r.data||{},{action:"delete-post",id:this.id,_wpnonce:this.get("nonces")["delete"]});return u.ajax(r).done(function(){this.destroyed=!0}).fail(function(){this.destroyed=!1})}return Backbone.Model.prototype.sync.apply(this,arguments)},parse:function(e){if(!e)return e;e.date=new Date(e.date);e.modified=new Date(e.modified);return e},saveCompat:function(t,n){var r=this;return!this.get("nonces")||!this.get("nonces").update?e.Deferred().rejectWith(this).promise():u.post("save-attachment-compat",_.defaults({id:this.id,nonce:this.get("nonces").update,post_id:u.model.settings.post.id},t)).done(function(e,t,i){r.set(r.parse(e,i),n)})}},{create:function(e){return n.all.push(e)},get:_.memoize(function(e,t){return n.all.push(t||{id:e})})});i=u.model.PostImage=Backbone.Model.extend({initialize:function(n){this.attachment=!1;if(n.attachment_id){this.attachment=t.get(n.attachment_id);if(this.attachment.get("url")){this.dfd=e.Deferred();this.dfd.resolve()}else this.dfd=this.attachment.fetch();this.bindAttachmentListeners()}this.on("change:link",this.updateLinkUrl,this);this.on("change:size",this.updateSize,this);this.setLinkTypeFromUrl();this.setAspectRatio();this.set("originalUrl",n.url)},bindAttachmentListeners:function(){this.listenTo(this.attachment,"sync",this.setLinkTypeFromUrl);this.listenTo(this.attachment,"sync",this.setAspectRatio);this.listenTo(this.attachment,"change",this.updateSize)},changeAttachment:function(e,t){this.stopListening(this.attachment);this.attachment=e;this.bindAttachmentListeners();this.set("attachment_id",this.attachment.get("id"));this.set("caption",this.attachment.get("caption"));this.set("alt",this.attachment.get("alt"));this.set("size",t.get("size"));this.set("align",t.get("align"));this.set("link",t.get("link"));this.updateLinkUrl();this.updateSize()},setLinkTypeFromUrl:function(){var e=this.get("linkUrl"),t;if(!e){this.set("link","none");return}t="custom";this.attachment?this.attachment.get("url")===e?t="file":this.attachment.get("link")===e&&(t="post"):this.get("url")===e&&(t="file");this.set("link",t)},updateLinkUrl:function(){var e=this.get("link"),t;switch(e){case"file":this.attachment?t=this.attachment.get("url"):t=this.get("url");this.set("linkUrl",t);break;case"post":this.set("linkUrl",this.attachment.get("link"));break;case"none":this.set("linkUrl","")}},updateSize:function(){var e;if(!this.attachment)return;if(this.get("size")==="custom"){this.set("width",this.get("customWidth"));this.set("height",this.get("customHeight"));this.set("url",this.get("originalUrl"));return}e=this.attachment.get("sizes")[this.get("size")];if(!e)return;this.set("url",e.url);this.set("width",e.width);this.set("height",e.height)},setAspectRatio:function(){var e;if(this.attachment&&this.attachment.get("sizes")){e=this.attachment.get("sizes").full;if(e){this.set("aspectRatio",e.width/e.height);return}}this.set("aspectRatio",this.get("customWidth")/this.get("customHeight"))}});n=u.model.Attachments=Backbone.Collection.extend({model:t,initialize:function(e,t){t=t||{};this.props=new Backbone.Model;this.filters=t.filters||{};this.props.on("change",this._changeFilteredProps,this);this.props.on("change:order",this._changeOrder,this);this.props.on("change:orderby",this._changeOrderby,this);this.props.on("change:query",this._changeQuery,this);this.props.set(_.defaults(t.props||{}));t.observe&&this.observe(t.observe)},_changeOrder:function(){this.comparator&&this.sort()},_changeOrderby:function(e,t){if(this.comparator&&this.comparator!==n.comparator)return;t&&"post__in"!==t?this.comparator=n.comparator:delete this.comparator},_changeQuery:function(e,t){if(t){this.props.on("change",this._requery,this);this._requery()}else this.props.off("change",this._requery,this)},_changeFilteredProps:function(e){if(this.props.get("query"))return;var t=_.chain(e.changed).map(function(t,r){var i=n.filters[r],s=e.get(r);if(!i)return;if(s&&!this.filters[r])this.filters[r]=i;else{if(!!s||this.filters[r]!==i)return;delete this.filters[r]}return!0},this).any().value();if(!t)return;this._source||(this._source=new n(this.models));this.reset(this._source.filter(this.validator,this))},validateDestroyed:!1,validator:function(e){return!this.validateDestroyed&&e.destroyed?!1:_.all(this.filters,function(t){return!!t.call(this,e)},this)},validate:function(e,t){var n=this.validator(e),r=!!this.get(e.cid);!n&&r?this.remove(e,t):n&&!r&&this.add(e,t);return this},validateAll:function(e,t){t=t||{};_.each(e.models,function(e){this.validate(e,{silent:!0})},this);t.silent||this.trigger("reset",this,t);return this},observe:function(e){this.observers=this.observers||[];this.observers.push(e);e.on("add change remove",this._validateHandler,this);e.on("reset",this._validateAllHandler,this);this.validateAll(e);return this},unobserve:function(e){if(e){e.off(null,null,this);this.observers=_.without(this.observers,e)}else{_.each(this.observers,function(e){e.off(null,null,this)},this);delete this.observers}return this},_validateHandler:function(e,t,n){n=t===this.mirroring?n:{silent:n&&n.silent};return this.validate(e,n)},_validateAllHandler:function(e,t){return this.validateAll(e,t)},mirror:function(e){if(this.mirroring&&this.mirroring===e)return this;this.unmirror();this.mirroring=e;this.reset([],{silent:!0});this.observe(e);return this},unmirror:function(){if(!this.mirroring)return;this.unobserve(this.mirroring);delete this.mirroring},more:function(t){var n=e.Deferred(),r=this.mirroring,i=this;if(!r||!r.more)return n.resolveWith(this).promise();r.more(t).done(function(){this===i.mirroring&&n.resolveWith(this)});return n.promise()},hasMore:function(){return this.mirroring?this.mirroring.hasMore():!1},parse:function(e,n){_.isArray(e)||(e=[e]);return _.map(e,function(e){var r,i,s;if(e instanceof Backbone.Model){r=e.get("id");e=e.attributes}else r=e.id;i=t.get(r);s=i.parse(e,n);_.isEqual(i.attributes,s)||i.set(s);return i})},_requery:function(){this.props.get("query")&&this.mirror(r.get(this.props.toJSON()))},saveMenuOrder:function(){if("menuOrder"!==this.props.get("orderby"))return;var e=this.chain().filter(function(e){return!_.isUndefined(e.id)}).map(function(e,t){t+=1;e.set("menuOrder",t);return[e.id,t]}).object().value();if(_.isEmpty(e))return;return u.post("save-attachment-order",{nonce:u.model.settings.post.nonce,post_id:u.model.settings.post.id,attachments:e})}},{comparator:function(e,t,n){var r=this.props.get("orderby"),i=this.props.get("order")||"DESC",o=e.cid,u=t.cid;e=e.get(r);t=t.get(r);if("date"===r||"modified"===r){e=e||new Date;t=t||new Date}n&&n.ties&&(o=u=null);return"DESC"===i?s(e,t,o,u):s(t,e,u,o)},filters:{search:function(e){return this.props.get("search")?_.any(["title","filename","description","caption","name"],function(t){var n=e.get(t);return n&&-1!==n.search(this.props.get("search"))},this):!0},type:function(e){var t=this.props.get("type");return!t||-1!==t.indexOf(e.get("type"))},uploadedTo:function(e){var t=this.props.get("uploadedTo");return _.isUndefined(t)?!0:t===e.get("uploadedTo")}}});n.all=new n;u.query=function(e){return new n(null,{props:_.extend(_.defaults(e||{},{orderby:"date"}),{query:!0})})};r=u.model.Query=n.extend({initialize:function(e,t){var r;t=t||{};n.prototype.initialize.apply(this,arguments);this.args=t.args;this._hasMore=!0;this.created=new Date;this.filters.order=function(e){var t=this.props.get("orderby"),n=this.props.get("order");return this.comparator?this.length?1!==this.comparator(e,this.last(),{ties:!0}):"DESC"!==n||"date"!==t&&"modified"!==t?"ASC"===n&&"menuOrder"===t?e.get(t)===0:!1:e.get(t)>=this.created:!0};r=["s","order","orderby","posts_per_page","post_mime_type","post_parent"];wp.Uploader&&_(this.args).chain().keys().difference(r).isEmpty().value()&&this.observe(wp.Uploader.queue)},hasMore:function(){return this._hasMore},more:function(t){var n=this;if(this._more&&"pending"===this._more.state())return this._more;if(!this.hasMore())return e.Deferred().resolveWith(this).promise();t=t||{};t.remove=!1;return this._more=this.fetch(t).done(function(e){if(_.isEmpty(e)||-1===this.args.posts_per_page||e.length<this.args.posts_per_page)n._hasMore=!1})},sync:function(e,t,r){var i,s;if("read"===e){r=r||{};r.context=this;r.data=_.extend(r.data||{},{action:"query-attachments",post_id:u.model.settings.post.id});i=_.clone(this.args);-1!==i.posts_per_page&&(i.paged=Math.floor(this.length/i.posts_per_page)+1);r.data.query=i;return u.ajax(r)}s=n.prototype.sync?n.prototype:Backbone;return s.sync.apply(this,arguments)}},{defaultProps:{orderby:"date",order:"DESC"},defaultArgs:{posts_per_page:40},orderby:{allowed:["name","author","date","title","modified","uploadedTo","id","post__in","menuOrder"],valuemap:{id:"ID",uploadedTo:"parent",menuOrder:"menu_order ID"}},propmap:{search:"s",type:"post_mime_type",perPage:"posts_per_page",menuOrder:"menu_order",uploadedTo:"post_parent"},get:function(){var e=[];return function(t,n){var i={},s=r.orderby,o=r.defaultProps,u;delete t.query;_.defaults(t,o);t.order=t.order.toUpperCase();"DESC"!==t.order&&"ASC"!==t.order&&(t.order=o.order.toUpperCase());_.contains(s.allowed,t.orderby)||(t.orderby=o.orderby);_.each(t,function(e,t){if(_.isNull(e))return;i[r.propmap[t]||t]=e});_.defaults(i,r.defaultArgs);i.orderby=s.valuemap[t.orderby]||t.orderby;u=_.find(e,function(e){return _.isEqual(e.args,i)});if(!u){u=new r([],_.extend(n||{},{props:t,args:i}));e.push(u)}return u}}()});u.model.Selection=n.extend({initialize:function(e,t){n.prototype.initialize.apply(this,arguments);this.multiple=t&&t.multiple;this.on("add remove reset",_.bind(this.single,this,!1))},add:function(e,t){this.multiple||this.remove(this.models);return n.prototype.add.call(this,e,t)},single:function(e){var t=this._single;e&&(this._single=e);this._single&&!this.get(this._single.cid)&&delete this._single;this._single=this._single||this.last();if(this._single!==t){if(t){t.trigger("selection:unsingle",t,this);this.get(t.cid)||this.trigger("selection:unsingle",t,this)}this._single&&this._single.trigger("selection:single",this._single,this)}return this._single}});e(window).on("unload",function(){window.wp=null})})(jQuery);