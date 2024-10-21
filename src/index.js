import app from './app.js';
import {swaggerDocs} from './docs/swagger.js';


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
    swaggerDocs(app,port);
  });