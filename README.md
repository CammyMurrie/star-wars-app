DESIGN DECISIONS
1. Javascript framework/library used in React.js, only because this is what I am most comfortable with and knew I could manage the pagination through application state (Redux).

INSTRUCTIONS FOR RUNNING...

1. cd into the star-wars-app directory.
2. run *install_app.bat* file (this contains initial npm install with node module dependencies for the project).
3. open package.json and replace *192.168.1.12:8080* under scripts section with your own LAN ip address (get that by running ipconfig in cmd),
this will allow you to view the application on devices other than the one running webpack-dev-server by visiting the specified url.
4. the dev server can be started by running *npm start* in the star-wars-app directory, the tests can be run using *npm test*
