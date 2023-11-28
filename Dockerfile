# Use an official Node.js runtime as a parent image
FROM node:14 as build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy both package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Build the Vue.js app
RUN npm run build

# Use a lighter-weight image for serving the app
FROM nginx:alpine

# Copy the built app to the nginx public directory
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Define the command to start the nginx server
CMD ["nginx", "-g", "daemon off;"]
