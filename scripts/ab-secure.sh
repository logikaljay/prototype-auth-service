#!/bin/bash

ab -n $* -T 'application/json' -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImpheS5iYWtlckB0b3VjaGNhc3QuY28ubnoiLCJ1c2VySWQiOiI2M2MyMzNkMiIsInNlc3Npb25JZCI6IjkwZDg4MmQ3ZGY3OTQ1Y2Q4MGRlNmVhN2ViNWQ3ZTZmIiwiaWF0IjoxNDUyMDI0NDA3fQ.IGUw-PX4af4zb73b6NL8lw3Op-OxL1Dx6U_Tiy7t4dw' http://127.0.0.1:8080/secure
