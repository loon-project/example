import {Service, Converter} from "typed-framework";
import {User} from "../models/User";

const template = {
    uuid: 'id',
    created_at: "createdAt"
}


@Service()
export class UserService {


    public findById(id: number) {

        const userFromDB = {
            uuid: "123",
            created_at: Date.now()
        };


        const converter = new Converter(userFromDB, {template, returnType: User});

        const user = converter.convert();

        if (id === 1) {
            return user;
        } else {
            throw new Error("not found");
        }
    }
}