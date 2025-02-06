import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

export function loadMarkdownAndTargetHtml(url, target) {
    fetch(url)  // replace with the correct path
        .then(response => response.text())
        .then(markdown => {
            const htmlContent = marked.parse(markdown); // Convert Markdown to HTML
            target.innerHTML = htmlContent;
        })
        .catch(error => console.error('Error loading markdown:', error));
}        


export async function loadMarkdownAsHTML(url) {
    return fetch(url) 
        .then(response => response.text())
        .then(markdown => {
            const htmlContent = marked.parse(markdown); // Convert Markdown to HTML
            // target.innerHTML = htmlContent;
            return htmlContent;
        })
        .catch(error => {
            const errorMessage = ('Error loading markdown:' + error);
            console.error(errorMessage);
            return errorMessage;
        });
}        