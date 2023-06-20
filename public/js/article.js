const newBlogHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#blog-title').value.trim();
    const article = document.querySelector('#blog-article').value.trim();

    if (title && article) {
        const response = await fetch('/api/blog/create-article', {
            method: 'POST',
            body: JSON.stringify({ title, article }),
            headers: {
                'Content-Type': 'application/json',
            },
        });


        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create project');
        }
    }
};

document
    .querySelector('.new-blog-form')
    .addEventListener('submit', newBlogHandler);