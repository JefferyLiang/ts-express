FROM keymetrics/pm2:10-slim as prod

RUN pm2 install typescript
WORKDIR /app
COPY . .

ENTRYPOINT [ "/app/docker-entrypoint.sh" ]
