# Prototype - Authentication service

![CircleCI Status](https://circleci.com/gh/logikaljay/prototype-auth-service.svg?style=shield)

Authentication REST API service that uses redis for a token whitelist.

1. [Endpoints](#endpoints)
1. [Usage](#usage)
    1. [Get a token](#get-a-token)
    1. [List all tokens](#list-all-tokens)
    1. [Delete a token](#delete-a-token)
1. [Todo](#todo)

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

<a name="todo"></a>
## TODO
1. Integrate with data layer to persist tokens
2. Check database to when token does not exist in whitelist
3. Revoke all tokens
