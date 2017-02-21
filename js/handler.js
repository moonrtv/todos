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
