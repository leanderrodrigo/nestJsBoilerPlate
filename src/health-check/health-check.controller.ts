import { Controller, Get } from "@nestjs/common";
import { ApiTags } from '@nestjs/swagger';
import { HealthCheckService } from "./health-check.service";

@ApiTags('HealthCheck')
@Controller('health-check')
export class HealthCheckController{
    constructor(private healthCheck: HealthCheckService) {}

    @Get()
    async simpleHealthCheck(){
        return this.healthCheck.getOk();
    }
    
}