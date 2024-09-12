function navigateTo(url) {
    history.pushState(null, null, url);
    router();
  }
  
  const routes = {
    "/": "<h1>Home Page</h1><p>Welcome to the home page.</p>",
    "/about": "<h1>About Page</h1><p>This is the about page.</p>",
    "/contact": "<h1>Contact Page</h1><p>Here is how you can contact us.</p>",
  };
  
  function router() {
    const app = document.getElementById('app');
    const currentPath = window.location.pathname;
    app.innerHTML = routes[currentPath] || "<h1>404 Page Not Found</h1>";
  }
  
  window.addEventListener('popstate', router);
  
  document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (e) => {
      if (e.target.matches('[data-link]')) {
        e.preventDefault();
        navigateTo(e.target.href);
      }
    });
    router();
  });
  