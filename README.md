# APITest

Setup

1. Clone the repo - https://github.com/denKlimentev/APITest.git
2. cd into api-automation
3. npm install

Running Tests

PRECONDITION : 
I don`t find place when I can get token use API so u need : 
1) open https://gorest.co.in/
2) click link :  Click here to get your access token
3) get token
4) open package.json 
5) put ur token in global variable in testGorestAPI  
"testGorestAPI": "cross-env HOST=https://gorest.co.in/public/v1 TOKEN={token} ./node_modules/mocha/bin/mocha --retries 1 --timeout 50000 --exit"

or use my if that token will be available when u will revue

Run individual file: npm run testGorestAPI test/gorestAPI/userController.js
just run and enjoy


RESULT : 

User Controller - User tests
User process
√ POST - created user verification data
√ GET - created user verification data  (824ms)
√ PUT - update created user verification data  (1710ms)
Create user negative tests
√ POST - created user empty name (920ms)
√ POST - created user wrong gender (920ms)
√ POST - created user wrong gender (921ms)
√ POST - created user wrong gender (921ms)
Update user negative tests
√ PUT - update created  user empty name (813ms)
√ PUT - update created  user wrong gender (818ms)
√ PUT - update created user wrong gender (818ms)
√ PUT - update created  user wrong gender (922ms)


11 passing (20s)
