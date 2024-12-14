FROM node:17-alpine as node
WORKDIR /app
COPY package.json package-lock.json ./
COPY decorate-angular-cli.js ./
# Configure .npmrc for Azure DevOps
# COPY .npmrc ./
# RUN npm ci
COPY . .

RUN npm install -g @nrwl/cli@15.9.7
RUN npm i nx@17.0.0
RUN npm run nx -- build zeka

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=node /app/dist/apps/zeka /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./config/entryPoint.sh /

# replaces the environment variable names
# replaces the environments variables at runtime when the Nginx server starts
RUN chmod +x entryPoint.sh
ENTRYPOINT ["sh","entryPoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

