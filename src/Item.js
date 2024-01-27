class Project {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.tasks = [];
    this.id = Date.now();
    this.active = false;
  }
}

class Task {
  constructor(name, dueDate) {
    this.name = name;
    this.dueDate = dueDate;
    this.done = false;
    this.id = Date.now();
  }
}

export { Project, Task };
