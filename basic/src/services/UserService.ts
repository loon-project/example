import {Service, Converter, ConnectionFactory, LogFactory, ApplicationLoader, Inject} from "typed-framework";
import {User} from "../models/User";

@Service()
export class UserService {

    @Inject()
    private application: ApplicationLoader;

    private connection = ConnectionFactory.getConnection();

    private logger = LogFactory.getLogger();

    public async findById(id: number) {

        console.log(this.application.port);

        const userFromDB = {
            uuid: "123",
            created_at: Date.now()
        };

        // const member = await this.connection.select("*").from("members").where("id", 1);


        if (id === 1) {
            return userFromDB;
        } else {
            throw new Error("not found");
        }
    }
}