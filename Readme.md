DB Updating Table Dev Challenge
===============================

This module contains a development challenge for DB recruitment.

Assumptions:
* topic /fx/prices sends updates each seconds.

Design
---
It is divided into 4 parts.

* BidTable (component) : Acts as a controller which renders the Table(View) and subscribe a topic
                         "bidTable/data/updated" to receive the updates as soon as bidDataModel gets updated.
                        
* TableCreator (View) : Contains only the view part. Generates the HTML Table based on the column 
                        config and data passed to it.
                        
* BidTableModel (Model): Acts as a data model which stores updated data and tableLookup hashMap for faster processing of data.
                         It maintain the array as data storage which contains object with unique name.   
                                
* BidObservable : Observer which allows to subscribe for a topic and attach a callback to it such that 
                  whenever that topic event gets fired it calls the callbacks assigned to it.

Updates are streamed into the application via sockets on Stomp. These updated data updates the data store(BidTableModel)
in the model. 
And notify the BidObservable which in turns notify the BidTable(controller) regarding the new updates.
BidTable passes the data to the view and the view re-renders the table body again after sorting it.

Usage
-----

### Build/Compile Dependency ###
* webpack - concatenates all JS files to a single file and also a build script and live reloader.
* babel - transpiles ES6 syntax to ES5 which runs in modern browsers
* less-loader - to convert less to css during build used by webpack

### Test Dependency (node modules) ###
* jasmine
* karma 
* karma-chrome-launcher
* karma-webpack

In order to use this program, you need to add junit for testing purpose.

### How to run? ###
```
Steps:
* cd to the directory (contains package.json)
* execute npm install (if not done)
* execute npm run start
```

This will start a development server (using webpack)
that supports hot reloading but also provides a stomp/ws endpoint providing fake
fx updates.

Once you've started the development server, navigate to http://localhost:8011
to get started and view the sorted table with real time data.

### How to run test suit? ###
```
Steps:
* cd to the directory (contains package.json)
* execute npm install (if not done)
* execute npm run test (use npm run test-win for windows)
* 
```

Test Suite contains 5 different test cases.
It should print  Executed 5 of 5 SUCCESS (0.013 secs / 0.005 secs) at last for successful test pass.
  
##### Troubleshoot (windows) #####
'karma' is not recognized as an internal or external command in  windows.

```
Solution: 
1. npm install -g karma-cli
```

libraries/frameworks that can be used for better performance.
----
ReatJs with redux can be used for better performance and better code maintenance.
ReactJs allows to create reusable components with low coupling and makes maintainability easier.
In this project ReactJs can be used to create a reusable Table components that takes the data via props and renders the table.
Updating the state will not render the whole table again it renders the part of the DOM which was changed/updated. 
It increases the performance 

Redux can be used as a state/data container which holds the data at a global level and pass
the data to component which acquires it.
such that we don't have to maintain the data in state in every components.


Contact details
---
if you have trouble running it you can get in touch with me on my email id.

email id: abhishek1.dhn@gmail.com

Name: Abhishek Kumar
