import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const GLOBAL_PREFIX = process.env.GLOBAL_PREFIX || '';

  app.use(cookieParser());
  app.use(csurf({ cookie: true }));
  app.use((req: any, res: any, next: any) => {
    const token = req.csrfToken();
    res.cookie('XSRF-TOKEN', token);
    res.locals.csrfToken = token;
    next();
  });

  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    "origin": process.env.CORS_ORIGIN || '*',
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "credentials": true,
  });

  if (process.env.NODE_ENV == 'development'){

    const config = new DocumentBuilder().setTitle('People Platform OPR').setDescription('OPR APIS').setVersion('1.0').build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(GLOBAL_PREFIX + '/swagger-ui', app, document);

  }


  await app.listen(process.env.SERVER_PORT || 3000);

}
bootstrap();
