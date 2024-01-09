import './css/style.css';
import Handler from './Handler';
import {Project, Task} from './Item';

const task1 = new Task('Task1', '21/01/2024');
const handler = new Handler();
handler.displayTask(task1);
const project1 = new Project('this is a very big project name', 'this is a new project');
const project2 = new Project('project 4', 'new project');

project1.changeName('new name');
project1.addTask(task1);
handler.addProject(project1);
handler.addProject(project2);

project1.deleteTask(task1)
console.log(project1.tasks);
console.log(handler.projects);