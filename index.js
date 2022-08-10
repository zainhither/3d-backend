const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const consola = require("consola");
const cors = require("cors");

const app = express();

//Load environment vars
dotenv.config({ path: "./config.env" });

app.use(express.json());
app.use(cors());
app.use("/assets", express.static("uploads"));

mongoose
  .connect(process.env.DB_CONN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => consola.success("Connected to Database"))
  .catch((err) => consola.error(err));

//Import Routes
const userRoutes = require("./routes/userRoutes");
const model3dRoutes = require("./routes/model3dRoutes");
const wallRoutes = require("./routes/wallRoutes");
const windowRoutes = require("./routes/windowRoutes");
const roofRoutes = require("./routes/roofRoutes");
const doorRoutes = require("./routes/doorRoutes");
const floorRoutes = require("./routes/floorRoutes");

//Apply Routes
app.use("/api/users", userRoutes);
app.use("/api/models", model3dRoutes);
app.use("/api/wall", wallRoutes);
app.use("/api/window", windowRoutes);
app.use("/api/roof", roofRoutes);
app.use("/api/door", doorRoutes);
app.use("/api/floor", floorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => consola.success(`Server started on port ${PORT}`));