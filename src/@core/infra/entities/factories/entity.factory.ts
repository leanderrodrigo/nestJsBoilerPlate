import { Type } from '@nestjs/common';

export const entityFactory = <T>(Class: Type<T>, data: Partial<T>) =>
  Object.entries(data).reduce((entity: T, [key, value]) => {
    entity[key] = value;

    return entity;
  }, new Class());
