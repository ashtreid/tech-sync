const goToCreateArticle = async (event) => {
    event.preventDefault();
    document.location.replace('/create-article');
};

const newArticleButton = document.querySelector('.new-article-btn')
if (newArticleButton) {
    newArticleButton.addEventListener('click', goToCreateArticle);
}



