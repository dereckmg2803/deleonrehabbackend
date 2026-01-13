import { Request, Response, Router } from "express";

import { ApplicantsRoutes } from "./applicants/routes";
// import { AuthMiddleware } from "./common/middlewares/auth.middleware";
// import { UserRole } from "../data";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Rutas de aplicantes
    router.use("/api", ApplicantsRoutes.routes);

    // Puedes agregar más rutas aquí, como la de los doctores si es necesario
    // router.use("/api/v1/doctors", DoctorRoutes.routes);


    return router;
  }
}
