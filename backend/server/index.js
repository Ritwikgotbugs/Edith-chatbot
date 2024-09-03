const express = require("express");
const cors = require("cors");
const router = express.Router();
require("dotenv").config();

const app = express();

app.use(cors({ origin: "http://54.252.173.222:81" }));
app.use(express.json());
// Define a route
router.get("/", (req, res) => {
  console.error();
  res.json({ message: "Hello from Express" });
});

app.use("/api", router);

const PORT = process.env.PORT || 5001;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);
