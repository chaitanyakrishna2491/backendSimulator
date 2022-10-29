import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/User.dto';

@Injectable()
export class AppService {
  getUsers(): string {
    const fs = require('fs');
    let data = null;
    try {
      data = fs.readFileSync('./data/users.json', 'utf8');
      console.log(data);
    } catch (err) {
      data = "No data found"
      console.error(err);
    }
    return data;
  }

  getUser(id: string): string {
    const fs = require('fs');
    let data = null;
    try {
      data = fs.readFileSync('./data/users.json', 'utf8');
      data = JSON.parse(data);
      data = data.filter(item => {
        if(item.id == id) return item;
      })
      console.log(data);
    } catch (err) {
      data = "No data found"
      console.error(err);
    }
    return data;
  }

  addUser(user: UserDto): string {
    const fs = require('fs');
    let data = null;
    try {
      data = fs.readFileSync('./data/users.json', 'utf8');
      data = JSON.parse(data);
      data.push(user)
      fs.writeFileSync('./data/users.json', JSON.stringify(data))
      data = "User added successfully"
    } catch (err) {
      data = "Error adding user"
      console.error(err);
    }
    return data;
  }
  updateUser(id: string, user:UserDto): string {
    const fs = require('fs');
    let data = null;
    try {
      data = fs.readFileSync('./data/users.json', 'utf8');
      data = JSON.parse(data);
      data = data.map(item => {
        if(item.id == id) 
        return user;
        else return item
      })
      console.log(data);
      fs.writeFileSync('./data/users.json',JSON.stringify(data))
    } catch (err) {
      data = "Error while updating user details"
      console.error(err);
    }
    return data;
  }

  deleteUser(id: string): string {
    const fs = require('fs');
    let data = null;
    try {
      data = fs.readFileSync('./data/users.json', 'utf8');
      data = JSON.parse(data);
      data = data.filter(item => {
        if(item.id == id) 
          console.log("Deleting user: "+JSON.stringify(item))
        else return item
      })
      console.log(data);
      fs.writeFileSync('./data/users.json',JSON.stringify(data))
    } catch (err) {
      data = "Error while deleting user"
      console.error(err);
    }
    return data;
  }
}
