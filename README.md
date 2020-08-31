# COMB
> Packet sniffing made easy.

## What is COMB?
COMB allows packet sniffers on remote systems to upload their data to a central platform where users can analyze the aggregated data with a sleek GUI (output console, graphs, graphics, etc).

## Building
```
chmod u+x build.sh
./build.sh
```
To execute,
```
cd build
sudo ./packet-sniffer
```

## Development
File structure
```
.
├── README.md
├── src
│   └── platform
│       ├── client
│       │   ├── package.json
│       │   ├── package-lock.json
│       │   ├── public
│       │   │   ├── index.html
│       │   │   ├── manifest.json
│       │   │   └── robots.txt
│       │   ├── README.md
│       │   └── src
│       │       ├── actions
│       │       │   ├── switchPage.js
│       │       │   └── updateAuth.js
│       │       ├── App.js
│       │       ├── components
│       │       │   ├── assets
│       │       │   │   ├── 1.png
│       │       │   │   └── 2.png
│       │       │   ├── dashboard.js
│       │       │   ├── fonts
│       │       │   │   └── FREESCPT.TTF
│       │       │   ├── landing.css
│       │       │   ├── landing.js
│       │       │   ├── login.css
│       │       │   ├── login.js
│       │       │   ├── notAuthCard.js
│       │       │   ├── registerStatusCard.js
│       │       │   └── shared.css
│       │       ├── constants
│       │       │   ├── auth.js
│       │       │   └── page.js
│       │       ├── index.js
│       │       ├── reducers
│       │       │   ├── authReducer.js
│       │       │   ├── pageReducer.js
│       │       │   └── rootReducer.js
│       │       └── store.js
│       └── server
│           ├── constants
│           │   └── URL.js
│           ├── models
│           │   └── login.js
│           ├── package.json
│           ├── package-lock.json
│           ├── routes
│           │   └── auth.js
│           └── server.js
├── tree.txt
└── ui-prototypes
    ├── assets
    │   ├── 1.png
    │   └── 2.png
    ├── fonts
    │   └── FREESCPT.TTF
    ├── landing.css
    ├── landing.html
    └── Landing Page (Adobe XD).xd
```

## Testing
test username: test
test password: sguhjoepf

test username: test1
test password: sguhjoepf