FROM node:20-alpine AS base
WORKDIR /app
COPY apps/api/package*.json ./apps/api/
WORKDIR /app/apps/api
RUN npm install
COPY apps/api .
RUN npx prisma generate
RUN npm run build || true
EXPOSE 4000
CMD ["npm", "run", "start:prod"]
