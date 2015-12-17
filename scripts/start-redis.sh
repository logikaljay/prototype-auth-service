NAME="prototype-auth-redis"
PORT=6379

docker run --name ${NAME} -p ${PORT}:${PORT} -d redis redis-server --appendonly yes
