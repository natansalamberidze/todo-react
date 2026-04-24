const useTasksLocalStorage = () => {
  const savedTasks = localStorage.getItem("tasks"); // Load tasks from local storage

  const saveTasks = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Save tasks to local storage
  }

  return {
    savedTasks: savedTasks ? JSON.parse(savedTasks) : null,
    saveTasks
  }
}

export default useTasksLocalStorage;