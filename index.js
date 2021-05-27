const form = document.querySelector("#user-search");

console.log("hi");

const getUserData = (username) => `{
    search(type: USER, query: "${username}", first: 1) {
    repositoryCount
    edges {
      node {
        ... on User {
          repositories(first: 20) {
            nodes {
              name
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
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
            "mode": "no-cors",
			"Access-Control-Allow-Headers":
				"Origin, X-Requested-With, Content-Type, Accept ",
		},

		body: JSON.stringify({
			query: getUserData(username),
		}),
	};

	await fetch(`https://developer.github.com/v4/explorer/`, options)
		.then((res) => res.json())
		.then(renderUser)
        .catch((err) => {
            console.log(err)
        })

	// form.reset();
};

form.addEventListener("submit", loadUserProfile);
