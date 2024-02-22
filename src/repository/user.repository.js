import { CreateUserDto, GetUserDTO } from "../dao/dto/user.dto.js";

export class UserRepository{
    constructor(dao) {
        this.dao = dao
    }
    async getUsers(){
        const users = await this.dao.getAll();
        return users;
    }
    async getUserDto(user){
        const userDtoFront = new GetUserDTO(user);
        return userDtoFront;
    }
    async createUser(contact){
        const userDto = new CreateUserDto(contact);
        const userCreated = await this.dao.saveUser(userDto);
        const userDtoFront = new GetUserDTO(userCreated);
        return userDtoFront;
    }
    async getBy(params){
        let user = await this.dao.getBy(params)
        let userDto = new GetUserDTO(user);
        return userDto;
    }
    async updateUser(id, user){
        const userUpdated = await this.dao.updateUser(id, user);
        return userUpdated;
    }
}