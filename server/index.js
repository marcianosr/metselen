const express = require("express");
const fs = require("fs");
const PORT = 3200;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

const saveFile = (req, res) => {
	try {
		if (!fs.existsSync(`src/data/${req.body.data.type}s`))
			fs.mkdirSync(`src/data/${req.body.data.type}s/`);

		if (req.body.data.type === "level") {
			fs.writeFile(
				`src/data/levels/level-${req.body.data.worldNumber}-${req.body.data.levelNumber}.json`,
				JSON.stringify(req.body),
				(error) => {
					if (error) {
						console.info(
							"%c%s",
							"background-color: red; color: white",
							`Error saving level`,
							error
						);
						return error;
					}

					console.info(
						"%c%s",
						"background-color: green; color: #90de90",
						`level saved! ✅`
					);

					res.json(req.body.data);
				}
			);
		}
		if (req.body.data.type === "world") {
			fs.writeFile(
				`src/data/worlds/world-${req.body.data.worldNumber}.json`,
				JSON.stringify(req.body),
				(error) => {
					if (error) {
						console.info(
							"%c%s",
							"background-color: red; color: white",
							`Error saving world`,
							error
						);
						return error;
					}

					console.info(
						"%c%s",
						"background-color: green; color: #90de90",
						`World saved! ✅`
					);

					res.json(req.body.data);
				}
			);
		}
	} catch (err) {
		throw new Error(err);
	}
};

app.get("/files/:dir", (req, res) => {
	fs.readdir(`./src/data/${req.params.dir}`, (error, files) => {
		if (error)
			console.log(`Error reading paths and files in ${path}`, error);

		console.log(files);
		return res.json({
			files,
		});
	});
});

app.post("/file", (req, res) => {
	const fileNamePath = req.body.file.split(`-`)[0];

	return fs.readFile(
		`src/data/${fileNamePath}s/${req.body.file}`,
		"utf-8",
		(error, file) => {
			if (error) {
				console.log("Error reading file", error);
				return;
			}
			return res.json({ file });
		}
	);
});

app.post("/remove", (req, res) => {
	const fileNamePath = req.body.fileToRemove.split(`-`)[0];

	return fs.unlink(
		`src/data/${fileNamePath}s/${req.body.fileToRemove}`,
		(error) => {
			if (error) {
				console.log("Error deleting file", error);
				return;
			}
			console.log("Succesfully deleted file!");
			return res.json({ message: "Succesfully deleted file!" });
		}
	);
});

app.post("/check", (req, res) => {
	console.log("-----", req.body);
	if (
		req.body.data.type === "world" &&
		fs.existsSync(`src/data/worlds/world-${req.body.data.worldNumber}.json`)
	) {
		res.status(400).json({
			message: `File "world-${req.body.data.worldNumber}.json" already exists`,
		});

		return;
	}

	if (
		req.body.data.type === "level" &&
		fs.existsSync(
			`src/data/levels/level-${req.body.data.worldNumber}-${req.body.data.levelNumber}.json`
		)
	) {
		res.status(400).json({
			message: `File "level-${req.body.data.worldNumber}-${req.body.data.levelNumber}.json" already exists`,
		});

		return;
	}

	saveFile(req, res);

	res.status(200).json({
		message: `File "${req.body.data.type}-${req.body.data.worldNumber}-${req.body.data.levelNumber}.json" saved!`,
		filename: `${req.body.data.type}-${req.body.data.worldNumber}-${req.body.data.levelNumber}.json`,
	});
});

app.post("/write", (req, res) => {
	console.log("post:", req.body);

	saveFile(req, res);
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
