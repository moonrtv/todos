$(function(){function t(t){var s=this;$(document).bind("mouseup",function(i){$(s).is(i.target)||0!==$(s).has(i.target).length||($(document).unbind("mouseup"),t.title=$(s).find(".todo__list-edit").val(),$(s).removeClass("js-editing"),e.renderTasks(e))})}var e=new Tasks,s=$("#enterTask"),i={};localStorage.getItem("todos")&&(i=JSON.parse(localStorage.getItem("todos")),i.tasks.forEach(function(t){e.addTask(new Task({title:t.title,status:t.status}))}),e.renderTasks(e)),s.bind("keypress",function(t){13===t.keyCode&&this.value&&(e.addTask(new Task({title:this.value,status:!1})),e.renderTasks(e),s.val(""))}),$("li").live("click",function(s){var i=s.target,n=parseInt($(this).attr("data-id")),a={};switch(i.className){case"todo__list-destroy":e.delTask(n),e.renderTasks(e);break;case"todo__list-title":a=e.getTask(n),a.toggleStatus(),localStorage.clear(),localStorage.setItem("todos",JSON.stringify(e));break;case"todo__list-editing":"LI"===$(this)[0].tagName&&($(this).addClass("js-editing"),a=e.getTask(n),$(this).find(".todo__list-edit").val(a.title),t.call(this,a))}})}),function(){function t(t,e){this.title=t.title||"New task",this.status=t.status||!1,this.parent=e,this.id=t.id,this.render(t)}function e(){var t=this;$(document).bind("mouseup",function(e){0===t.$el.has(e.target).length&&($(document).unbind("mouseup"),t.setTitle(t.$el.find(".todo__list-edit").val()),t.$el.find(".todo__list-title")[0].textContent=t.getTitle(),t.$el.removeClass("js-editing"))})}t.prototype.toggleStatus=function(){this.status=!this.status},t.prototype.getTitle=function(){return this.title},t.prototype.setTitle=function(t){this.title=t},t.prototype.render=function(t){this.$el=$(App.templates.task.template(t)),this.$editBtn=this.$el.find(".todo__list-editing"),this.$removeBtn=this.$el.find(".todo__list-destroy"),this.$checkBtn=this.$el.find(".todo__list-title"),this.setEventListeners()},t.prototype.setEventListeners=function(){var t=this;this.$removeBtn.click(function(e){var s=t.parent.tasks.indexOf(t);t.parent.tasks.splice(s,1),t.$el.remove()}),this.$editBtn.click(function(s){t.$el.addClass("js-editing"),t.$el.find(".todo__list-edit").val(t.getTitle()),e.call(t)}),this.$checkBtn.click(function(e){t.toggleStatus()})},window.Task=t}(),function(){function t(){this.tasks=[],this.$tasks=$("#todoListId")}t.prototype.addTask=function(t){var e=new Task(t,this);this.tasks.push(e),this.$tasks.append(e.$el)},t.prototype.delTask=function(t){this.tasks.splice(t,1)},t.prototype.getTask=function(t){return this.tasks[t]},t.prototype.sortTasks=function(t,e){var s=/([^\d]+|\d+)/gi;t=t.title,e=e.title;for(var i=t.match(s),n=e.match(s),a=0,o=Math.min(i.length,n.length);a<o;a++){var l=i[a],d=n[a];if(l!==d)return isNaN(+l)||isNaN(+d)?l<d?1:-1:+d-l}return i.length-n.length};var e=new t;$("#enterTask").bind("keypress",function(t){13===t.keyCode&&this.value&&(e.addTask({title:this.value,status:!1,id:Date.now()}),t.target.value="")}),window.Tasks=t}();