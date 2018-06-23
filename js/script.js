const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all event Listeners
loadEventListeners();

//load all event listeners
function loadEventListeners(){
    document.addEventListener('DOMContentLoaded', getTasks);
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTasks);
}
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks=[]
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        const li = document.createElement('li');

    
    //Add Class
    li.className='collection-item';
    // Create text node and append to the li
    li.appendChild(document.createTextNode(task));
    //Create new link element
    
    const link = document.createElement('a');
    //Add Class
    link.className = 'delete-item secondary-content';
    // Add icon
    link.innerHTML= '<i class="fa fa-ban"></i>';
    // append link to li
    li.appendChild(link);

    taskList.appendChild(li);
    })
}
function addTask(e){
    if(taskInput.value===''){
        alert('Add a task')
    }
    
    // Create li element
    const li = document.createElement('li');

    
    //Add Class
    li.className='collection-item';
    // Create text node and append to the li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link element
    
    const link = document.createElement('a');
    //Add Class
    link.className = 'delete-item secondary-content';
    // Add icon
    link.innerHTML= '<i class="fa fa-ban"></i>';
    // append link to li
    li.appendChild(link);

    taskList.appendChild(li);
    // Store in LS
    StoreTaskInLocalStorage(taskInput.value);
    //Clear Inout
    taskInput.value='';
    e.preventDefault();
}
function StoreTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function removeTask(e){
    e.preventDefault();
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
    e.target.parentElement.parentElement.remove();

    // Remove from LS
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
}
}
}
//Remove from LS
function removeTaskFromLocalStorage(taskItem){
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks(){
    taskList.innerHTML='';
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear()
}
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text)!=-1){
                task.style.display = 'block';
            }else{
                task.style.display = 'none';
            }
        }
    );
}