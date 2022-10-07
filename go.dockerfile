FROM golang:1.18-bullseye


ENV GO111MODULE=on
RUN apt-get update && apt-get install -y inotify-tools
ENV APP_HOME /go/src/
RUN mkdir -p "$APP_HOME"
WORKDIR "$APP_HOME"
COPY go.mod .
RUN go mod download

RUN echo "\n\
#!/bin/bash \n\
DIRS=\"cmd pkg\" \n\
pidtree() { \n\
  declare -A CHILDS \n\
  while read P PP; do \n\
    CHILDS[\$PP]+=\" \$P\" \n\
  done < <(ps -e -o pid= -o ppid=) \n\
 \n\
  walk() { \n\
    echo \$1 \n\
    for i in \${CHILDS[\$1]}; do \n\
      walk \$i \n\
    done \n\
  } \n\
 \n\
  for i in \"\$@\"; do \n\
    walk \$i \n\
  done \n\
} \n\
 \n\
sigint_handler() \n\
{ \n\
  kill \$(pidtree \$PID) \n\
  exit \n\
} \n\
 \n\
trap sigint_handler SIGINT \n\
 \n\
while true; do \n\
  \$@ & \n\
  PID=\$! \n\
  inotifywait -e modify -e move -e create -e delete -e attrib -r \$DIRS \n\
   \n\
  PIDS=\$(pidtree \$PID) \n\
  kill \$PIDS \n\
 \n\
  wait \$PID \n\
  sleep 1 \n\
done \n\
" > /bin/hotload
RUN chmod +x /bin/hotload

CMD ["hotload", "go", "run", "cmd/main/main.go"]