console.log("App is working!");

document.addEventListener("DOMContentLoaded", function () {
  const todoList = document.getElementById("todoList");

  /**This adds the created task to the to-do modal (Kaylynn) */
  const modalAddButton = document.querySelector("#addTaskModal .skillAdd");
  const modalTaskName = document.getElementById("taskInputName");
  const modalTaskDesc = document.getElementById("taskInputDescription");
  const modalDeadline = document.querySelector("#addTaskModal input[type='date']");
  const modalPriority = document.getElementById("priorityRange");

  modalAddButton.addEventListener("click", function () {
    const name = modalTaskName.value.trim();
    const description = modalTaskDesc.value.trim();
    const deadline = modalDeadline.value || "TBD";
    const priority = modalPriority.value;

    if (name !== "") {
      const newTask = document.createElement("li");
      newTask.className = "list-group-item list-group-item-action d-flex justify-content-between align-items-center";
      newTask.setAttribute("data-bs-toggle", "modal");
      newTask.setAttribute("data-bs-target", "#taskModal");

      newTask.innerHTML = `
        <div>
          <strong>${name}</strong><br>
          <small>${description}</small>
        </div>
        <span class="fs-6">Deadline: ${deadline} | Priority: ${priority}</span>
      `;

      todoList.appendChild(newTask);

      /**This clears the input in modal (Kaylynn) */
      modalTaskName.value = "";
      modalTaskDesc.value = "";
      modalDeadline.value = "";
      modalPriority.value = "5";

      /**This closes the modal (Kaylynn) */
      const modalElement = document.getElementById("addTaskModal");
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide();
    }
  });
});

/**This is the search function (Kaylynn)*/
const searchInput = document.getElementById("skillSearch");

searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const filter = searchInput.value.toLowerCase();
    const allTasks = document.querySelectorAll("#todoList li, #completedList li");
    let found = false;

    allTasks.forEach(task => {
      const text = task.textContent.toLowerCase();

      if (!found && text.includes(filter)) {
        task.scrollIntoView({ behavior: "smooth", block: "center" });
        task.classList.add("bg-primary", "text-white", "fw-bold");
        setTimeout(() => {
          task.classList.remove("bg-primary", "text-white", "fw-bold");
        }, 6000);

        found = true;
      }
    });

    if (!found) {
      alert("No matching task found.");
    }
  }
});

// Sample data for tasks
const tasks = [
    { id: 1, status: 'finished' },
    { id: 2, status: 'ongoing' },
    { id: 3, status: 'finished' },
    { id: 4, status: 'ongoing' },
    { id: 5, status: 'finished' }
];

// Function to update statistics
function updateStats(taskList) {
    const total = taskList.length;
    const finished = taskList.filter(task => task.status === 'finished').length;
    const ongoing = taskList.filter(task => task.status === 'ongoing').length;

    // Update the stats in the HTML
    document.getElementById('totalTasks').textContent = total;
    document.getElementById('ongoingTasks').textContent = ongoing;
    document.getElementById('finishedTasks').textContent = finished;

    // Update progress bar
    const percent = total > 0 ? Math.round((finished / total) * 100) : 0;
    const progressBar = document.getElementById('progressBar');

    progressBar.style.width = percent + '%';
    progressBar.setAttribute('aria-valuenow', percent);
    progressBar.textContent = percent + '%';
}

updateStats(tasks);
