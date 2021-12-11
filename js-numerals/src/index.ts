import express, {Request, Response} from 'express';

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

import {convertToPhrase}  from './service/convert';

app.set('view engine', 'ejs');

app.get('/', (req: Request, res: Response): void => {
    res.render('index', {data: "", number: ""});
});

app.post('/', (req: Request, res: Response): void => {
    let data = convertToPhrase(req.body.number);
    res.render('index', {data : data, number : req.body.number})
})


app.listen(3000, (): void => {
    console.log('Server started....');
});
