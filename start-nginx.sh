#!/usr/bin/env bash

# Yay environment variables. I'm a pogrammer!
sed 's/$PORT/'"$PORT"'/' -i /etc/nginx/conf.d/default.conf

echo "Nginx config:"
cat /etc/nginx/conf.d/default.conf

nginx -g "daemon off;"

