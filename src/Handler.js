import Storage from './Storage.js';

class Handler {
  constructor() {
    this._projects = Storage.getProjects();
    this._loadProjects();
    this._setActiveProjectOnReload();
    this._handleNoProjects();
  }

  // PRIVATE METHODS

  _setActiveProjectOnReload() {
    if (this._projects.length > 0) {
      this.setActiveProject(this._projects[0].id);
    }
  }

  _handleNoProjects() {
    if (this._projects.length === 0) {
      document.getElementById('project-info-placeholder').textContent =
        'Start By Creating A Project';
    }
  }

  _getActiveProject() {
    const [activeProject] = this._projects.filter((project) => project.active);
    return activeProject;
  }

  _loadProjects() {
    const projectsList = document.getElementById('projects-list');
    projectsList.innerHTML = '';
    this._projects.forEach((project) => {
      const div = document.createElement('div');
      div.className = 'project-item';
      div.setAttribute('data-id', project.id);
      div.innerHTML = `
                ${project.name}
                <i class="fas fa-trash delete-project"></i>
            `;
      projectsList.appendChild(div);
    });
  }

  _displayTask(task) {
    const div = document.createElement('div');
    div.className = 'task';
    div.setAttribute('data-id', task.id);
    div.innerHTML = task.done
      ? `
            <div class="task-left">
                <div class="checkbox done"><i class="fas fa-thin fa-check"></i></div>
                <div class="task-name">${task.name}</div>
            </div>
            <div class="task-right">
                <div class="task-time">${task.dueDate}</div>
                <i class="fas fa-edit task-edit"></i>
                <i class="fas fa-trash task-delete"></i>
            </div>
        `
      : `
            <div class="task-left">
                <div class="checkbox"></div>
                <div class="task-name">${task.name}</div>
            </div>
            <div class="task-right">
                <div class="task-time">${task.dueDate}</div>
                <i class="fas fa-edit task-edit"></i>
                <i class="fas fa-trash task-delete"></i>
            </div>
        `;
    //Making sure that the add task dialog doesn't show up at the top of all tasks
    const addTaskDialog = document.querySelector('.add-task');
    document.getElementById('tasks-container').insertBefore(div, addTaskDialog);
  }

  _displayTasks(filteredTasks) {
    const tasksContainer = document.getElementById('tasks-container');

    //If the task container already has any tasks then this will remove them
    const tasks = document.querySelectorAll('.task');
    Array.from(tasks).forEach((task) => tasksContainer.removeChild(task));

    filteredTasks.forEach((task) => this._displayTask(task));

    document.getElementById('add-task-button').style.display = 'none';
    tasksContainer.style.display = 'block';
  }

  _loadActiveProjectTasks() {
    const activeProject = this._getActiveProject();
    const tasksContainer = document.getElementById('tasks-container');

    //If the task container already has any tasks then this will remove them
    const tasks = document.querySelectorAll('.task');
    Array.from(tasks).forEach((task) => tasksContainer.removeChild(task));

    //Displaying Active Projects's tasks
    activeProject.tasks.forEach((task) => this._displayTask(task));
  }

  _displayActiveProjectInfo() {
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
        `;
  }

  _getAllTasks() {
    return this._projects
      ?.map((project) =>
        project.tasks.map((task) => ({
          ...task,
          name: `${task.name} (${project.name})`,
        }))
      )
      .flat();
  }

  // PUBLIC METHODS

  setActiveProject(id) {
    this._projects.forEach((project) => {
      if (project.id == id) {
        project.active = true;
      } else {
        project.active = false;
      }
    });
    this._displayActiveProjectInfo();
    this._loadActiveProjectTasks();
  }

  addProject(project) {
    this._projects.push(project);
    Storage.addProject(project);
    this.setActiveProject(project.id);
    this._loadProjects();
  }

  editProject(name, description) {
    const activeProject = this._getActiveProject();
    Storage.removeProject(activeProject.id);
    activeProject.name = name;
    activeProject.description = description;
    Storage.addProject(activeProject);
    this._displayActiveProjectInfo();
    this._loadProjects();
  }

  setProjectForEditing() {
    const activeProject = this._getActiveProject();
    document.getElementById('edit-project-name').value = activeProject.name;
    document.getElementById('edit-project-description').value =
      activeProject.description;
  }

  deleteProject(id) {
    Storage.removeProject(id);
    this._projects = Storage.getProjects();
    if (this._projects.length > 0) {
      this.setActiveProject(this._projects[0].id);
    } else {
      document.getElementById('project-info-placeholder').style.display =
        'block';
      document.getElementById('project-info-container').style.display = 'none';
      document.getElementById('tasks-container').style.display = 'none';
      document.getElementById('add-task-button').style.display = 'none';
    }
  }

  addTask(task) {
    const activeProject = this._getActiveProject();
    activeProject.tasks.push(task);
    Storage.addTask(activeProject.id, task);
    this._displayTask(task);
  }

  checkbox(id, marked) {
    const activeProject = this._getActiveProject();
    const task = activeProject.tasks.find((task) => task.id == id);
    task.done = !marked;
    Storage.editTask(task, id, activeProject.id);
  }

  setTaskForEditing(id) {
    const activeProject = this._getActiveProject();
    const task = activeProject.tasks.find((task) => task.id == id);
    document.querySelector('.edit-task-name').value = task.name;
    document.querySelector('.edit-task-date').value = task.dueDate;
  }
  editTask(id, name, dueDate) {
    const activeProject = this._getActiveProject();
    const task = activeProject.tasks.find((task) => task.id == id);
    task.name = name;
    task.dueDate = dueDate;
    Storage.editTask(task, id, activeProject.id);
    this._loadActiveProjectTasks();
  }

  deleteTask(id) {
    const activeProject = this._getActiveProject();
    activeProject.tasks = activeProject.tasks.filter((task) => task.id != id);
    Storage.removeTask(id, activeProject.id);
  }

  getTasksForToday() {
    const date = new Date().toLocaleDateString();
    const allTasks = this._getAllTasks();
    return allTasks.filter(
      (task) => +task.dueDate.split('-')[2] === +date.split('/')[0]
    );
  }

  getTasksForWeek() {
    const { DateTime } = require('luxon');
    const currentDate = DateTime.local();
    const allTasks = this._getAllTasks();

    return allTasks.filter((task) => {
      const inputDate = DateTime.fromFormat(task.dueDate, 'yyyy-MM-dd');
      return (
        inputDate.startOf('week') <= currentDate &&
        inputDate.endOf('week') >= currentDate
      );
    });
  }

  getTasksForMonth() {
    const date = new Date().toLocaleDateString();
    const allTasks = this._getAllTasks();
    return allTasks.filter(
      (task) => +task.dueDate.split('-')[1] === +date.split('/')[1]
    );
  }

  displayTodayTasks() {
    this._displayTasks(this.getTasksForToday());
  }

  displayWeekTasks() {
    this._displayTasks(this.getTasksForWeek());
  }

  displayMonthTasks() {
    this._displayTasks(this.getTasksForMonth());
  }
}

export default Handler;
