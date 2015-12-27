NAME="prototype-auth-cassandra"
PORT=32769

# run cassandra
docker run --name ${NAME} -p ${PORT}:${PORT} -d cassandra:3.0.1

# give cassandra a chance to start
sleep 15

# init a default database
docker exec -it ${NAME} cqlsh -e "CREATE KEYSPACE IF NOT EXISTS auth WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 3};"
docker exec -it ${NAME} cqlsh -e "CREATE TABLE IF NOT EXISTS auth.tokens (id uuid PRIMARY KEY, userId text, sessionId text, tokenValue text);"
