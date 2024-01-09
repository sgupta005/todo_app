import './css/style.css';
import Handler from './Handler';
import {Project, Task} from './Item';

class App{
    constructor(){
        this._handler = new Handler();

        document.getElementById('add-project-button').addEventListener('click', this._showAddProjectDialog);
        document.getElementById('add-project-cancel-button').addEventListener('click', this._closeAddProjectDialog);
        document.getElementById('add-project-dialog-submit-button').addEventListener('click', this._addProject.bind(this));
        document.getElementById('add-task-button').addEventListener('click', this._showAddTaskDialog.bind(this));
    }

    _showAddProjectDialog(){
        document.getElementById('add-project-window-container').style.display = 'flex';
    }

    _closeAddProjectDialog(){
        document.getElementById('add-project-window-container').style.display = 'none';
    }

    _addProject(){
        const name = document.getElementById('project-name');
        const description = document.getElementById('project-description');
        if (!name.value || !description.value){
            alert('Please enter name and description');
            return;
        }
        const project = new Project(name.value,description.value);
        this._handler.addProject(project);

        this._closeAddProjectDialog();
        name.value = '';
        description.value = '';
    }

    _showAddTaskDialog(){
        const tasksContainer = document.getElementById('tasks-container');
        const addTaskBtn = document.getElementById('add-task-button');
        const addTaskDialog = document.createElement('div');
        addTaskDialog.className = 'add-task';
        addTaskDialog.innerHTML = `
            <div class="add-task-left">
            <input
                class="add-task-name"
                type="text"
                placeholder="To-Do Name"
            />
            </div>
            <div class="add-task-right">
                <input class="add-task-date" type="date" />
                <div class="add-task-button-container">
                    <button class="add-task-submit-button">Submit</p>
                    <button class="add-task-cancel-button">Cancel</p>
                </div>
            </div>
        ` 
        tasksContainer.appendChild(addTaskDialog);
        document.querySelector('.add-task-cancel-button').addEventListener('click', this._hideAddTaskDialog);
        document.querySelector('.add-task-submit-button').addEventListener('click', this._addTask.bind(this));
        addTaskBtn.style.display = 'none';
    }

    _hideAddTaskDialog(){
        const tasksContainer = document.getElementById('tasks-container');
        const addTaskDialog = document.querySelector('.add-task');
        tasksContainer.removeChild(addTaskDialog);
        document.getElementById('add-task-button').style.display = 'inline-block';
    }

    _addTask(){
        const name = document.querySelector('.add-task-name');
        const dueDate = document.querySelector('.add-task-date');
        if (!name.value || !dueDate.value){
            alert('Please enter name and due date');
            return;
        }
        const task = new Task(name.value, dueDate.value)
        this._handler.addTask(task);
        name.value = '';
        dueDate.value = '';
        this._hideAddTaskDialog();
    }
}

const app = new App();