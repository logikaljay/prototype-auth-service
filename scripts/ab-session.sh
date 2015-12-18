#!/bin/bash

ab -n $1 -T application/json -m POST -P ab-session.data http://localhost:8080/
