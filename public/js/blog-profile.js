const newBlogHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#blog-title').value.trim();
    // const needed_funding = document.querySelector('#project-funding').value.trim();
    const article = document.querySelector('#blog-article').value.trim();

    // if (title && needed_funding && description) {
    if (title && article) {
        // const date_created = new Date();
        const response = await fetch('/api/blogs', {
            method: 'POST',
            // body: JSON.stringify({ title, needed_funding, article }),
            // body: JSON.stringify({ title, article, date_created }),
            body: JSON.stringify({ title, article }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/blog-profiles');
        } else {
            alert('Failed to create project');
        }
    }
};

const deleteHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/blogs/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/blog-profiles');
        } else {
            alert('Failed to delete blog');
        }
    }
};

document
    .querySelector('.new-blog-form')
    .addEventListener('submit', newBlogHandler);

document
    .querySelector('.blog-list')
    .addEventListener('click', deleteHandler);
