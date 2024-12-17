FROM node:22.12

RUN apt update && \
    apt install openssl procps -y &&\
    npm install -g @nestjs/cli@10.0.0

USER node

WORKDIR /home/node/app

CMD ["tail", "-f", "/dev/null"]
