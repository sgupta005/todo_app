import './css/style.css';
import Handler from './Handler';
import { Project, Task } from './Item';

class App {
  constructor() {
    this._handler = new Handler();

    document
      .getElementById('add-project-button')
      .addEventListener('click', this._showAddProjectDialog);
    document
      .getElementById('add-project-cancel-button')
      .addEventListener('click', this._closeAddProjectDialog);
    document
      .getElementById('add-project-dialog-submit-button')
      .addEventListener('click', this._addProject.bind(this));
    document
      .getElementById('add-task-button')
      .addEventListener('click', this._showAddTaskDialog);
    document
      .querySelector('.add-task-cancel-button')
      .addEventListener('click', this._hideAddTaskDialog);
    document
      .querySelector('.add-task-submit-button')
      .addEventListener('click', this._addTask.bind(this));
    document
      .getElementById('button-open-nav')
      .addEventListener('click', this._openAndCloseNav);
    document
      .getElementById('projects-list')
      .addEventListener('click', this._handleProjectClick.bind(this));
    document
      .getElementById('tasks-container')
      .addEventListener('click', this._handleTaskClick.bind(this));
    document
      .getElementById('edit-project-info-button')
      ?.addEventListener('click', this._handleEditProjectInfo.bind(this));
    document
      .getElementById('edit-project-cancel-button')
      ?.addEventListener('click', this._cancelEditProjectInfo);
    document
      .getElementById('edit-project-submit-button')
      ?.addEventListener('click', this._submitEditProjectInfo.bind(this));
    document
      .getElementById('button-today-projects')
      .addEventListener('click', this._showTodayTasks.bind(this));
    document
      .getElementById('button-week-projects')
      .addEventListener('click', this._showWeekTasks.bind(this));
    document
      .getElementById('button-month-projects')
      .addEventListener('click', this._showMonthTasks.bind(this));
  }

  _showAddProjectDialog() {
    document.getElementById('add-project-window-container').style.display =
      'flex';
  }

  _closeAddProjectDialog() {
    document.getElementById('add-project-window-container').style.display =
      'none';
  }

  _addProject() {
    const name = document.getElementById('project-name');
    const description = document.getElementById('project-description');
    if (!name.value || !description.value) {
      alert('Please enter name and description');
      return;
    }
    const project = new Project(name.value, description.value);
    this._handler.addProject(project);

    this._closeAddProjectDialog();
    name.value = '';
    description.value = '';
  }

  _showAddTaskDialog() {
    document.querySelector('.add-task').style.display = 'flex';
    document.getElementById('add-task-button').style.display = 'none';
  }

  _hideAddTaskDialog() {
    document.querySelector('.add-task').style.display = 'none';
    document.getElementById('add-task-button').style.display = 'inline-block';
  }

  _addTask() {
    const name = document.querySelector('.add-task-name');
    const dueDate = document.querySelector('.add-task-date');
    if (!name.value || !dueDate.value) {
      alert('Please enter name and due date');
      return;
    }
    const task = new Task(name.value, dueDate.value);
    this._handler.addTask(task);
    name.value = '';
    dueDate.value = '';
    this._hideAddTaskDialog();
  }

  _handleProjectClick(e) {
    //Deleting Project
    if (e.target.classList.contains('delete-project')) {
      const projectId = e.target.parentElement.dataset.id;
      this._handler.deleteProject(projectId);
      e.target.parentElement.remove();
      return;
    }
    //Switching from one Project to another
    if (e.target.classList.contains('project-item')) {
      const projectId = e.target.dataset.id;
      this._handler.setActiveProject(projectId);
      return;
    }
  }

  _handleTaskClick(e) {
    //Marking and unmarking task as done
    if (
      e.target.classList.contains('checkbox') ||
      e.target.classList.contains('fa-check')
    ) {
      this._checkbox(e);
      return;
    }
    //Deleting task
    if (e.target.classList.contains('task-delete')) {
      this._deleteTask(e);
      return;
    }
    if (e.target.classList.contains('task-edit')) {
      this._editTask(e);
      return;
    }
  }

