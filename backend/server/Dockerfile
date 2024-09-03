# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container to /src
WORKDIR /a

# Copy the package.json and package-lock.json files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 8000
EXPOSE 5001

# Run the server when the container launches
CMD ["npm", "start"]
