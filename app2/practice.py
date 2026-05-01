from langchain_text_splitters import RecursiveCharacterTextSplitter


with open("sample.txt") as f:
    text = f.read()

splitter = RecursiveCharacterTextSplitter(
    chunk_size = 200,
    chunk_overlap = 20
)

result =splitter.split_text(text)
print(result)


def get_chunks():
    chunkList = []
    for chunk in result:
        chunkList.append({"chunk": chunk, 'length': len(chunk)})
    return chunkList
print(get_chunks())