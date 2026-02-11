FROM node:20-alpine
WORKDIR /app
COPY apps/web/package*.json ./apps/web/
WORKDIR /app/apps/web
RUN npm install
COPY apps/web .
RUN npm run build || true
EXPOSE 3000
CMD ["npm", "run", "start"]
