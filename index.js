const userList = document.getElementById('user-list')
const repoList = document.getElementById('repos-list')
const form = document.getElementById('github-form')
const searchInput = document.getElementById('search')
const searchCriteria = document.getElementById('search-criteria')

form.addEventListener('submit', search)

//check if user wants to search by username or repo name
function search(e){
  e.preventDefault();
  searchCriteria.value == 'user' ? fetchUsersByName() : fetchReposByName()
  userList.innerHTML = ''
  form.reset();
}
//***********************************************

// ****** fetches based on search input *********
function fetchUsersByName(e){
  let user = searchInput.value
  fetch(`https://api.github.com/search/users?q=${user}`)
  .then(resp => resp.json())
  .then(json => {
    json.items.forEach((user) => {
      displayUser(user)
    })
  })
}

function fetchReposByName(e){
  let repo = searchInput.value
  fetch(`https://api.github.com/search/repositories?q=${repo}&sort=stars&order=desc`)
  .then(resp => resp.json())
  .then(json => {
    json.items.forEach((repo) => {
      displayRepo(repo)
    })
  })
}
//******************************************************

// *******display info based on user choice *************
function displayUser(user){
  let userLi = document.createElement('li')
  let username = document.createElement('h3')
  username.textContent = user.login
  let avatar = document.createElement('img')
  avatar.src = user.avatar_url
  avatar.classList.add('avatar-img')
  avatar.addEventListener('click', () => fetchUsersRepos(user))

  let linkHolder = document.createElement('p')
  let link = document.createElement('a')
  link.href = `https://github.com/${user.login}`
  link.target = 'blank'
  link.textContent = "View profile on Github"

  linkHolder.appendChild(link)
  userLi.appendChild(username)
  userLi.appendChild(avatar)
  userLi.appendChild(linkHolder)

  userList.appendChild(userLi)
}

function displayRepo(repo){
  let repoLi = document.createElement('li')
  let repoName = document.createElement('h3')
  repoName.textContent = `Repo Name: ${repo.name}`
  let linkHolder = document.createElement('p')
  let link = document.createElement('a')
  link.href = `https://github.com/${repo.full_name}`
  link.target = 'blank'
  link.textContent = "View Repo on Github"

  linkHolder.appendChild(link)
  repoLi.appendChild(repoName)
  repoLi.appendChild(linkHolder)

  userList.appendChild(repoLi)
}
// ************************************************


// ****** fetch an individual users repos and display them*************
function fetchUsersRepos(user){
  repoList.innerHTML = ''
  fetch(`https://api.github.com/users/${user.login}/repos`)
  .then(resp => resp.json())
  .then(json => {
    json.forEach((repo) => {
      renderRepos(repo)
    })
  })
}

function renderRepos(repo){
  let repoLi = document.createElement('li')
  let repoLink = document.createElement('a')
  repoLink.href = `https://github.com/${repo.full_name}`
  repoLink.target = 'blank'
  repoLink.textContent = repo.name

  repoLi.appendChild(repoLink)
  repoList.appendChild(repoLi)
}

//***********************************************
