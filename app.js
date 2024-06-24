const routes = {
    '/': 'home.html',
    './contact': 'contact.html',
    './select-level': 'select-lvl.html',
    // Add more routes here
};


function loadContent(url) {
    const route = routes[url] || routes['/'];
    const path = './pages/' + route; // Use a relative path
    fetch(path)
        .then(response => response.text())
        .then(html => {
            document.getElementById('app').innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading content:', error);
        });
}


function navigate(event) {
    event.preventDefault();
    const url = event.target.getAttribute('href');
    history.pushState(null, null, url);
    loadContent(url);
}

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', event => {
        if (event.target.matches('[data-link]')) {
            navigate(event);
        }
    });

    window.addEventListener('popstate', () => {
        loadContent(window.location.pathname);
    });

    loadContent(window.location.pathname);
});