import {  randFirstName, randLastName, randPassword } from '@ngneat/falso';
import { define } from 'typeorm-seeding';
import { User } from "../../../users/entities/user.entity";

define(User, () => {
  const user = new User();
  user.firstName = randFirstName();
  user.lastName = randLastName();
  user.password = randPassword();
  return user;
});

