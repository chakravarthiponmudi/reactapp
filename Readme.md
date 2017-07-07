# Coding Service

Coding is the single largest piece of non-care work for which our clients are solely responsible.  They are also often not great at it, which causes downstream effects when they get denials from poorly coded claims. In the short term, there is an urgent need for our smaller hospital clients who do not have the in-house expertise in coding that larger health systems do and are looking to outsource this work.
In the longer term, we think this is something that we could expand beyond small hospitals and sell to a majority of our clients of all sizes.  To this end, we see an opportunity to provide a white-label coding service for any of our clients who are on clinicals where we partner with coding vendors who will perform coding for them.
We plan to build this service as a new application outside of athenanet, using modern UI and JavaScript web application frameworks, containerization for security and scalability, and built using a microservice architecture.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

1. Install [Vagrant](https://www.vagrantup.com/downloads.html) and [VirtuaBox](https://www.virtualbox.org/wiki/Downloads).
2. Download [dev-vm](https://gitlab.athenahealth.com/cdc/dev-vm). Read more about AthenaNet Platform 2.0 [here](https://intranet.athenahealth.com/wiki?ID=120181)
   1. After downloading, dev-vm, make the following changes in the VagrantFile. More details on the commands can be found in the  [vagrant docs](https://www.vagrantup.com/docs/index.html)

        ```shell
        #If you want NPM and Docker on the VM, uncomment the next two lines
        config.vm.provision :shell, :path => "npm.sh"
        config.vm.provision :shell, :path => "docker.sh"
        ```

   2. Port Fowarding.

      We will need two ports to be forwarded from our vitual box machine to host our SPA App and Node Controller. Add the below two lines to the VagrantFile  after the existing port forwarding conf.

        ```
        config.vm.network "forwarded_port", guest: 8080, host: 8080 # coding service SPA
        config.vm.network "forwarded_port", guest: 8081, host: 8081 # coding service Controller
        ```

   3. cd into the dev-vm folder and run git clone command

        ```shell
        git clone https://pchakravarthi@gitlab.athenahealth.com/pchakravarthi/codingservice.git
        ```

   4. Start your virutal machine (If your host machine is windows, check the below section on "Windows User")

        ```
        #if you have already run Vagrant up before changing the vagrant file,
        # run the command with 'provision' option
        run vagrant up --provision.
        ```
   5. Synced_folder:- All the files under dev-vm can be directly accessed in vagrant virutal box machine under the path **/vagrant** by default. Now you can see the contents of codingservice in your devvm machine.

        ```

        #issue the below command from the path where the vagrantfile is placed.i.e, your dev-vm folder in this case.
        vaagrant ssh

        vagrant@comp1:~$ ls /vagrant -al
        total 30
        drwxrwxrwx  1 vagrant vagrant 4096 Jul  5 03:43 .
        drwxr-xr-x 23 root    root    4096 Jul  5 03:42 ..
        -rwxrwxrwx  1 vagrant vagrant  143 Jul  5 01:45 clean.sh
        drwxrwxrwx  1 vagrant vagrant 4096 Jul  5 03:45 codingservice
        -rwxrwxrwx  1 vagrant vagrant   86 Jul  5 01:45 destroy
        -rwxrwxrwx  1 vagrant vagrant   33 Jul  5 01:45 destroy.bat
        -rwxrwxrwx  1 vagrant vagrant  430 Jul  5 01:45 docker.sh
        drwxrwxrwx  1 vagrant vagrant 4096 Jul  5 04:03 .git
        -rwxrwxrwx  1 vagrant vagrant   35 Jul  5 01:45 .gitignore
        drwxrwxrwx  1 vagrant vagrant    0 Jul  5 01:45 metrics
        -rwxrwxrwx  1 vagrant vagrant  155 Jul  5 01:45 npm.sh
        drwxrwxrwx  1 vagrant vagrant    0 Jul  5 01:45 puppet
        -rwxrwxrwx  1 vagrant vagrant 2775 Jul  5 01:45 readme.md
        -rwxrwxrwx  1 vagrant vagrant  358 Jul  5 01:45 setup
        -rwxrwxrwx  1 vagrant vagrant  240 Jul  5 01:45 setup.bat
        drwxrwxrwx  1 vagrant vagrant    0 Jul  5 01:59 tmp
        drwxrwxrwx  1 vagrant vagrant    0 Jul  5 01:56 .vagrant
        -rwxrwxrwx  1 vagrant vagrant 6380 Jul  5 03:40 Vagrantfile
        ```

### If you are a windows user

If your host operating system is windows, then there are certain issues that vagrant will pose.

#### Symbolic links

Windows ships with the permission to create symbolic links turned off for users. However, npm loves to use symbolic links. So when you try to run npm install on the virtual machine within the shared folder, you end up getting errors because the Windows host will not allow the symbolic links to be created.

##### Solution

There are two steps to the Solution
###### Give yourself permission to create symlinks

- Start -> Run: secpol.msc
- Browse to: Security Settings -> Local Policies -> User Rights Assignments
- Double-click Create symbolic links
- Add yourself to the list of allowed users

###### Disable UAC

If you are not an administrator then you can skip this step. If you are an administrator, then this step is required because otherwise you need to elevate permissions via the UAC prompt before making symlinks. And vagrant won’t trigger the UAC prompt and so it just errors out.

Disable UAC:

- Start -> Control Panel -> Uer Accounts
- Change User Account Control settings
- Slide the slider down to Never notify

Finally, reboot for these changes to take effect.

### Installing

#### Installing Node Packages

From the Vagrant shell, run **_npm install_** inside the codingservice folder,

```shell
vagrant@comp1:/vagrant/codingservice$ npm install
```

#### Build

From the Vagrant shell, run **_npm run build_**.

```
vagrant@comp1:/vagrant/codingservice$ npm run build
```

The build process will be in continous mode. After running the above command leave the terminal for continous build to happen.

#### Starting the server

##### Coding Service App (SPA)
From a different Vagrant shell, run a **_npm run app_**.

```
vagrant@comp1:/vagrant/codingservice$ npm run app
```

From you host machine, you can browse localhost::port. You can see the port number in the log printed by the above command.

##### Coding Service Controller
From a different Vagrant shell, run a **_npm start_**.

```
vagrant@comp1:/vagrant/codingservice$ npm start
```

From you host machine, you can browse localhost::port. You can see the port number in the log printed by the above command.

Once these two services are started, there is no need to restart either of them. Any changes to your source will be reflected immediately.

## Running the tests


**#####################TODO################################**

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
