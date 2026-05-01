from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI
from langchain_text_splitters import RecursiveCharacterTextSplitter

app = FastAPI()


with open("sample.txt") as f:
    text = f.read()

splitter = RecursiveCharacterTextSplitter(
    chunk_size = 200,
    chunk_overlap = 20
)

chunks = splitter.split_text(text)

@app.get("/chunks")
def get_chunks():
    chunkList = []
    for chunk in chunks:
        chunkList.append({"chunk": chunk, 'length': len(chunk)})

    return chunkList


app.mount("/", StaticFiles(directory="static", html=True), name="static")