const updateHandler = async (event) => {
    event.preventDefault();

    const id = event.target.dataset.id;
    console.log("DATA_ID:", id);

    if (id) {
        const title = document.querySelector('#blog-title').value.trim();
        const article = document.querySelector('#blog-article').value.trim();

        if (title && article) {
            const response = await fetch(`/api/blog/update/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ title, article }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                alert('Failed to update blog');
            }
        }
    }
};

const commentHandler = async (event) => {
    event.preventDefault();

    const blogId = event.target.dataset.id;

    if (blogId) {
        const content = document.querySelector('#comment-box').value.trim();

        if (content) {
            const response = await fetch(`/api/commentary`, {
                method: 'POST',
                body: JSON.stringify({ content }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log("RESPONSE:", response)

            if (response.ok) {
                document.location.replace(`/blog/${blogId}`);
            } else {
                alert('Failed to post comment');
            }
        };
    };

};

const deleteHandler = async (event) => {
    event.preventDefault();
    const id = event.target.dataset.id;
    console.log("DATA_ID:", id);

    if (id) {
        const response = await fetch(`/api/blog/delete/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete blog');
        }
    }
};

document
    .querySelector('#delete-btn')
    .addEventListener('click', deleteHandler);

document
    .querySelector('#update-btn')
    .addEventListener('click', updateHandler);

document
    .querySelector('#comment-btn')
    .addEventListener('click', commentHandler);