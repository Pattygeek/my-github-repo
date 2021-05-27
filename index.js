const form = document.querySelector("#user-search");

console.log("hi");

const getUserData = (username) => `{
    search(type: USER, query: "${username}", first: 1) {
    edges {
      node {
        ... on User {
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
	const {
		search: {
			edges: {
				node: {
					repositories: { nodes },
				},
			},
		},
	} = data;

	console.log(nodes);
};

const loadUserProfile = async (e) => {
	e.preventDefault();
	const username = form.elements["search"].value;

	const options = {
		method: `post`,
		headers: {
			"Content-Type": "application/json",
			Accept: `application/json`,
			"Access-Control-Allow-Origin": "*",
			mode: "no-cors",
			Authorization: `bearer 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`,
		},

		body: JSON.stringify({
			query: getUserData(username),
		}),
	};

	await fetch(`https://developer.github.com/v4/explorer/`, options)
		// .then((res) => res.json())
		.then((res) => console.log(res))
		// .then(renderUser)
		.catch((err) => {
			console.log(err);
		});

	// form.reset();
};

form.addEventListener("submit", loadUserProfile);
