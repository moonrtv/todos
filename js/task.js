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