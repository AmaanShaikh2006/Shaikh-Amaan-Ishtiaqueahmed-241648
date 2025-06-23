document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const clearalltaskbtn = document.getElementById('delTaskBtn')
    loadTasks();

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    clearalltaskbtn.addEventListener('click',clearall);
    taskList.addEventListener('click', (e) => {
        if (e.target.tagName === 'SPAN') {
            toggleTaskComplete(e.target.parentNode);
        } else if (e.target.tagName === 'BUTTON') {
            deleteTask(e.target.parentNode);
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            const listItem = document.createElement('li');
            
            const taskSpan = document.createElement('span');
            taskSpan.textContent = taskText;
            listItem.appendChild(taskSpan);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            listItem.appendChild(deleteButton);

            taskList.appendChild(listItem);
            taskInput.value = ''; 

            saveTasks();
        }
    }
    function clearall(){

    }

    function toggleTaskComplete(taskItem) {
        taskItem.classList.toggle('completed');
        saveTasks();
    }

    function deleteTask(taskItem) {
        taskList.removeChild(taskItem);
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(item => {
            tasks.push({
                text: item.querySelector('span').textContent,
                completed: item.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            tasks.forEach(task => {
                const listItem = document.createElement('li');
                
                const taskSpan = document.createElement('span');
                taskSpan.textContent = task.text;
                listItem.appendChild(taskSpan);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                listItem.appendChild(deleteButton);

                if (task.completed) {
                    listItem.classList.add('completed');
                }
                taskList.appendChild(listItem);
            });
        }
    }
    function clearall(){
        while (taskList.firstChild){
            taskList.removeChild(taskList.firstChild)
        }
        localStorage.removeItem('tasks');
    }
});