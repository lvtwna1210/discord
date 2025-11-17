const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Bot đang chạy OK"));
app.listen(3000, () => console.log("🌐 Web server đang chạy trên port 3000"));
