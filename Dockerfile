FROM node
COPY . /api-invent-med
WORKDIR /api-invent-med
RUN npm install
CMD ["npm", "run", "start:dev"]

