# Peer Prep

# Running Application

1. Obtain `.env` files for user-service, question-service and place it in their respective directories
1. Run kafka using `docker-compose -f ./kafka/docker-compose.yml up -d`
2. Wait for Kafka to be fully initialized and run the rest of the microservices using `docker-compose up`



## User Service
1. Rename `.env.sample` file to `.env`.
2. Create a Cloud DB URL using Mongo Atlas.
3. Enter the DB URL created as `DB_CLOUD_URI` in `.env` file.
4. Install npm packages using `npm i`.
5. Run User Service using `npm run dev`.

## Frontend
1. Install npm packages using `npm i`.
2. Run Frontend using `npm start`.

