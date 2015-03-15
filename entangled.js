angular.module("entangled",[]).factory("Entangled",function(){var e=function(e,t,r){for(var i in e)e.hasOwnProperty(i)&&(this[i]=e[i]);this.webSocketUrl=t,r&&(this[r]=function(){return new s(this.webSocketUrl+"/"+this.id+"/"+r)})};e.prototype.$save=function(e){if(this.id){var t=new WebSocket(this.webSocketUrl+"/"+this.id+"/update");t.onopen=function(){t.send(JSON.stringify(this))}.bind(this),t.onmessage=function(t){if(t.data){var r=JSON.parse(t.data);if(r.resource)for(key in r.resource)this[key]=r.resource[key]}this[this.hasMany]=new s(this.webSocketUrl+"/"+this.id+"/"+this.hasMany),e&&e(this)}.bind(this)}else{var t=new WebSocket(this.webSocketUrl+"/create");t.onopen=function(){t.send(JSON.stringify(this))}.bind(this),t.onmessage=function(t){if(t.data){var s=JSON.parse(t.data);if(s.resource)for(key in s.resource)this[key]=s.resource[key]}e&&e(this)}.bind(this)}},e.prototype.$update=function(e,t){for(var s in e)e.hasOwnProperty(s)&&(this[s]=e[s]);this.$save(t)},e.prototype.$destroy=function(e){var t=new WebSocket(this.webSocketUrl+"/"+this.id+"/destroy");t.onopen=function(){t.send(null)},t.onmessage=function(t){if(t.data){var s=JSON.parse(t.data);if(s.resource)for(key in s.resource)this[key]=s.resource[key]}e&&e(this)}.bind(this)},e.prototype.$valid=function(){return!(this.errors&&Object.keys(this.errors).length)},e.prototype.$invalid=function(){return!this.$valid()},e.prototype.$persisted=function(){return!!this.id};var t=function(t,s,r){this.all=[];for(var i=0;i<t.length;i++){var o=new e(t[i],s,r);this.all.push(o)}},s=function(e){this.webSocketUrl=e};return s.prototype.hasMany=function(e){this.hasMany=e},s.prototype["new"]=function(t){return new e(t,this.webSocketUrl,this.hasMany)},s.prototype.all=function(s){var r=new WebSocket(this.webSocketUrl);r.onmessage=function(i){if(i.data.length){var o=JSON.parse(i.data);if(o.resources)this.resources=new t(o.resources,r.url,this.hasMany);else if(o.action)if("create"===o.action)this.resources.all.push(new e(o.resource,r.url,this.hasMany));else if("update"===o.action){for(var n,a=0;a<this.resources.all.length;a++)this.resources.all[a].id===o.resource.id&&(n=a);this.resources.all[n]=new e(o.resource,r.url,this.hasMany)}else if("destroy"===o.action){for(var n,a=0;a<this.resources.all.length;a++)this.resources.all[a].id===o.resource.id&&(n=a);this.resources.all.splice(n,1)}else console.log("Something else other than CRUD happened..."),console.log(o)}s(this.resources.all)}.bind(this)},s.prototype.create=function(e,t){var s=this["new"](e);s.$save(t)},s.prototype.find=function(t,s){var r=this.webSocketUrl,i=new WebSocket(r+"/"+t);i.onmessage=function(t){if(t.data.length){var i=JSON.parse(t.data);i.resource&&!i.action?this.resource=new e(i.resource,r,this.hasMany):i.action?"update"===i.action?this.resource=new e(i.resource,r,this.hasMany):"destroy"===i.action&&(this.resource=void 0):(console.log("Something else other than CRUD happened..."),console.log(i))}s(this.resource)}.bind(this)},s});
