import { useState, useEffect, useRef, useCallback, useMemo, useReducer } from 'react'
import tasksAPI from '@/shared/api/tasks'

const tasksReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ALL': {
      return Array.isArray(action.tasks) ? action.tasks : state
    }
    case 'ADD': {
      return [...state, action.task]
    }
    case 'TOGGLE_COMPLETE': {
      const { id, isDone } = action

      return state.map((task) => {
        return task.id === id ? { ...task, isDone } : task
      })
    }
    case 'DELETE': {
      return state.filter((task) => task.id !== action.id)
    }
    case 'DELETE_ALL': {
      return []
    }
    default: {
      return state
    }
  }
}

const useTasks = () => {

  const [tasks, dispatch] = useReducer(tasksReducer, []) // State for tasks array using useReducer with tasksReducer

  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  const [disappearingTaskId, setDisappearingTaskId] = useState(null) // State to track the ID of the task that is currently disappearing
  const [appearingTaskId, setAppearingTaskId] = useState(null) // State to track the ID of the task that is currently appearing

  const newTaskInputRef = useRef(null); // Ref for new task input field


  // Handlers / useCallbacks(memo for functions):

  const deleteAllTasks = useCallback(() => {

    const isConfirmed = confirm("Are you sure you want to delete all tasks?");

      if (isConfirmed) {
        tasksAPI.deleteAll(tasks)
        .then(() => dispatch({ type: 'DELETE_ALL' }))
      } // Dispatch delete all action to clear tasks state after API call

  }, [tasks])

  const deleteTask = useCallback((taskId) => {

    tasksAPI.delete(taskId)
    .then(() => {
      setDisappearingTaskId(taskId) // Set the ID of the task that is disappearing
        setTimeout(() => {
          dispatch({ type: 'DELETE', id: taskId }) // Dispatch delete action to remove task from state after animation duration
          setDisappearingTaskId(null) // Reset disappearing task ID after the task is removed
        }, 400) // Match the duration of the disappearing animation
    })
  }, []);

  const toggleTaskComplete = useCallback((taskId, isDone) => {
    tasksAPI.toggleComplete(taskId, isDone)
    .then(() => {
      dispatch({ type: 'TOGGLE_COMPLETE', id: taskId, isDone }) // Dispatch toggle complete action to update task completion status in state after API call
    })
  }, []
  )

  const addTask = useCallback((title, callbackAfterAdding) => {
      const newTask = {
        title,
        isDone: false,
      };

        tasksAPI.add(newTask)
        .then((addedTask) => {
          dispatch({ type: 'ADD', task: addedTask }) // Dispatch add action to add new task to state after API call
          callbackAfterAdding(); // Call the callback function to clear the new task title input
          setSearchQuery(""); // Clear search query after adding a task
          newTaskInputRef.current.focus(); // Focus the new task input field after adding a task
          setAppearingTaskId(addedTask.id) // Set the ID of the task that is appearing
          setTimeout(() => {
            setAppearingTaskId(null) // Reset appearing task ID after the animation duration
          }, 400) // Match the duration of the appearing animation
        })
  }, []);

  // Effects / Hooks / useMemo (memo for values)



  useEffect(() => {
    newTaskInputRef.current.focus(); // Focus the new task input field when the component mounts
    tasksAPI.getAll()
      .then((serverTasks) => {
        dispatch({ type: 'SET_ALL', tasks: serverTasks }) // Dispatch set all action to initialize tasks state with data from API
    })
  }, [])

  // useMemo (memo for values)

  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase();
    return clearSearchQuery.length > 0
      ? tasks.filter(({ title }) =>
        title.toLowerCase().includes(clearSearchQuery),
        ) // Filter tasks by search query with ternary operator
      : null;
  }, [searchQuery, tasks]);

  return {
    tasks,
    filteredTasks,
    deleteTask,
    deleteAllTasks,
    toggleTaskComplete,
    addTask,
    newTaskInputRef,
    searchQuery, 
    setSearchQuery,
    disappearingTaskId,
    appearingTaskId,
  }
}

export default useTasks;