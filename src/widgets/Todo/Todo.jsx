import { useContext } from 'react'
import AddTaskForm from '@/features/add-task'
import SearchTaskForm from '@/features/search-task'
import TodoInfo from '@/features/stats'
import { TodoList } from '@/entities/todo'
import Button from '@/shared/ui/Button'
import { TasksContext } from '@/entities/todo'
import RouterLink from '@/shared/ui/RouterLink'
import styles from './Todo.module.scss'


const Todo = () => {
  const { firstIncompleteTaskRef } = useContext(TasksContext);

  // Render:

  return (
    <div className={styles.todo}>
      <h1 className={styles.title}>To Do List</h1>
      <AddTaskForm styles={styles}/>
      <SearchTaskForm styles={styles}/>
      <TodoInfo styles={styles}/>
      <RouterLink 
        to="/about"
        style={{ textDecoration: 'none' }}
      >
        Go to About Page
      </RouterLink>
      <Button
        onClick={() =>
          firstIncompleteTaskRef.current?.scrollIntoView({
            behavior: "smooth",
          })
        }
      >
        Show first incomplete task
      </Button>
      <TodoList styles={styles}/>
    </div>
  )
}

export default Todo