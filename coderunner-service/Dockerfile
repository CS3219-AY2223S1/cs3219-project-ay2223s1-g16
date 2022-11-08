FROM python:latest

RUN apt-get update
RUN apt-get install -y nodejs
# C++
RUN apt-get install -y build-essential
#Java 
RUN apt-get install -y default-jre 

RUN rm -rf /var/lib/apt/lists/*

RUN echo "#!/bin/bash \nX=\$RANDOM.\$2;printf \"\$1\" > /tmp/\$X; printf /tmp/\$X" > /bin/safe_touch \
&& chmod a+x,u+s /bin/safe_touch
USER nobody

COPY main.py /app/main.py
COPY executor.py /app/executor.py
CMD [ "python", "/app/main.py" ]