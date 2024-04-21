# Testing

## Node.JS setup

Our test suite requires Node.JS. The instructions are written for Windows.

Steps:

1. Download Node.JS. Choose your installer based on your computer needs. Open the installer and follow the prompts:

    1.1 Part of the installation process will ask for you to confirm the terms and agreement, destination folder, and custom set-up. Adjust these as needed/ based on personal preferences.

    1.2 Next (on page 5 of instillation), you will be asked about “Tools for Native Modules.” This step will install the necessary tools for npm modules to be compiled from C/C++. Please check this box to download these additional tools.

## Running test suites

2. Checkout testing branch: `git checkout test`
3. Execute command `npm install`
4. Execute tests: `npm test`

## A brief description of the functionality the software should have after all code is implemented using the test cases in the next phase of the project

Our test cases cover 3 primary functions of our task management software, TaskMaster. The user should be able to create an account, using a username and password that meets the correct parameters (i.e username must be an email address with a @ and period included, and password meets minimum length). The second function is that the user should be able to successfully login if the username and password match with what is listed in the database. The third function is that users will be able to create, edit/ update, and delete a task on the main page.
