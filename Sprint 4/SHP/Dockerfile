# Build stage
FROM node:14-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM nginx:stable-alpine AS production

COPY --from=build /app/build /usr/share/nginx/html

# Copy the nginx.conf file (if you have one)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]