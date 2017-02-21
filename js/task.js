/**
 * Модуль task
 */
(function() {
    function Task(obj) {
        this.title = obj.title || 'New task';
        this.status = obj.status || false;
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

    window.Task = Task;
})();