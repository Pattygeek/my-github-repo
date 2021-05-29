const form = document.querySelector("#user-search");
const userContainer = document.querySelector("#user-cont");
const search = document.querySelector("#search");

console.log("hi");

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
	const repo = data?.search?.edges?.[0]?.node?.repositories.nodes;
	const repoCount = data?.search?.edges?.[0]?.node?.repositories.totalCount;
	const repoInfo = data?.search?.edges?.[0]?.node;

	// const [repositories] = node;
	if (data.search.edges.length === 0) {
		console.log("user not found");
	} else {
		console.log(repoInfo);
	}

	// console.log(repoInfo);
	localStorage.setItem("user", JSON.stringify(repoInfo));
	userContainer.innerHTML = `<div class="user-container">
    <p style="margin: 0">${repoInfo ? repoInfo.name : `User not found`}</p>
    <a href="index.html">${repoInfo ? `View Profile` : ``}</a>
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
