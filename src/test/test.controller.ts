import { Body, Controller, Get, Post } from '@nestjs/common';
import { TestDTO } from './dto/test.dto';
import { TestUser } from './test.model';
import { TestService } from './test.service';

@Controller()
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get('/test/sql')
  getAllTestUsers(): string {
    return 'test';
    // return this.testService.findAll();
  }

  @Get('/test/cosmos')
  cosmosTest(): any {
    return this.testService.testCosmos();
  }

  @Post('/teste/post')
  postCsrfTest(@Body() testDto: TestDTO): string {
    return "won't work without receiving csrf";
  }
}
