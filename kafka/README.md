## OTOT-D

### Start kafka cluster
```
docker-compose up -d
```
---

### Create topic
- Topic name: user-question
- Num Replicas: 1
- Num Partitions: 1

```
docker exec kafka-1 \
kafka-topics --bootstrap-server kafka-1:9092 \
             --create \
             --replication-factor 1 \
             --partitions 1 \
             --topic user-question
```
---
### Describe topic
```
docker exec kafka-1 \
/bin/kafka-topics --bootstrap-server kafka-1:9092 \
                     --describe \
                     --topic user-question
```
---
### Write to topic
Run command below to write to `user-question` topic in interactive mode:
```
docker exec --interactive --tty kafka-1 \
kafka-console-producer --bootstrap-server kafka-1:9092 \
                       --topic user-question
```
Type in lines of text, each line is a new message. Hit `Ctrl-D` when done:
```
first message
second message
third message
```
---
### Read from topic
Read all messages from the beginning of `user-question` topic:
```
docker exec --interactive --tty kafka-1 \
kafka-console-consumer --bootstrap-server kafka-1:9092 \
                       --topic user-question \
                       --from-beginning
```
