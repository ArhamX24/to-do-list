let inputBar = document.querySelector("#input-box");
let addBtn = document.querySelector(".add-btn");
let listContainer = document.querySelector("#listContainer");

let taskArray = [];
let olderTasks = localStorage.getItem("tasks");
if (olderTasks) {
  let parsedArr = JSON.parse(olderTasks);
  taskArray = parsedArr;
  addContent(taskArray)
}


addBtn.addEventListener("click", ()=>{
    let inputText = inputBar.value;
    if(inputText.length === 0 )
      {
        return 0
      }

      let taskObj = {
        id: Date.now(),
        task: inputText,
      }

      taskArray.push(taskObj);

      addContent(taskArray);

      localStorage.setItem("tasks", JSON.stringify(taskArray));

      inputBar.value = "";
});

function addContent(arr){
  listContainer.innerHTML = "";
  
 arr.forEach(e => {
  let id = e.id;
  let li = document.createElement("li");
  li.innerHTML = e.task;
  listContainer.appendChild(li);
  let span = document.createElement("span");
  span.innerHTML = "\u00d7";
  li.appendChild(span);
  span.addEventListener("click", ()=>{
    li.remove();
    let filteredTaskArray = taskArray.filter((e)=>{
      return e.id !== id;
    })
    taskArray = filteredTaskArray;
    localStorage.setItem("tasks", JSON.stringify(taskArray));
  })
 });
}