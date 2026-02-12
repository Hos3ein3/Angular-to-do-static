# Stage 1: Build the Angular app
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code and build for production
COPY . .
RUN npm run build --configuration=production

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine
# Copy the build output to Nginx's html folder
# Note: Replace 'your-app-name' with the actual folder name in dist/
COPY --from=build /app/dist/*/browser /usr/share/nginx/html

# Copy a custom nginx config if you have one for SPA routing
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]