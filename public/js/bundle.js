/**
 * В модуле описаны обработчики на форме
 */
$(function() {
    var listTasks = new Tasks();
    var $enterTask = $('#enterTask');
    var todos = {};

    // Проверка localStorage, если что отрисовываем прошлую сессию
    if (localStorage.getItem('todos')) {
        todos = JSON.parse(localStorage.getItem('todos'));
        todos.tasks.forEach(function(item) {
            listTasks.addTask(new Task({title: item.title, status: item.status}));
        });
        listTasks.renderTasks(listTasks);
    }

    /**
     * Добавление нового task'a
     */
    $enterTask.bind('keypress', function(event) {
        if (event.keyCode === 13 && this.value) {

            listTasks.addTask(new Task({title: this.value, status: false}));
            listTasks.renderTasks(listTasks);

            $enterTask.val('');
        }
    });

    /**
     * События на поле task(удаление, смена статуса, редактирование)
     */
    $('li').live('click', function(event) {
        var target = event.target,
            elementId = parseInt($(this).attr('data-id')),
            task = {};

        switch (target.className) {

            case 'todo__list-destroy':
                listTasks.delTask(elementId);
                listTasks.renderTasks(listTasks);
                break;

            case 'todo__list-title':
                task = listTasks.getTask(elementId);
                task.toggleStatus();
                localStorage.clear();
                localStorage.setItem('todos', JSON.stringify(listTasks));
                break;

            case 'todo__list-editing':
                if ($(this)[0].tagName === 'LI') {
                    $(this).addClass('js-editing');
                    task = listTasks.getTask(elementId);
                    $(this).find('.todo__list-edit').val(task.title);
                    closeEditField.call(this, task);
                }
                break;
        }
    });

    /**
     * Закрытие поля редактирования task'a
     * @param {Object} task
     */
    function closeEditField(task) {
        var self = this;

        $(document).bind('mouseup', function(event) {
            if (!$(self).is(event.target) && $(self).has(event.target).length === 0) {
                $(document).unbind('mouseup');
                task.title = $(self).find('.todo__list-edit').val();
                $(self).removeClass('js-editing');
                listTasks.renderTasks(listTasks);
            }
        });
    }

});

/**
 * Модуль task
 */
(function() {
    function Task(obj, parent) {
        this.title = obj.title || 'New task';
        this.status = obj.status || false;
        this.parent = parent;
        this.id = obj.id;

        this.render(obj);
    }

    Task.prototype.toggleStatus = function() {
        this.status = !this.status;
    };

    Task.prototype.getTitle = function() {
        return this.title;
    };

    Task.prototype.setTitle = function(name) {
        this.title = name;
    };

    Task.prototype.render = function(item) {
        this.$el = $(App.templates.task.template(item));
        this.$editBtn = this.$el.find('.todo__list-editing');
        this.$removeBtn = this.$el.find('.todo__list-destroy');
        this.$checkBtn = this.$el.find('.todo__list-title');

        this.setEventListeners();
    };

    Task.prototype.setEventListeners = function () {
        var self = this;

        this.$removeBtn.click(function(event) {
            var index = self.parent.tasks.indexOf(self);
            self.parent.tasks.splice(index, 1);
            self.$el.remove();
        });

        this.$editBtn.click(function(event) {
            self.$el.addClass('js-editing');
            self.$el.find('.todo__list-edit').val(self.getTitle());
            closeEditField.call(self);
        });

        this.$checkBtn.click(function(event) {
            self.toggleStatus();
        });
    };

    /**
     * Закрытие поля редактирования task'a
     */
    function closeEditField() {
        var self = this;

        $(document).bind('mouseup', function(event) {
            if (self.$el.has(event.target).length === 0) {
                $(document).unbind('mouseup');
                self.setTitle(self.$el.find('.todo__list-edit').val());
                self.$el.find('.todo__list-title')[0].textContent = self.getTitle();
                self.$el.removeClass('js-editing');
            }
        });
    }

    window.Task = Task;
})();
/**
 * Модуль коллекция task'ов
 */
(function() {
    function Tasks() {
        this.tasks = [];
        this.$tasks = $('#todoListId');
    }

    Tasks.prototype.addTask = function(item) {
        var task = new Task(item, this);
        this.tasks.push(task);
        this.$tasks.append(task.$el);
    };

    Tasks.prototype.delTask = function(index) {
        this.tasks.splice(index, 1);
    };

    Tasks.prototype.getTask = function(index) {
        return this.tasks[index];
    };

    Tasks.prototype.sortTasks = function(str1, str2) {
        var rx = /([^\d]+|\d+)/ig;
        str1 = str1.title;
        str2 = str2.title;
        var str1split = str1.match( rx );
        var str2split = str2.match( rx );
        for(var i = 0, l = Math.min(str1split.length, str2split.length); i < l; i++) {
            var s1 = str1split[i],
                s2 = str2split[i];
            if (s1 === s2) continue;
            if (isNaN(+s1) || isNaN(+s2))
                return s1 < s2 ? 1 : -1;
            else
                return +s2 - s1;
        }
        return str1split.length - str2split.length;
    };


    var listTasks = new Tasks();

    /**
     * Добавление нового task'a
     */
    $('#enterTask').bind('keypress', function(event) {
        if (event.keyCode === 13 && this.value) {
            listTasks.addTask({title: this.value, status: false, id: Date.now()});
            event.target.value = '';
        }
    });

    window.Tasks = Tasks;
})();