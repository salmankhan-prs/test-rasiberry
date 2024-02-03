FROM arm64v8/node:latest

ARG WORK_DIR=/var/www/node
WORKDIR ${WORK_DIR}

# copy ALL except ignored by .dockerignore
COPY . .
# install ALL node_modules, including 'devDependencies'
RUN npm install


# use node-prune to remove unused files (doc,*.md,images) from node_modules
RUN wget https://gobinaries.com/tj/node-prune && sh node-prune && node-prune

EXPOSE 4000

CMD node index.js