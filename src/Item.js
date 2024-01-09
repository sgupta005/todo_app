class Project{
    constructor(name,description){
        this.name = name;
        this.description = description;
        this.tasks = [];
        this.id = Date.now();
        this.active = false;
    }
    changeName(newName){
        this.name = newName;
    }
    changeDescription(newDescription){
        this.description = newDescription;
    }
    deleteTask(taskToBeDeleted){
        this.tasks = this.tasks.filter(task=>task.id != taskToBeDeleted.id);
    }
    addTask(task){
        this.tasks.push(task);
    }
}

class Task{
    constructor(name,dueDate){
        this.name = name;
        this.dueDate = dueDate;
        this.done = false;
        this.id = Date.now();
    }
    changeName(newName){
        this.name = newName;
    }
    changeDueDate(newDueDate){
        this.dueDate = newDueDate;
    }
    toggleDone(){
        this.done = !this.done;
    }

}

export {
    Project,
    Task,
}