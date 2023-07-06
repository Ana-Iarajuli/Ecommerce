fetch('includeSections/newsletter.html')
.then(response => response.text())
.then(html => {
    document.getElementById('newsletter').innerHTML = html;
});