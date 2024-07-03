import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors({
  credentials: true,
  origin: process.env.ORIGIN_URL
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes import
import reviewRoutes from "./routes/reviews.routes.js";
import userRegRoutes from "./routes/userRegistration.routes.js";
import site from "./routes/site.routes.js";
import category from "./routes/category.routes.js";
import contact from "./routes/contact.routes.js";
import heading from "./routes/heading.routes.js";
import footers from "./routes/footer.routes.js";
import sections from "./routes/section.routes.js";
import information from "./routes/information.routes.js";
import blog from "./routes/blogs.routes.js";
import userRoutes from "./routes/user.routes.js";
import client from "./routes/client.routes.js";
import likes from "./routes/like.routes.js";
import notificationRoutes from './routes/companyNotification.routes.js';
import reports from "./routes/reports.route.js";
import warning from "./routes/warning.routes.js";
import emailRoutes from "./routes/mailer.routes.js";
import checkBlockStatus from "./routes/checkBlockStatus.js"


app.use("/api/v1", reviewRoutes);
app.use("/api/v1", notificationRoutes);
app.use("/api/v1", userRegRoutes);
app.use("/api/v1", site);
app.use("/api/v1", category);
app.use("/api/v1", contact);
app.use("/api/v1", heading);
app.use("/api/v1", footers);
app.use("/api/v1", sections);
app.use("/api/v1", information);
app.use("/api/v1", blog);
app.use('/api/v1/', userRoutes);
app.use('/api/v1/', client);
app.use('/api/v1/', likes);
app.use("/api/v1/", reports);
app.use("/api/v1", warning);
app.use("/api/v1", emailRoutes);
app.use("/api/v1", checkBlockStatus)
export { app };
