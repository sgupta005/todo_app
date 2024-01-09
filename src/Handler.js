class Handler{
    constructor(){
        this._projects = [];

        this._loadProjects();
    }

    // PRIVATE METHODS

    _getActiveProject(){
        const [activeProject] = this._projects.filter(project=>project.active);
        return activeProject;
    }

    _setActiveProject(project){
        project.active = true;
        this._projects.forEach(item => {
            if (item.id!=project.id){
                item.active = false;
            }
        })
        this._displayActiveProjectInfo();
        this._loadActiveProjectTasks();
    }

    _loadProjects(){
        const projectsList = document.getElementById('projects-list');
        projectsList.innerHTML = '';
        this._projects.forEach(project=>{
            const div = document.createElement('div');
            div.className = 'project-item';
            div.innerHTML = `
                ${project.name}
                <i class="fas fa-trash delete-project"></i>
            `
            projectsList.appendChild(div);
        });
    }

    _displayTask(task){
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

    _loadActiveProjectTasks(){
        const activeProject = this._getActiveProject();
        const tasksContainer = document.getElementById('tasks-container');

        //If the task container already has any tasks then this will remove them
        const tasks = document.querySelectorAll('.task');
        Array.from(tasks).forEach(task=>tasksContainer.removeChild(task));

        //Displaying Active Projects's tasks
        activeProject.tasks.forEach(task=>this._displayTask(task));
    }

    _displayActiveProjectInfo(){
        const activeProject = this._getActiveProject();
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

    // PUBLIC METHODS

    addProject(project){
        this._projects.push(project);
        this._setActiveProject(project);
        this._loadProjects();
    }

    addTask(task){
        const activeProject = this._getActiveProject();
        activeProject.addTask(task);
        this._displayTask(task);
        console.log(this._projects);
    }

    
}

export default Handler;