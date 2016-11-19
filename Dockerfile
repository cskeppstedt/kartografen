FROM nginx

COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY start-nginx.sh /start-nginx.sh

EXPOSE 8080
CMD ["/start-nginx.sh"]

