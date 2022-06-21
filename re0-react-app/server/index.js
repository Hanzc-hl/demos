const path = require("path");
const express = require("express");

const app = express();
const port = 3000;

// 用于测试build是否生效
app.use(express.static(path.resolve(__dirname, "..", "dist")));

app.listen(port, () => {
  console.log(`Express Server listening on port ${port}`);
  console.log("click link: %o", `http://localhost:${port}`);
});
