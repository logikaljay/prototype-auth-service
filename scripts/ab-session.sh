#!/bin/bash

ab -n $* -T 'application/json' -p ab-session.data http://192.168.99.100:8080/