  _editTask(e) {
    const tasksContainer = document.getElementById('tasks-container');
    const currentTask = e.target.parentElement.parentElement;
    const id = currentTask.dataset.id;
    const editTask = document.createElement('div');
    editTask.setAttribute('data-id', id);
    editTask.className = 'edit-task';
    editTask.innerHTML = `
    <div class="edit-task-left">
    <input
        class="edit-task-name"
        type="text"
        placeholder="To-Do Name"
    />
    </div>
    <div class="edit-task-right">
        <input class="edit-task-date" type="date" />
        <div class="edit-task-button-container">
            <button class="edit-task-submit-button" >Submit</p>
            <button class="edit-task-cancel-button" >Cancel</p>
        </div>
    </div>
    `;
    tasksContainer.replaceChild(editTask, currentTask);
    this._handler.setTaskForEditing(id);

    document
      .querySelector('.edit-task-cancel-button')
      .addEventListener('click', () => {
        this._cancelEditTask(currentTask, editTask);
      });
    document
      .querySelector('.edit-task-submit-button')
      .addEventListener('click', () => {
        this._submitEditTask(currentTask, editTask);
      });
  }

  _cancelEditTask(currentTask, editTask) {
    const tasksContainer = document.getElementById('tasks-container');
    tasksContainer.replaceChild(currentTask, editTask);
  }

  _submitEditTask(currentTask, editTask) {
    this._cancelEditTask(currentTask, editTask);
    let name = editTask.firstElementChild.firstElementChild.value;
    let dueDate = editTask.lastElementChild.firstElementChild.value;
    this._handler.editTask(currentTask.dataset.id, name, dueDate);
    name = '';
    dueDate = '';
  }

  _deleteTask(e) {
    const id = e.target.parentElement.parentElement.dataset.id;
    e.target.parentElement.parentElement.remove();
    this._handler.deleteTask(id);
  }

  _checkbox(e) {
    if (e.target.classList.contains('checkbox')) {
      const id = e.target.parentElement.parentElement.dataset.id;
      const marked = true ? e.target.innerHTML != '' : false;
      if (marked) {
        e.target.firstElementChild.remove();
        e.target.classList.remove('done');
      } else {
        e.target.innerHTML = `<i class="fas fa-thin fa-check"></i>`;
        e.target.classList.add('done');
      }
      this._handler.checkbox(id, marked);
      return;
    }
    if (e.target.classList.contains('fa-check')) {
      const id = e.target.parentElement.parentElement.parentElement.dataset.id;
      const marked = true;
      e.target.parentElement.classList.remove('done');
      e.target.remove();
      this._handler.checkbox(id, marked);
      return;
    }
  }

  _handleEditProjectInfo() {
    document.getElementById('project-info-container').style.display = 'none';
    document.getElementById('edit-project-info-container').style.display =
      'flex';
    this._handler.setProjectForEditing();
  }

  _cancelEditProjectInfo() {
    document.getElementById('project-info-container').style.display = 'flex';
    document.getElementById('edit-project-info-container').style.display =
      'none';
    document.getElementById('edit-project-name').value = '';
    document.getElementById('edit-project-description').value = '';
  }

  _submitEditProjectInfo() {
    const name = document.getElementById('edit-project-name').value;
    const description = document.getElementById(
      'edit-project-description'
    ).value;
    if (!name || !description) {
      alert('Please enter name and description');
      return;
    }
    this._handler.editProject(name, description);
    this._cancelEditProjectInfo();
  }

  _showTodayTasks() {
    document.getElementById('project-info-container').style.display = 'none';
    document.getElementById('project-info-placeholder').style.display = 'block';
    document.getElementById('project-info-placeholder').textContent = 'Today';
    this._handler.displayTodayTasks();
  }

  _showWeekTasks() {
    document.getElementById('project-info-container').style.display = 'none';
    document.getElementById('project-info-placeholder').style.display = 'block';
    document.getElementById('project-info-placeholder').textContent =
      'This Week';
    this._handler.displayWeekTasks();
  }

  _showMonthTasks() {
    document.getElementById('project-info-container').style.display = 'none';
    document.getElementById('project-info-placeholder').style.display = 'block';
    document.getElementById('project-info-placeholder').textContent =
      'This Month';
    this._handler.displayMonthTasks();
  }

  _openAndCloseNav() {
    const sidebar = document.getElementById('sidebar');
    const mainPanel = document.getElementById('main-panel');
    if (sidebar.classList.contains('open')) {
      mainPanel.style.width = '75vw';
      sidebar.style.display = 'inline-block';
      sidebar.classList.remove('open');
    } else {
      sidebar.style.display = 'none';
      mainPanel.style.width = '100vw';
      sidebar.classList.add('open');
    }
  }
}

const app = new App();
