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

    _loadProjects(){
        const projectsList = document.getElementById('projects-list');
        projectsList.innerHTML = '';
        this._projects.forEach(project=>{
            const div = document.createElement('div');
            div.className = 'project-item';
            div.setAttribute('data-id', project.id);
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
        //Making sure that the add task dialog doesn't show up at the top of all tasks
        const addTaskDialog = document.querySelector('.add-task');
        document.getElementById('tasks-container').insertBefore(div, addTaskDialog);
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
        document.getElementById('project-info-placeholder').style.display = 'none';
        document.getElementById('project-info-container').style.display = 'flex';
        document.getElementById('tasks-container').style.display = 'block';
        document.getElementById('add-task-button').style.display = 'inline-block';
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

    setActiveProject(id){
        this._projects.forEach(project => {
            if (project.id == id){
                project.active = true;
            }else{
                project.active = false;
            }
        })
        this._displayActiveProjectInfo();
        this._loadActiveProjectTasks();
    }

    addProject(project){
        this._projects.push(project);
        this.setActiveProject(project.id);
        this._loadProjects();
    }

    deleteProject(id){
        this._projects = this._projects.filter(project=>project.id!=id);
        if (this._projects.length > 0){
            this.setActiveProject(this._projects[0].id);
        }else{
            document.getElementById('project-info-placeholder').style.display = 'block';
            document.getElementById('project-info-container').style.display = 'none';
            document.getElementById('tasks-container').style.display = 'none';
            document.getElementById('add-task-button').style.display = 'none';
        }
    }

    addTask(task){
        const activeProject = this._getActiveProject();
        activeProject.addTask(task);
        this._displayTask(task);
    }

    
}

export default Handler;