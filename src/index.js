import './css/style.css';
import Handler from './Handler';
import {Project, Task} from './Item';

class App{
    constructor(){
        this.handler = new Handler();

        document.getElementById('add-project-button').addEventListener('click', this._showAddProjectDialog);
        document.getElementById('add-project-cancel-button').addEventListener('click', this._closeAddProjectDialog);
        document.getElementById('add-project-dialog-submit-button').addEventListener('click', this._addProject.bind(this));

    }

    _showAddProjectDialog(){
        document.getElementById('add-project-window-container').style.display = 'flex';
    }

    _addProject(){
        const name = document.getElementById('project-name');
        const description = document.getElementById('project-description');
        if (!name.value || !description.value){
            alert('Please enter name and description');
            return;
        }
        const project = new Project(name.value,description.value);
        this.handler.addProject(project);

        this._closeAddProjectDialog();
        name.value = '';
        description.value = '';
    }

    _closeAddProjectDialog(){
        document.getElementById('add-project-window-container').style.display = 'none';
    }

    
}

const app = new App();