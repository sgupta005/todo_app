class Handler{
    constructor(){
        this.projects = [];

        this.loadProjects();
    }

    addProject(project){
        this.projects.push(project);
        this.loadProjects();
    }

    loadProjects(){
        const projectsList = document.getElementById('projects-list');
        projectsList.innerHTML = '';
        this.projects.forEach(project=>{
            const div = document.createElement('div');
            div.className = 'project-item';
            div.innerHTML = `
                ${project.name}
                <i class="fas fa-trash delete-project"></i>
            `
            projectsList.appendChild(div);
        });
    }

    getActiveProject(){
        const [activeProject] = this.projects.filter(project=>project.active);
        return activeProject;
    }

    displayTask(task){
        const div = document.createElement('div');
        div.className = 'task';
        div.innerHTML = `
            <div class="task-left">
                <div class="checkbox"></div>
                <div class="task-name">${task.name}</div>
            </div>
            <div class="task-right">
                <div class="task-time">${task.dueDate}</div>
                <i class="fas fa-edit task-edit"></i>
                <i class="fas fa-trash task-delete"></i>
            </div>
        `
        document.getElementById('tasks-container').appendChild(div);
    }

    loadActiveProjectTasks(){
        const activeProject = this.getActiveProject();
        const tasksContainer = document.getElementById('tasks-container');
        tasksContainer.innerHTML = '';
        activeProject.tasks.forEach(task=>this.displayTask(task));
    }

    displayActiveProjectInfo(){
        const activeProject = this.getActiveProject();
        const projectInfo = document.getElementById('project-info');
        projectInfo.innerHTML = `
            <div id="project-name-main">
                ${activeProject.name}    
            </div>
            <div id="project-description-main">
                ${activeProject.description}
            </div>
        `
    }
}

export default Handler;