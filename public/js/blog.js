const updateHandler = async (event) => {
    event.preventDefault();

    const id = event.target.dataset.id;

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
                document.location.replace(`/blog/${id}`);
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
            const response = await fetch('/api/commentary/send', {
                method: 'POST',
                body: JSON.stringify({ content, blogId }),
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

const goToEdit = async (event) => {
    event.preventDefault();

    const id = event.target.dataset.id;
    if (id) {
        document.location.replace(`/blog/update/${id}`);
    };

};

const cancelEdit = async (event) => {
    event.preventDefault();
    const id = event.target.dataset.id;
    if (id) {
        document.location.replace(`/blog/${id}`);
    };
};

const cancelButton = document.querySelector('#cancel-btn');
if (cancelButton) {
    cancelButton.addEventListener('click', cancelEdit);
};

const editButton = document.querySelector('#edit-btn');
if (editButton) {
    editButton.addEventListener('click', goToEdit);
};

const deleteButton = document.querySelector('#delete-btn');
if (deleteButton) {
    deleteButton.addEventListener('click', deleteHandler);
}

const updateButton = document.querySelector('#update-btn');
if (updateButton) {
    updateButton.addEventListener('click', updateHandler);
}

const commentButton = document.querySelector('#comment-btn');
if (commentButton) {
    commentButton.addEventListener('click', commentHandler);
}
