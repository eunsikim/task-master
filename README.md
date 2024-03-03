## Setting Up Test Suite

Our test suite requires the installation of Jest, as it will work will with React and overall is easy to use. Node.JS will also need to be installed. The instructions are written for Windows, and the Integrated Development Environment used is Visual Studio Code.

Steps:

1. Download Node.JS. Choose your installer based on your computer needs. Open the installer and follow the prompts:

1A. Part of the installation process will ask for you to confirm the terms and agreement, destination folder, and custom set-up. Adjust these as needed/ based on personal preferences.

1B. Next (on page 5 of instillation), you will be asked about “Tools for Native Modules.” This step will install the necessary tools for npm modules to be compiled from C/C++. Please check this box to download these additional tools.

1C. Click continue to complete installation process of Node.JS.

2. Once Node.JS. has been downloaded, open the main folder containing our project in your IDE.

3. Open the terminal in your IDE. Type: `npm init-y`. This should create or modify a “package.json” file.

4. Again in the terminal, type: `npm install --save-dev jest`. This should create or modify a “package-file.json” file.

## Running test suites

1. Clone this branch: `git clone https://github.com/eunsikim/task-master.git`
2. Checkout testing branch: `git checkout 5-authentication-test-1`
3. Execute command `npm install`
4. Execute tests: `npm test`

## A brief description of the functionality the software should have after all code is implemented using the test cases in the next phase of the project

Our test cases cover 3 primary functions of our task management software, TaskMaster. The user should be able to create an account, using a username and password that meets the correct parameters (i.e username must be an email address with a @ and period included, and password meets minimum length). The second function is that the user should be able to successfully login if the username and password match with what is listed in the database. The third function is that users will be able to create, edit/ update, and delete a task on the main page.
