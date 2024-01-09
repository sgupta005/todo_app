import './css/style.css';
import Handler from './Handler';
import {Project, Task} from './Item';

class App{
    constructor(){
        this.handler = new Handler();

        document.getElementById('add-project-button').addEventListener('click', this.showAddProjectDialog);
        document.getElementById('add-project-cancel-button').addEventListener('click', this.closeAddProjectDialog);
        document.getElementById('add-project-dialog-submit-button').addEventListener('click', this.addProject.bind(this));

    }

    showAddProjectDialog(){
        document.getElementById('add-project-window-container').style.display = 'flex';
    }

    addProject(){
        const name = document.getElementById('project-name');
        const description = document.getElementById('project-description');
        if (!name.value || !description.value){
            alert('Please enter name and description');
            return;
        }
        const project = new Project(name.value,description.value);
        this.handler.addProject(project);

        this.closeAddProjectDialog();
        name.value = '';
        description.value = '';
    }

    closeAddProjectDialog(){
        document.getElementById('add-project-window-container').style.display = 'none';
    }
}

const app = new App();