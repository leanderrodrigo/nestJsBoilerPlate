import { Module } from "@nestjs/common";
import { PrintOkUseCase } from "src/@core/application/use-cases/print-ok.use-case";
import { HealthCheckController } from "./health-check.controller";
import { HealthCheckService } from "./health-check.service";

@Module({
    imports: [],
    controllers: [HealthCheckController],
    providers: [
      HealthCheckService,
      {
        provide: PrintOkUseCase,
        useFactory: () => {
          return new PrintOkUseCase();
        }
      }
    ]
  })
export class HealthCheckModule {}