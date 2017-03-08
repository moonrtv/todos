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