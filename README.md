# Prototype - Authentication service

![CircleCI Status](https://circleci.com/gh/logikaljay/prototype-auth-service.svg?style=shield)

Authentication REST API service that uses redis for a token whitelist.

1. [Setup](#setup)
    1. [Dependencies](#dependencies)
    1. [Install](#install)
1. [Endpoints](#endpoints)
1. [Usage](#usage)
    1. [Get a token](#get-a-token)
    1. [List all tokens](#list-all-tokens)
    1. [Delete a token](#delete-a-token)
    1. [Validate a token](#validate-a-token)
    1. [Validate a token (less secure but much faster)](#validate-a-token-less)
1. [Benchmarks](#benchmarks)
1. [Todo](#todo)



<a name="setup"></a>
# Setup

<a name="dependencies"></a>
## Dependencies
1. Docker
2. Node v4.2.2

<a name="install"></a>
## Install
1. Clone the repository
    ```bash
    $ git clone https://github.com/logikaljay/prototype-auth-service
    Cloning into 'prototype-auth-service'...
    remote: Counting objects: 145, done.
    remote: Compressing objects: 100% (83/83), done.
    remote: Total 145 (delta 34), reused 0 (delta 0), pack-reused 62
    Receiving objects: 100% (145/145), 22.83 KiB | 0 bytes/s, done.
    Resolving deltas: 100% (52/52), done.
    Checking connectivity... done.
    ```

2. Change directory into the cloned repository
    ```bash
    $ cd prototype-auth-service
    ```

3. Install node dependencies
    ```bash
    $ npm install
    ```

4. Start redis docker container
    ```bash
    $ ./scripts/start-redis.sh 
    Unable to find image 'redis:latest' locally
    latest: Pulling from library/redis
    c950d63587be: Pull complete 
    ...
    983055d62ddd: Pull complete 
    Digest: sha256:4db2d14088d8bf21d9541010fdbca78697bd9dd51010728f50ee8f7893321367
    Status: Downloaded newer image for redis:latest
    d9e1de4982ddea060c06df6d30b68671dc1370d9ca2ada46b20b8beddc02031f
    ```

5. Run tests
    ```bash
    $ npm test
    
    > prototype-auth-service@0.0.0-semantic-release test /home/user/prototype-auth-service
    > lab
    
    Hapi listening on http://127.0.0.1:8080
    
    ......
    
    6 tests complete
    Test duration: 72 ms
    No global variable leaks detected
    ```

6. Start service
    ```bash
    $ npm start
    
    > prototype-auth-service@0.0.0-semantic-release start /home/user/prototype-auth-service
    > node index
    
    Hapi listening on http://127.0.0.1:8080
    ```

<a name="endpoints"></a>
# Endpoints
* GET / - return list of active tokens
* POST / - log in
* DELETE / - log out

<a name="usage"></a>
# Usage

<a name="get-a-token"></a>
## Get a token
```bash
$ curl -X "POST" http://localhost:8080/ -H "Content-Type: application/json" -d '{"userName": "some.fake@user.co", "password": "password1" }'
```
Output
```json
{
    "userId":"fs8sy22i9",
    "token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6InNvbWUuZmFrZUB1c2VyLmNvIiwidXNlcklkIjoiZnM4c3kyMmk5Iiwic2Vzc2lvbklkIjoiZThiZDI1NDUzNTUxNDk4MDhmMTkwZDNkMGM4MDlhMGMiLCJpYXQiOjE0NTEyNzQ1Mjd9.KqqSB3cCwpeYae3DgmLlvgcw0ZIMMID962HVfTaFRuE"
}
```

<a name="list-all-tokens"></a>
## List all tokens
```bash
$ curl -X "GET" http://localhost:8080/ -H "Content-Type: application/json" -H "Authorization: Bearer TOKEN"
```

Output
```json
[
    {
        "sessionId":"378424be897e4903b69842eb6f9429b2",
        "token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6InNvbWUuZmFrZUB1c2VyLmNvIiwidXNlcklkIjoiZnM4c3kyMmk5Iiwic2Vzc2lvbklkIjoiMzc4NDI0YmU4OTdlNDkwM2I2OTg0MmViNmY5NDI5YjIiLCJpYXQiOjE0NTEyNzQ5MDV9.OdeQAqxfYtjUE9IO5wfAosaaoRkMvpCBV72C81mhzRw"
    },
    {
        "sessionId":"37fb84e8525c40fdb5a682bc9ef09ed7",
        "token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6InNvbWUuZmFrZUB1c2VyLmNvIiwidXNlcklkIjoiZnM4c3kyMmk5Iiwic2Vzc2lvbklkIjoiMzdmYjg0ZTg1MjVjNDBmZGI1YTY4MmJjOWVmMDllZDciLCJpYXQiOjE0NTEyNzQ5MDF9.f_9jWUyLya2cFW6mMWo1f27vzBAdiYvvpfl0S7zKWV8"
    },
    {
        "sessionId":"e8bd2545355149808f190d3d0c809a0c",
        "token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6InNvbWUuZmFrZUB1c2VyLmNvIiwidXNlcklkIjoiZnM4c3kyMmk5Iiwic2Vzc2lvbklkIjoiZThiZDI1NDUzNTUxNDk4MDhmMTkwZDNkMGM4MDlhMGMiLCJpYXQiOjE0NTEyNzQ1Mjd9.KqqSB3cCwpeYae3DgmLlvgcw0ZIMMID962HVfTaFRuE"
    }
]
```

<a name="delete-a-token"></a>
## Delete/revoke a token
```bash
$ curl -X "DELETE" http://localhost:8080/ -H "Content-Type: application/json" -H "Authorization: Bearer TOKEN"
```

Output
```json
{
    "status":"Token removed"
}
```

<a name="validate-a-token"></a>
## Validate a token
```bash
$ curl -X "POST" http://localhost:8080/validate -H "Content-Type: application/json" -d '{ "userid": "63c233d2", "token": "TOKEN" }'
```

Output
```json
{
    "status":"Valid token"
}
```

<a name="validate-a-token-less"></a>
## Validate a token (Less secure, but much faster)
```bash
$ curl -X "DELETE" http://localhost:8080/secure -H "Content-Type: application/json" -H "Authorization: Bearer TOKEN"
```

Output
```json
{
    "status": "Valid token"
}
```

<a name="benchmarks"></a>
## Benchmarks
1. Benchmark run on a **Late 2013 Macbook Pro 2.3ghz i7 with 16gb of RAM**
    
    ```bash
    $ cd scripts 
    $ ./ab-session.sh 10000 -c 130
    ```
    
    Output
    
    ```
    Server Software:        
    Server Hostname:        127.0.0.1
    Server Port:            8080
    
    Document Path:          /
    Document Length:        270 bytes
    
    Concurrency Level:      130
    Time taken for tests:   9.288 seconds
    Complete requests:      10000
    Failed requests:        0
    Total transferred:      4380000 bytes
    Total body sent:        1960000
    HTML transferred:       2700000 bytes
    Requests per second:    1076.70 [#/sec] (mean)
    Time per request:       120.739 [ms] (mean)
    Time per request:       0.929 [ms] (mean, across all concurrent requests)
    Transfer rate:          460.54 [Kbytes/sec] received
                            206.09 kb/s sent
                            666.63 kb/s total
    ```

1. Benchmark run on a **AMD Phenom 965 3.4ghz with 32gb of RAM**
    ```bash
    $ cd scripts
    $ ./ab-session.sh 10000 -c 650
    ```
    
    Output
    
    ```bash
    Server Software:        
    Server Hostname:        127.0.0.1
    Server Port:            8080
    
    Document Path:          /
    Document Length:        270 bytes
    
    Concurrency Level:      650
    Time taken for tests:   17.089 seconds
    Complete requests:      10000
    Failed requests:        0
    Total transferred:      4380000 bytes
    Total body sent:        1960000
    HTML transferred:       2700000 bytes
    Requests per second:    585.17 [#/sec] (mean)
    Time per request:       1110.792 [ms] (mean)
    Time per request:       1.709 [ms] (mean, across all concurrent requests)
    Transfer rate:          250.30 [Kbytes/sec] received
                            112.00 kb/s sent
                            362.30 kb/s total

    ```

<a name="todo"></a>
## TODO
1. Integrate with data layer to persist tokens
2. Check data layer when token does not exist in whitelist
3. Revoke all tokens
