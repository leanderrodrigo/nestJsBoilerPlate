import { Injectable } from "@nestjs/common";
import { PrintOkUseCase } from "src/@core/application/use-cases/print-ok.use-case";

@Injectable()
export class HealthCheckService {
    constructor(private printOkUseCase: PrintOkUseCase){}

    async getOk(){
        return this.printOkUseCase.execute();
    }
}