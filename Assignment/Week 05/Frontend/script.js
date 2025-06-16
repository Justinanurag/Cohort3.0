function add(){
    const inputElement=document.getElementById('taskInput');
    const newList=document.getElementById('task');
     const taskText = inputElement.value.trim();
    //condition
     if (taskText === "") {
    alert("Please enter a task!");
    return;
  }
    newList.innerHTML= ` <div>${inputElement.value}  <button  class="delete" onClick="del(this)">X</button></div>`;
    inputElement.value="";
}
function del(button){
    const element=button.parentElement;
    element.remove();
}