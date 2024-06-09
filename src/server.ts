import express, {Request, Response, Application} from 'express';
import cors from 'cors';
import path from 'path';
import userRoutes from './handlers/user_controllers';
import productRoutes from './handlers/product_controllers';
import orderRoutes from './handlers/order_controllers';


const app: Application = express();
let port = 4200;
if(process.env.ENV  === 'test'){
  port = 3001;
  
};

const corsOptions = {
    origin: `http://localhost:${port}`,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// APIs
userRoutes(app);
productRoutes(app);
orderRoutes(app);

//Starting the Server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});

// Export the app instance for use in other modules
export default app;

