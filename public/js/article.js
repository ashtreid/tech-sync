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
            alert('Failed to create article');
        }
    }
};

const goToDashboard = async (event) => {
    event.preventDefault();
    document.location.replace('/dashboard');
};

document
    .querySelector('#cancel-article-btn')
    .addEventListener('click', goToDashboard);


document
    .querySelector('.new-blog-form')
    .addEventListener('submit', newBlogHandler);