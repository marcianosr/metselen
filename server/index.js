const express = require("express");

const PORT = process.env.PORT || 3200;

const app = express();

app.get("/api", (req, res) => {
	res.json({ message: "Hello from server!" });
});

app.post("/api", (req, res) => {
	console.log("post");
	// res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
