function loadMarkdownAsHTML(url, target) {
    fetch(url)  // replace with the correct path
        .then(response => response.text())
        .then(markdown => {
            const htmlContent = marked.parse(markdown); // Convert Markdown to HTML
            target.innerHTML = htmlContent;
            // return htmlContent;
        })
        .catch(error => console.error('Error loading markdown:', error));
}        