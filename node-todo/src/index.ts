import express from 'express';

const app = express();
import { routes } from  './routes/todosRoute';

app.use(express.json({ type: 'application/json'}));

routes(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started... http://localhost:${PORT}`)
});
