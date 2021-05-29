const form = document.querySelector("#user-search");
const userContainer = document.querySelector("#user-cont");
const search = document.querySelector("#search");


const getUserData = (username) => `{
    search(type: USER, query: "${username}", first: 1) {
    edges {
      node {
        ... on User {
        name
        avatarUrl
        bio
        login
         status {
            emoji
            message
            emojiHTML
          }
          repositories(first: 20) {
            totalCount
            nodes {
              name
              primaryLanguage {
                color
                name
              }
              stargazerCount
              updatedAt
              forkCount
            }
          }
        }
      }
    }
  }
}`;

const renderUser = ({ data }) => {
	const repoInfo = data?.search?.edges?.[0]?.node;
	localStorage.setItem("user", JSON.stringify(repoInfo));
	userContainer.innerHTML = `<div class="user-container">
    <p style="margin: 0">${repoInfo ? repoInfo.name : `User not found`}</p>
    <a href="profile.html">${repoInfo ? `View Profile` : ``}</a>
    </div>`;
};


const loadUserProfile = async (e) => {
	e.preventDefault();
	const username = form.elements["search"].value;

	const options = {
		method: `post`,
		headers: {
			"Content-Type": "application/json",
			Authorization: `bearer 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`,
		},

		body: JSON.stringify({
			query: getUserData(username),
		}),
	};

	await fetch(`https://api.github.com/graphql`, options)
		.then((res) => res.json())
		.then(renderUser)
		.catch((err) => {
			console.log(err);
		});

	// form.reset();
};

form.addEventListener("submit", loadUserProfile);
