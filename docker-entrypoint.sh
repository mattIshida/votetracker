#!/bin/bash

# Wait for the backend to start
# until nc -zv backend 9292; do
#   echo 'Waiting for backend to start...'
#   sleep 1
# done

# Install dependencies
npm install

# Build the frontend
npm run build

# Stop the development server
#npm stop

# Start the production server
npm run start