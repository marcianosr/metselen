const express = require("express");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3200;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

app.post("/api", (req, res) => {
	console.log("post:", req.body);

	try {
		if (!fs.existsSync(`src/data/levels`)) fs.mkdirSync("src/data/levels/");
		fs.writeFile(
			`src/data/levels/level-${req.body.level.name}.json`,
			JSON.stringify(req.body),
			(err) => {
				if (err) console.log(err);

				console.log("saved!");
			}
		);
	} catch (err) {
		console.log(err);
	}
});

app.get("/api", (req, res) => {
	console.log("get");
	res.json({ message: "Editor api!" });
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
