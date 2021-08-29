import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../user.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      username: "admin",
      password: "$2b$10$3cFgEeOup1X6qiy3vasKWe8AAHprWB2dEdRGbFDefk3YlYWOpmW8m",
      name: "Admin",
      description: "User admin",
      role: "admin"
    },
    {
      id: 2,
      username: "user1",
      password: "$2b$10$Oj6L5KlT2iMtx0MDYFQAAOhuXCudWkKFwXiafRbURjacHBlPhjBU6",
      name: "User 1",
      description: "User user",
      role: "user"
    }
  ];

  create(createUserDto: CreateUserDto) {
    // return 'This action adds a new user';
    this.users.push(createUserDto);
    return createUserDto;
  }

  findAll() {
    // return `This action returns all users`;
    return this.users;
  }

  findOne(id: number) {
    // return `This action returns a #${id} user`;
    let user = this.users.find(user => user.id === id);

    return user;
  }

  findByUsername(username: string) {
    let user = this.users.find(user => user.username === username);

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const idx = this.users.findIndex(user => user.id === id);
    this.users[idx] = { ...this.users[idx], ...updateUserDto};
    
    return {msg: 'User updated'};
  }

  remove(id: number) {
    const idx = this.users.findIndex(user => user.id === id);
    let msg;

    if(idx > -1) {
      this.users.splice(idx, 1);
      msg = `User #${id} deleted`;
    } else {
      msg = "User not found"
    }
    return { msg };
  }

  randomId() {
    // get random number 10 - 80
    return Math.floor(Math.random() * (80 - 10) + 10);
  }

  isAdmin(user: any) {
    // console.log("isAdmin", user, user.role === 'admin')
    return user && user.role === 'admin' ? true : false;
  }
}
