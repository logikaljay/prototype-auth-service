NAME="prototype-auth-redis"
PORT=6379

docker run --name ${NAME} -p 9736:${PORT} -d redis redis-server --appendonly yes
