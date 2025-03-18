document.addEventListener('DOMContentLoaded', () => {
  const snippetForm = document.getElementById('snippet-form');
  const snippetText = document.getElementById('snippet-text');
  const snippetTags = document.getElementById('snippet-tags');
  const snippetList = document.getElementById('snippet-list');
  const searchBar = document.getElementById('search-bar');
  const exportButton = document.getElementById('export');
  const importButton = document.getElementById('import');
  const importFile = document.getElementById('import-file');

  let snippets = [];

  // Load snippets from storage
  chrome.storage.local.get(['snippets'], (result) => {
    if (result.snippets) {
      snippets = result.snippets;
      displaySnippets(snippets);
    }
  });

  // Add tab functionality
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabName = btn.getAttribute('data-tab');
      
      // Update active states
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      btn.classList.add('active');
      document.getElementById(`${tabName}-section`).classList.add('active');
      
      if (tabName === 'list') {
        displaySnippets(snippets);
      }
    });
  });

  // Update the displaySnippets function to better handle saved snippets
  function displaySnippets(snippetsToShow) {
    snippetList.innerHTML = '';
    document.getElementById('snippet-counter').textContent = snippetsToShow.length;

    if (snippetsToShow.length === 0) {
      snippetList.innerHTML = '<div class="no-snippets">No snippets found</div>';
      return;
    }

    snippetsToShow.forEach((snippet, index) => {
      const snippetItem = document.createElement('div');
      snippetItem.classList.add('snippet-item');
      
      const date = snippet.date || new Date().toLocaleDateString();
      const formattedTags = snippet.tags.filter(tag => tag).join(', '); // Filter out empty tags
      
      snippetItem.innerHTML = `
        <div class="snippet-content">
          <pre><code>${escapeHtml(snippet.text)}</code></pre>
        </div>
        <div class="metadata">
          <div class="tags">${formattedTags ? `Tags: ${formattedTags}` : 'No tags'}</div>
          <div class="date">Added: ${date}</div>
          <div class="actions">
            <button data-index="${index}" class="copy-btn">Copy</button>
            <button data-index="${index}" class="delete-btn">Delete</button>
          </div>
        </div>
      `;
      snippetList.appendChild(snippetItem);
    });

    // Add copy functionality
    document.querySelectorAll('.copy-btn').forEach(button => {
      button.addEventListener('click', () => {
        const index = parseInt(button.getAttribute('data-index'));
        const snippetText = snippetsToShow[index].text;
        navigator.clipboard.writeText(snippetText).then(() => {
          button.textContent = 'Copied!';
          setTimeout(() => {
            button.textContent = 'Copy';
          }, 1500);
        });
      });
    });

    // Add delete functionality
    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this snippet?')) {
          const index = parseInt(button.getAttribute('data-index'));
          snippets.splice(index, 1);
          chrome.storage.local.set({ snippets });
          displaySnippets(snippets);
        }
      });
    });
  }

  // Helper function to escape HTML special characters
  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Modify the save snippet functionality to include date
  snippetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = snippetText.value.trim();
    const tags = snippetTags.value.trim().split(',').map(tag => tag.trim());
    
    if (text) {
      const newSnippet = {
        text,
        tags,
        date: new Date().toLocaleDateString()
      };
      snippets.push(newSnippet);
      chrome.storage.local.set({ snippets });
      snippetText.value = '';
      snippetTags.value = '';
      displaySnippets(snippets);
    }
  });

  // Search snippets
  searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase().trim();
    
    // If search is empty, show all snippets
    if (!query) {
      displaySnippets(snippets);
      return;
    }

    const filteredSnippets = snippets.filter(snippet => {
      // Search only in tags
      return snippet.tags.some(tag => 
        tag.toLowerCase().trim().includes(query)
      );
    });

    displaySnippets(filteredSnippets);
  });

  // Export snippets
  exportButton.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(snippets, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'snippets.json';
    a.click();
  });

  // Import snippets
  importButton.addEventListener('click', () => importFile.click());
  importFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const importedSnippets = JSON.parse(event.target.result);
      snippets = [...snippets, ...importedSnippets];
      chrome.storage.local.set({ snippets });
      displaySnippets(snippets);
    };
    reader.readAsText(file);
  });
});
