import {  randFirstName, randLastName, randNumber, randPassword, randPhoneNumber } from '@ngneat/falso';
import { define } from 'typeorm-seeding';
import { User } from "../../users/entities/user.entity";
import { max } from 'class-validator';

define(User, () => {
  const user = new User();
  user.firstName = randFirstName();
  user.lastName = randLastName();
  user.password = randPassword();
  user.isActive = true,
  user.createdAt = new Date()
  user.deletedAt = null,
  user.updatedAt = new Date(),
  user.phoneNo = (randNumber({min:1000000000 ,max:9999999999}))

  user.username = "seed"
  return user;
});

