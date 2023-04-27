FROM node:16-alpine

WORKDIR /app


COPY package*.json ./

RUN npm install
# COPY node_modules node_modules

COPY . .


#RUN npm run build
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/bin/sh", "/docker-entrypoint.sh"]

EXPOSE 3000

#CMD ["npm", "next", "build"]
#CMD ["npm", "next", "start"]
#CMD ["npm", "run", "build"]
#CMD ["npm", "run", "start"]
#CMD ["npm", "build"]

#CMD ["npm", "run", "dev"]