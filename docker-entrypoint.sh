#!/bin/bash

# wait mysql init
sleep 20

pm2-runtime start ecosystem.config.js --env production
