import {Service, Converter, ConnectionFactory} from "typed-framework";
import {User} from "../models/User";

const template = {
    uuid: 'id',
    created_at: "createdAt"
}


@Service()
export class UserService {

    private connection = ConnectionFactory.getConnection();


    public async findById(id: number) {

        const userFromDB = {
            uuid: "123",
            created_at: Date.now()
        };


        const converter = new Converter(userFromDB, {template, returnType: User});

        const user = converter.convert();

        const member = await this.connection.select("*").from("members").where("id", 1);

        console.log(member);

        if (id === 1) {
            return member;
        } else {
            throw new Error("not found");
        }
    }
}