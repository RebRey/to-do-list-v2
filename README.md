# to-do-list
Update to-do-list app and use Mongoose with MongoDB.

## Objective:
Create a to-do-list web app.

## Set-Up:
1) Create the following files:
* app.js
* date.js
* index.html

2) Create the following folders and files:
* public (folder) > css (folder) > styles.css (file)
* views (folder) > about.ejs, footer.ejs, header.ejs, list.ejs

## Modules:
On the Command Line Interface (CLI) cd into your project and do the following:
1) Initialize npm. Follow the prompts on the CLI. This will create a package.json file.
```
  $ npm init
```

2) Install npm in the current project folder. This will create a package-lock.json file. 
```
  $ npm install
```

3) Use npm to install express in the current project folder. You can check that it is installed in the package.json file under dependencies. 
```
  $ npm install express
```

4) Use npm to install body-parser in the current project folder.You can check that it is installed in the package.json file under dependencies. 
```
  $ npm install body-parser
```

5) Use npm to install ejs in the current project folder. You can check that it is installed in the package.json file under dependencies. 
```
  $ npm install ejs
```

6) Install Mongoose using npm. See documentation here: [Click Me](https://www.npmjs.com/package/mongoose) 
```
npm install mongoose
```

7) Use npm to install lodash in the current project folder. You can check that it is installed in the package.json file under dependencies. 
```
  $ npm install lodash
```

8) Use npm to install dotenv in the current project folder. You can check that it is installed in the package.json file under dependencies. 
```
  $ npm install dotenv
```
* to view dotenv's readme use npm:
```
  $ npm docs dotenv
```
MAKE SURE YOU ADD .env to .gitignore BEFORE COMMITTING this will prevent your .env with your secrets from getting added to the repository. 

When you install Mongoose this will do the following:
* Downloads the Mongoose package and the dependencies it requires
* Saves the package in the node_modules directory
* Records the dependency information in the package.json file 

## Methods Used:
* **getDay()** JavaScript method that returns the day of the week for the specified date according to local time, where 0 represents Sunday.

* **toLocaleDateString()** JavaScript method that returns a string with a language-sensitive representation of the date portion of the specified date in the user agent's timezone.

* **res.write()** Node.js method that can be called multiple times. The first time res.write() is called, it will send the buffered header information and the first chunk of the body to the client. The second time res.write() is called, Node.js assumes data will be streamed, and sends the new data separately. That is, the response is buffered up to the first chunk of the body.

* **res.send()** Express.js method that can only be called once. It Sends the HTTP response.

* **res.sendFile()** Express.js method that transfers the file at the given path. 

* **res.redirect()** Express.js method that redirects to the URL derived from the specified path.


## Lessons Learned
I learned how to:

** use Express.js to build a web application and a server.

* use Embedded JavaScript (EJS) templating to change certain parts of the HTML depending on the logic in my server.

* use the scriptlet ejs tag to run some basic JavaScript code namely for control flow purposes, no output.

* pass data from the ejs template to a server.

* create an HTML form inside the ejs file that has a single text input that is going to take whatever value the user types in there as the next to do list item, and then the user hits the submit button that is going to make a POST request to the home route.

** use an array to store items in a collection.

** add pre-made CSS stylesheets to a website.

** pass functions and data between files by creating local modules and exporting them with node.js.