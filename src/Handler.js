
class Handler{
    constructor(){
        this.projects = [];
        // this.tasks = [];

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
}

export default Handler;