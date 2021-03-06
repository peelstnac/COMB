# COMB
[![Build Status](https://travis-ci.org/peelstnac/COMB.svg?branch=master)](https://travis-ci.org/peelstnac/COMB)
> Packet sniffing made easy.

## What is COMB?
COMB is a packet sniffer that can stream sniffing data to a central dashboard, making it easier to manage multiple systems. As of now, COMB is functional, but in it's early phase of development (see issues).

![Image of COMB landing page](https://i.imgur.com/zC1HlfK.png)
![Image of COMB dashboard](https://i.imgur.com/4v3u5s7.png)

## Table of Contents
* [Building](#building)
    * [Development](#development)
        * [Build the packet sniffer](#build-the-packet-sniffer)
        * [Launch the server](#launch-the-server)
    * [Production](#production)
* [Environment variables](#environment-variables)
* [File structure](#file-structure)
* [Testing](#testing)

## Building
Below are build instructions for development and production.
* Clone the repository.
```
git clone https://github.com/peelstnac/COMB
cd COMB
```

### Development
#### Build the packet sniffer
```
cd src/packet-sniffer
chmod +x build-dev.sh
./build-dev.sh
```
* Run it by doing
```bash
sudo build/packet-sniffer
```

#### Launch the server
* Launch the React app and Express server.
```
# React app
cd src/platform/client
npm start
# Express server
cd ../server
npm run dev
```

### Production
* Similar to production.
* Instead of running build-dev.sh, run build.sh for the packet sniffer.
* When launching the React app, do ```npm run build``` and then ```npm serve -p 3000 -s build``` instead.
* WHen launching the Express server, run ```npm start``` instead.
* Ensure HTTPS & URL in src/packet-sniffer/update.c is pointing to your server address instead of localhost.

## Environment variables
* See File Structure below to see where to put the .env files.
```
PORT=4000
DATABASE_PASSWORD=
DATABASE_NAME=
SESSION_SECRET=
```

## File structure
* Below is the file structure for this project.
* src/packet-sniffer:
```
.
├── build-dev.sh
├── build.sh
├── CMakeLists.txt
├── handle_ethhdr.c
├── handle_ip.c
├── handle_tcp.c
├── helper_functions.c
├── include
│   ├── handle_ethhdr.h
│   ├── handle_ip.h
│   ├── handle_tcp.h
│   ├── helper_functions.h
│   ├── main.h
│   ├── start.h
│   └── update.h
├── main.c
├── start.c
└── update.c

1 directory, 17 files
```
* src/platform/client:
```
.
├── package.json
├── package-lock.json
├── public
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
└── src
    ├── actions
    │   ├── switchPage.js
    │   └── updateAuth.js
    ├── App.js
    ├── components
    │   ├── assets
    │   │   ├── 1.png
    │   │   ├── 2.png
    │   │   └── bg.png
    │   ├── dashboard.js
    │   ├── landing.js
    │   ├── login.js
    │   ├── notAuthCard.js
    │   └── registerStatusCard.js
    ├── constants
    │   ├── auth.js
    │   └── page.js
    ├── fonts
    │   └── FREESCPT.TTF
    ├── index.js
    ├── main.css
    ├── main.css.map
    ├── main.scss
    ├── reducers
    │   ├── authReducer.js
    │   ├── pageReducer.js
    │   └── rootReducer.js
    ├── scss_dashboard.scss
    ├── scss_fancy_button.scss
    ├── scss_landing.scss
    ├── scss_login.scss
    ├── scss_mixins.scss
    └── store.js

8 directories, 32 files
```
* src/platform/server:
```
.
├──.env
├── constants
│   └── URL.js
├── models
│   └── login.js
├── package.json
├── package-lock.json
├── routes
│   ├── auth.js
│   └── dashboard.js
├── server.js
└── tcpServer.js

3 directories, 9 files
```

## Testing
* Some test login accounts
```
test username: test
test password: sguhjoepf
test username: test1
test password: sguhjoepf
```
