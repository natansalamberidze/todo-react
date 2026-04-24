import { useRef } from 'react';

const useIncompleteTaskScroll = (tasks) => {

  const firstIncompleteTaskRef = useRef(null); // Ref for first incomplete task
  
  const firstIncompleteTaskId = tasks.find(({ isDone }) => !isDone)?.id; // Find the first incomplete task
  
  return { 
    firstIncompleteTaskRef,
    firstIncompleteTaskId
  }
}

export default useIncompleteTaskScroll;