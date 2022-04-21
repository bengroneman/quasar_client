# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:16 as build-stage

WORKDIR /app

COPY . ./

RUN npm install

ARG FRONTEND_ENV=production

ENV VUE_APP_ENV=${FRONTEND_ENV}

#RUN npm run test

RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.19-alpine

COPY --from=build-stage /app/.svelte-kit/ /usr/share/nginx/html