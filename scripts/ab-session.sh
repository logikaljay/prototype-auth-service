#!/bin/bash

ab -n $* -T 'application/json' -p ab-session.data http://127.0.0.1:8080/
