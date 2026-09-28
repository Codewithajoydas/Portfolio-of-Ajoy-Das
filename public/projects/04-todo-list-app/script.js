let btn = document.getElementById("add-todo");

btn.addEventListener("click", () => {
  let inp = document.getElementById("todo-input");
  let todoList = document.getElementById("todo-list");
  let todoCount = document.getElementById("todo-count"); // ✅ Fixed line

  let todo = inp.value;
  if (todo.trim() === "") {
    alert("Please enter a todo item.");
    return;
  }

  todoList.innerHTML += `<li>${todo} <button class="delete-btn">Delete</button></li>`;
  inp.value = ""; // Clear the input field after adding the todo

  todoCount.innerHTML = `Total Tasks: ${todoList.childElementCount}`; // ✅ Moved this below the new item
});
document.getElementById("todo-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const li = e.target.parentNode;
    // Get the <li> that contains the button
    li.parentNode.removeChild(li); // Remove <li> from <ul>

    // Optional: update count
    let todoCount = document.getElementById("todo-count");
    todoCount.innerHTML =
      document.getElementById("todo-list").childElementCount;
  }
});
