import './css/style.css';
import Handler from './Handler';
import {Project, Task} from './Item';

class App{
    constructor(){
        this._handler = new Handler();

        document.getElementById('add-project-button').addEventListener('click', this._showAddProjectDialog);
        document.getElementById('add-project-cancel-button').addEventListener('click', this._closeAddProjectDialog);
        document.getElementById('add-project-dialog-submit-button').addEventListener('click', this._addProject.bind(this));
        document.getElementById('add-task-button').addEventListener('click', this._showAddTaskDialog);
        document.querySelector('.add-task-cancel-button').addEventListener('click', this._hideAddTaskDialog);
        document.querySelector('.add-task-submit-button').addEventListener('click', this._addTask.bind(this));
        document.getElementById('button-open-nav').addEventListener('click', this._openAndCloseNav);
        document.getElementById('projects-list').addEventListener('click', this._handleProjectClick.bind(this));
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
        document.querySelector('.add-task').style.display = 'flex';
        document.getElementById('add-task-button').style.display = 'none';
    }

    _hideAddTaskDialog(){
        document.querySelector('.add-task').style.display = 'none';
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

    _handleProjectClick(e){
        const projectId = e.target.dataset.id;
        this._handler.setActiveProject(projectId);
    }

    _openAndCloseNav(){
        const sidebar = document.getElementById('sidebar');
        const mainPanel = document.getElementById('main-panel');
        if (sidebar.classList.contains('open')){
            mainPanel.style.width = '75vw';
            sidebar.style.display = 'inline-block';
            sidebar.classList.remove('open')
        }else{
            sidebar.style.display = 'none';
            mainPanel.style.width = '100vw';
            sidebar.classList.add('open');
        }
    }
}

const app = new App();