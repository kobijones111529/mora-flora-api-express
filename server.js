import app from "./api/index.js";

const port = Number(process.env["PORT"]) || 5000;

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
