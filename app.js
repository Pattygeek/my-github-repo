// import dotenv from 'dotenv';

require("dotenv").config();
console.log(process.env);

const userData = JSON.parse(localStorage.getItem("user"));
// const GITHUB = process.env.GITHUB


//Date Formater
function formatDate(date) {
	let monthOfUpdate = new Date(date).getMonth();
	let currentMonth = new Date().getMonth();
	if (monthOfUpdate === currentMonth) {
		let dateOfUpdate = new Date(date).getDate();
		let currentDate = new Date().getDate();
		return `Updated ${currentDate - dateOfUpdate} days ago`;
	} else {
		date = new Date(date).toDateString().split(" ");
		date.shift(), date.pop();
		return `Updated on ${date.join(" ")}`;
	}
}

const userAvatar = document.querySelectorAll("#avatar");
const userName = document.querySelector("#userName");
const fullName = document.querySelector("#fullName");
const bio = document.querySelector("#bio");
const repos = document.querySelector("#reposs");
const status = document.querySelector("#status");
const repoCount = document.querySelector("#repo-count");

const { login, avatarUrl } = userData;

userAvatar.forEach((avatar) => {
	avatar.src = avatarUrl;
});

userName.innerHTML = login;
fullName.innerHTML = userData.name;
bio.innerHTML = userData.bio;
repoCount.innerHTML = userData.repositories.totalCount;


userData.repositories.nodes.forEach((repo) => {
	repos.innerHTML += `<div class="repo-item">
						<div>
							<p class="repo-name">${repo.name}</p>
							<div class="d-flex">
								<div class="d-flex margin-right">
									<span class="lang lang-circle" style="background-color: ${
										repo.primaryLanguage.color
									}"></span>
									<p class="repo-info margin-left">${repo.primaryLanguage.name}</p>
								</div>
                                ${
																	repo.stargazerCount > 0
																		? `<div class="d-flex margin-right">
																			<svg
																				class="octicon octicon-star mr-1"
																				viewBox="0 0 16 16"
																				version="1.1"
																				width="16"
																				height="16"
																				aria-hidden="true"
																			>
																				<path
																					fill-rule="evenodd"
																					d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
																				></path>
																			</svg>
																			<p class="repo-info">
																				${repo.stargazerCount}
																			</p>
																		</div>`
																		: ``
																}
                                                                ${
																																	repo.forkCount >
																																	0
																																		? `<div class="d-flex margin-right">
									<svg
										aria-label="fork"
										role="img"
										viewBox="0 0 16 16"
										version="1.1"
										data-view-component="true"
										height="16"
										width="16"
										class="octicon octicon-repo-forked"
									>
										<path
											fill-rule="evenodd"
											d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
										></path>
									</svg>
									<p class="repo-info">${repo.forkCount}</p>
								</div>`
																																		: ``
																																}
								<div>
									<p class="repo-info">${formatDate(repo.updatedAt)}</p>
								</div>
							</div>
						</div>

						<div class="button-div">
							<button>
								<svg
									class="octicon octicon-star mr-1"
									viewBox="0 0 16 16"
									version="1.1"
									width="16"
									height="16"
									aria-hidden="true"
								>
									<path
										fill-rule="evenodd"
										d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
									></path>
								</svg>
								Star
							</button>
						</div>
					</div>`;
});
