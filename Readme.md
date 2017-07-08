#Skeleton for React Node Express GraphQL

I have written this skeleton for developing any webapp that is going to use a React and GraphQL Express Node server. This is useful as a beginner who wants to learn webapp programming.  It has the basic setup for anyone to start with the project.

### Installing

 #### Installing Node Packages

 From the shell, run **_npm install_** inside the cloned folder,

 ```shell
 vagrant@comp1:/vagrant/codingservice$ npm install
 ```

 #### Build
 
 From the shell, run **_npm run build_**.

 ```
 vagrant@comp1:/vagrant/codingservice$ npm run build
 ```

 The build process will be in continous mode. After running the above command leave the terminal for continous build to happen.

 #### Starting the server

 ##### App (SPA)
 From a different shell, run a **_npm run app_**.

 ```
 vagrant@comp1:/vagrant/codingservice$ npm run app
 ```

 From you host machine, you can browse localhost::8080. You can see the port number in the log printed by the above command.

 ##### Controller
 From a different  shell, run a **_npm start_**.

 ```
 vagrant@comp1:/vagrant/codingservice$ npm start
 ```

 From you host machine, you can browse localhost::8081. You can see the port number in the log printed by the above command.

 Once these two services are started, there is no need to restart either of them. Any changes to your source will be reflected immediately.
