async function loadDocuments() {
    const response = await fetch('/documents');
    const documents = await response.json();
    const list = document.getElementById('document-list');
    for (const doc of documents) {
        const item = document.createElement('li');
        item.innerHTML = `<strong>${doc.id}:</strong> ${doc.documents}`;
        list.appendChild(item);
    }
}

loadDocuments();

// Search functionality
async function performSearch(query) {
    const params = new URLSearchParams({ user_query: query });
    const resp = await fetch('/search?' + params.toString());
    if (!resp.ok) {
        throw new Error('Search request failed');
    }
    return resp.json();
}

function renderResults(results) {
    const container = document.getElementById('search-results');
    container.innerHTML = '';
    if (!results || results.length === 0) {
        container.textContent = 'No results';
        return;
    }
    for (const r of results) {
        const el = document.createElement('div');
        el.className = 'result-item';
        el.innerHTML = `<div class="result-id">${r.id}</div><div class="result-doc">${r.documents}</div><div class="result-dist">distance: ${r.distances}</div>`;
        container.appendChild(el);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('search-input');
    const btn = document.getElementById('search-btn');

    btn.addEventListener('click', async () => {
        const q = input.value.trim();
        if (!q) return;
        btn.disabled = true;
        btn.textContent = 'Searching...';
        try {
            const results = await performSearch(q);
            renderResults(results);
        } catch (err) {
            const container = document.getElementById('search-results');
            container.textContent = 'Error performing search';
            console.error(err);
        } finally {
            btn.disabled = false;
            btn.textContent = 'Search';
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('search-btn').click();
        }
    });
});