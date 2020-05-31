# XT Coding Assignment
A baseline for server side rendering for XT Coding Assignment. 

## Getting started
Clone the repo with
```git clone https://nir123@bitbucket.org/nir123/spx.git```

Install dependencies with
```yarn intsall```

Run dev mode with
```yarn dev```

Now open the browser and navigate to `http://localhost:2048` and you get your server rendered React app. You can inspect the page source and see that the html coming from your local server has all the nodes defined in the React app.

### A few notes
* I tried to complete all the feature whatever provided in the assignment 
* I am starting the server with the `index.js` file which is in the root folder. This file loads the babel-register and sets up the babel plugins needed to run JSX and ESModules on the server.
* The node server needs to handle the static files from the `dist` folder.
* The entry point of the bundle is called `client.js` because it's the only part of our application that is not used for the server render.
* I have handled the SEO thing with react-helmet