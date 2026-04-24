import { useContext } from 'react';
import Field from '@/shared/ui/Fields';
import { TasksContext } from '@/entities/todo';

// Component:

  const SearchTaskForm = (props) => {
  const { styles } = props

  const { searchQuery, setSearchQuery } = useContext(TasksContext) // Use context to get searchQuery and setSearchQuery

  // Render:

  return (
    <form className={styles.form}
      onSubmit=
      {(event) => {
        event.preventDefault();
      }}
    >
      <Field
        className={styles.field}
        label="Search task"
        id="search-task"
        type="search"
        value={searchQuery}
        onInput={(event) => setSearchQuery(event.target.value)}
      />
    </form>
  );
}

export default SearchTaskForm