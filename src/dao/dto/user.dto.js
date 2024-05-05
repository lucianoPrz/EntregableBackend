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
        this.fullName = `${userDB.first_name} ${userDB.last_name}`;
        this.email = userDB.email,
        this.role = userDB.role,
        this._id = userDB._id,
        this.cart = userDB.cart
    }
}