document.addEventListener("DOMContentLoaded",()=>{
const taskInput= document.getElementById("taskInput");

const addTaskButton=document.getElementById("addTaskButton");

const TodoList=document.getElementById("TodoList");

let tasks= JSON.parse(localStorage.getItem("task")) ||  [];

tasks.forEach(task =>renderTask(task));

addTaskButton.addEventListener("click", ()=>{
    const taskText= taskInput.value.trim();
    if (taskText === "") return;

    const newTask={
        id: Date.now(),
        text: taskText,
        completed:false
    }
    tasks.push(newTask);
    saveTask();
    renderTask(newTask);
    taskInput.value=""; //clear input
    console.log(tasks);
})
function renderTask(task){
    const li =document.createElement("li");
    li.setAttribute("data-id", task.id);
    if(task.completed) li.classList.add("completed")
    li.innerHTML=`
    <span>${task.text}</span>
    <button> Delete </button>
    `;
    li.addEventListener("click", (e)=>{
        if(e.target.tagName === "BUTTON") return;
        li.completed =!task.completed;
        li.classList.toggle("completed");
        saveTask()
    })
    li.querySelector("button").addEventListener("click", (e)=>{
        e.stopPropagation;
        tasks=tasks.filter(t=>t.id!=task.id);
        li.remove();
        saveTask();

        

    })

    TodoList.appendChild(li);
}
function saveTask(){
    localStorage.setItem("task", JSON.stringify(tasks))
}
})