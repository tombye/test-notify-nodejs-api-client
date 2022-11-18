# Test Notify API client

Script to do a few basic things with the Notify NodeJS API client.

Mostly useful for sending documents to test the Document Download Frontend pages.

## Installation

Run this command to install:
```
npm install
```

Rename `example_config.json` as `config.json` and put values for the environments you need to use.

Running the script:
```
node index.js [environment]
```

Where [environment] is one of:
- local
- preview
- staging
- production
