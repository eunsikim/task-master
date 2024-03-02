//this script is for when the task is created, edited, or deleted

const taskArray = [];

//task will be added to taskArray
function addToArray(taskArray) {
  //code to add task to Array
  return taskArray;
}

// function for checking the length of a task
function taskLength(title) {
  //code should be at least 1 character long, but not more than 255 characters long
  //if task name is empty or too long, return error
  if (title.length >= 1 && title.length <= 255) {
    console.log("True: there is text in the task box " + title);
  } else {
    console.log("False: task box is empty or too long " + title.length);
  }

  return title;
}

// function for editing the task name
function editTaskName(originalTitle, editedTitle) {
  //code to edit task name
  //if edited task name is blank, create an error message
  if (editedTitle === "") {
    console.log("Task is empty; please review task name");
  } else if (originalTitle === editedTitle) {
    return originalTitle;
  } else if (originalTitle !== editedTitle) {
    return editedTitle;
  }
}

//function for deleting the task
function deleteTask(task, taskListArray) {
  //code to remove task
  return task;
}

module.exports = taskLength;
module.exports = editTaskName;
module.exports = deleteTask;
