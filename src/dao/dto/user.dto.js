export class CreateUserDto{
    constructor(user){
        this.firts_namename = user.firtsName;
        this.last_name = user.lastName;
        this.age = user.edad;
        this.email = user.email;
        this.password = user.password;
    }
}

export class GetUserDTO{
    constructor(userDB){
        this.fullName = userDB.full_name;
        this.email = userDB.email
    }
}