const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
	return response.json(repositories);
});

app.post("/repositories", (request, response) => {
	const { title, url, techs } = request.body;

	const project = {
		id: uuid(),
		title,
		url,
		techs,
		likes: 0,
	};

	repositories.push(project);

	return response.json(project);
});

app.put("/repositories/:id", (request, response) => {
	const { id } = request.params;
	const { title, url, techs } = request.body;

	const repository = {
		...repositories[id],
		title,
		url,
		techs,
	};

	return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
	const { id } = request.params;

	repositories.filter((repository, index) => index !== id);

	return response.status(204);
});

app.post("/repositories/:id/like", (request, response) => {
	// TODO
});

module.exports = app;
