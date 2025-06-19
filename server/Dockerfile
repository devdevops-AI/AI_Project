FROM node:18
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN apt-get update && apt-get install -y python3 python3-pip && rm -rf /var/lib/apt/lists/*
RUN pip3 install langchain sentence-transformers chromadb ollama
ENV CHROMA_PATH=/data/chroma
EXPOSE 3001
CMD ["node", "server.js"]
