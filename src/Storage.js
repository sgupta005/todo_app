export default class Storage {
  static getProjects() {
    let projects;
    if (localStorage.getItem('projects') === null) {
      projects = [];
    } else {
      projects = JSON.parse(localStorage.getItem('projects'));
    }
    return projects;
  }

  static addProject(project) {
    let projects = Storage.getProjects();
    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects));
  }

  static editProject(newProject) {
    let projects = Storage.getProjects();
    const project = projects.find((project) => project.id == newProject.id);
    Storage.removeProject(project.id);
    Storage.addProject(newProject);
    localStorage.setItem('projects', JSON.stringify(projects));
  }

  static removeProject(id) {
    let projects = Storage.getProjects();
    projects = projects.filter((project) => project.id != id);
    localStorage.setItem('projects', JSON.stringify(projects));
  }

  static addTask(id, task) {
    const projects = Storage.getProjects();
    const project = projects.find((project) => project.id == id);
    project.tasks.push(task);
    localStorage.setItem('projects', JSON.stringify(projects));
  }

  static editTask(task, taskId, projectId) {
    Storage.removeTask(taskId, projectId);
    Storage.addTask(projectId, task);
  }

  static removeTask(taskId, projectId) {
    const projects = Storage.getProjects();
    const project = projects.find((project) => project.id == projectId);
    project.tasks = project.tasks.filter((task) => task.id != taskId);
    localStorage.setItem('projects', JSON.stringify(projects));
  }
}
