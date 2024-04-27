# Testing

## Node.JS setup

Our test suite requires Node.JS. The instructions are written for Windows.

Steps:

1. Download Node.JS. Choose your installer based on your computer needs. Open the installer and follow the prompts:

   1.1 Part of the installation process will ask for you to confirm the terms and agreement, destination folder, and custom set-up. Adjust these as needed/ based on personal preferences.

   1.2 Next (on page 5 of instillation), you will be asked about “Tools for Native Modules.” This step will install the necessary tools for npm modules to be compiled from C/C++. Please check this box to download these additional tools.

## Running test suites

1. Clone this branch: `git clone https://github.com/eunsikim/task-master.git`
2. Checkout testing branch: `git checkout test`
3. Execute command `npm install`
4. Execute tests: `npm run test`

## A brief description of the functionality after sprint / revised test suite

In our final sprint, we added testing functions were the user can add a location, deadline, and note to any task (though it is optional). The user can also edit them as needed, and leave them blank; this is different from the task name which is a mandatory field.

## A brief description from sprint 1

Our test cases cover 3 primary functions of our task management software, TaskMaster. The user should be able to create an account, using a username and password that meets the correct parameters (i.e username must be an email address with a @ and period included, and password meets minimum length). The second function is that the user should be able to successfully login if the username and password match with what is listed in the database. The third function is that users will be able to create, edit/ update, and delete a task on the main page.
