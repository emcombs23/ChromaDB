document.addEventListener('DOMContentLoaded', () => {
	const container = document.getElementById('chunks');
	if (!container) return;
	container.textContent = 'Loading chunks...';

	fetch('/chunks')
		.then((res) => {
			if (!res.ok) throw new Error('Network response was not ok');
			return res.json();
		})
		.then((data) => {
			container.innerHTML = '';
			if (!Array.isArray(data) || data.length === 0) {
				container.textContent = 'No chunks available.';
				return;
			}

			const list = document.createElement('ul');
			list.className = 'chunk-list';

			data.forEach((item, idx) => {
				const li = document.createElement('li');
				li.className = 'chunk-item';

				const text = document.createElement('p');
				text.className = 'chunk-text';
				text.textContent = item.chunk;

				const meta = document.createElement('div');
				meta.className = 'chunk-meta';
				meta.textContent = `Length: ${item.length}`;

				li.appendChild(text);
				li.appendChild(meta);
				list.appendChild(li);
			});

			container.appendChild(list);
		})
		.catch((err) => {
			container.textContent = 'Error loading chunks: ' + err.message;
		});
});

