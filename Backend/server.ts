import express from 'express';
import cors from 'cors';
import taskRoutes from "./routes/task-routes";

const app = express();

app.use(express.json());

app.use(cors()); // Allow all origins


app.use('/task',taskRoutes);

app.listen(3003, (err => {
    console.log("Server running on port 3003");
}));

app.use('/health', (req, res, next) => {
    res.status(200).send('API is functional');
})
