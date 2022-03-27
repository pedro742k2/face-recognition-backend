FROM node:16

WORKDIR /app

# Copy the local files to the container /app dir (except the files at .dockerignore)
COPY . .

# Install all the dependencies
RUN npm install

CMD ["npm", "run", "dev"]
