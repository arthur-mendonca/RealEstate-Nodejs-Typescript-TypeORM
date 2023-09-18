import "reflect-metadata";
import "express-async-errors";
import express from "express";
import scheduleRoutes from "./routes/schedules.routes";
import loginRoutes from "./routes/login.routes";
import categoriesRoutes from "./routes/categories.routes";
import userRoutes from "./routes/users.routes";
import realEstateRoutes from "./routes/realEstate.routes";
import { handleErrors } from "./errors";

const app = express();
app.use(express.json());

app.use("/schedules", scheduleRoutes);
app.use("/login", loginRoutes);
app.use("/categories", categoriesRoutes);
app.use("/users", userRoutes);
app.use("/realEstate", realEstateRoutes);

app.use(handleErrors);

export default app;
