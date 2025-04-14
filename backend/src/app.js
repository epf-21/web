import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express()

app.use(cors())
app.use(json())
app.use(morgan("dev"))

app.get('/', (req, res) => {
  res.send('Nuevo proyecto')
})


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});