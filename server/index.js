const express = require("express");
const fs = require("fs");
const PORT = 3200;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

const saveFile = (req, res) => {
	try {
		if (!fs.existsSync(`src/data/levels`)) fs.mkdirSync("src/data/levels/");
		fs.writeFile(
			`src/data/levels/level-${req.body.level.worldNumber}-${req.body.level.levelNumber}.json`,
			JSON.stringify(req.body),
			(err) => {
				if (err) {
					console.log("Error saving level:", err);
					return err;
				}

				console.log("Level saved!");

				res.json(req.body.level);
			}
		);
	} catch (err) {
		throw new Error(err);
	}
};

app.post("/check", (req, res) => {
	if (
		fs.existsSync(
			`src/data/levels/level-${req.body.level.worldNumber}-${req.body.level.levelNumber}.json`
		)
	) {
		res.status(400).json({
			message: `File "level-${req.body.level.worldNumber}-${req.body.level.levelNumber}.json" already exists`,
		});
	}

	saveFile(req, res);

	res.status(200).json({
		message: `File "level-${req.body.level.worldNumber}-${req.body.level.levelNumber}.json" saved!`,
	});
});

app.post("/write", (req, res) => {
	console.log("post:", req.body);

	saveFile(req, res);
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
