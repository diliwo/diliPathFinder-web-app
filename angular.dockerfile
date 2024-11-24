FROM nginx:alpine
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./config/entryPoint.sh /

# replaces the environments variables at runtime when the Nginx server starts
RUN chmod +x entryPoint.sh
ENTRYPOINT ["sh","entryPoint.sh"]
CMD [“nginx”, “-g”, “daemon off;”]
