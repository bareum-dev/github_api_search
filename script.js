const input = document.querySelector('.input');
const searchButton = document.querySelector('.search-btn');
const searchResult = document.querySelector('.search-result');

const url = 'https://api.github.com/users/';

searchButton.addEventListener('click', async (e) => {
  e.preventDefault();
  const user = input.value;
  const response = await fetch(`${url}${user}`);

  if (response.ok) {
    const data = await response.json();
    openUserProfile(data);
  } else {
    openErrorMessage();
  }
});

function openUserProfile(data) {
  searchResult.innerHTML = `
    <div class="avatar-wrapper">
      <img src="${data.avatar_url}" alt="">
    </div>
    <h2 class="login">${data.login}</h2>
    <a href="${data.html_url}" target="_blank">GitHub profile</a>
    <p>Created at: ${data.created_at.slice(0, 10)}</p>
    <p>Last update: ${data.updated_at.slice(0, 10)}</p>
    <p>Public repos: ${data.public_repos}</p>
  `;
  searchResult.classList.add('open');
}

function openErrorMessage() {
  searchResult.innerHTML = `<p class="error-message">Profile <span>${input.value}</span> not found</p>`;
}