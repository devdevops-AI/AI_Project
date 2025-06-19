#!/usr/bin/env python3
import os
import sys
import json
from langchain.document_loaders import DirectoryLoader
from langchain.embeddings import SentenceTransformerEmbeddings
from langchain.vectorstores import Chroma
from langchain.llms import Ollama
from langchain.chains import RetrievalQA


def build_vectordb(persist_directory):
    embeddings = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
    if os.path.isdir(persist_directory) and os.listdir(persist_directory):
        return Chroma(persist_directory=persist_directory, embedding_function=embeddings)
    kb_path = os.path.join(os.path.dirname(__file__), "../kb")
    loader = DirectoryLoader(kb_path, glob="**/*")
    docs = loader.load()
    vectordb = Chroma.from_documents(docs, embeddings, persist_directory=persist_directory)
    vectordb.persist()
    return vectordb


def main():
    prompt = " ".join(sys.argv[1:]).strip()
    persist_directory = os.environ.get("CHROMA_PATH", "/data/chroma")
    vectordb = build_vectordb(persist_directory)
    llm = Ollama(model="llama3")
    retriever = vectordb.as_retriever()
    qa = RetrievalQA.from_chain_type(llm, chain_type="stuff", retriever=retriever, return_source_documents=True)
    result = qa({"query": prompt})
    answer = result.get("result", "")
    sources = [d.metadata.get("source", "") for d in result.get("source_documents", [])]
    print(json.dumps({"answer": answer, "sources": sources}))


if __name__ == "__main__":
    main()
