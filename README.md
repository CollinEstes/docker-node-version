# docker-node-version
PostInstall utility for applying version to Docker-compose files in Node.js projects.


When using docker/docker-compose to operate a Node.js project,
this utility can be run on "postversion to update the project's docker-compose.yml file to add the version from the project's package.json
to the image to be built.

This enables versioned docker image builds for Node.js containers.


## To use

1.  Your project must be configured to use a Dockerfile and docker-compose file at the root of your project.  Expected that the docker-compose file will build and name the image for the service.


2.  Install docker-node-version to devDependencies

    ```
    npm install docker-node-version --save-dev
    ```


3.  Add the following line to your package.json NPM scripts.

    ```
    postversion: "node ./node_modules/docker-node-version"
    ```




    > for an example project can be found [here](https://github.com/CollinEstes/docker-node-oracle-example)