# Prototype - Authentication service

![CircleCI Status](https://circleci.com/gh/logikaljay/prototype-auth-service.svg?style=shield)

## TODO
* Setup a data layer
* Create some `username`'s/`userId`'s in the data layer
* Sign in should try the whitelist, if no joy, try the data layer
* `lset` the user's token in the whitelist once they are signed in indexed by their `userId`
* Log out a user by their token
* list tokens assigned to `userId`