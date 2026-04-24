import { memo, useContext } from 'react'
import { TodoItem, TasksContext } from '@/entities/todo'

// Component:

const TodoList = (props) => {
const { styles } = props

  const {
    tasks,
    filteredTasks,
  } = useContext(TasksContext)


  // Check for tasks:
  const hasTasks = tasks.length > 0
  const isEmptyFilteredTasks = filteredTasks?.length === 0

  if (!hasTasks) {
    return <div className={styles.emptyMessage}>There are no tasks yet!</div>;
  }

  if(hasTasks && isEmptyFilteredTasks) {
    return <div className={styles.emptyMessage}>No tasks match your search!</div>
  }

  // Render:

  return (
    <ul className={styles.list}>
      {(filteredTasks ?? tasks).map((task) => (
        <TodoItem 
          className={styles.item} 
          key={task.id}
          {...task} 
        />
      ))}
    </ul>
  )
}

export default memo(TodoList)