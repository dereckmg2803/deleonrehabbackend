import cookieParser from 'cookie-parser';
import express, { Router } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';
import hpp from 'hpp';

interface Options {
  port: number;
  routes: Router;
}

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://deleonrehab-six.vercel.app',
  // luego agregas tu dominio de producción
];

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
};

export class Server {
  private readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    this.port = options.port;
    this.routes = options.routes;
  }

  async start() {
    /** =======================
     *  Global Middlewares
     *  ======================= */
    this.app.use(express.json({ limit: '1mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '100kb' }));
    this.app.use(cors(corsOptions));
    this.app.use(cookieParser());
    this.app.use(hpp());
    this.app.disable('x-powered-by');
    this.app.use(helmet());

    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 20,
    });
    this.app.use(limiter);

    /** =======================
     *  Routes
     *  ======================= */
    this.app.use(this.routes);

    /** =======================
     *  Start server
     *  ======================= */
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
