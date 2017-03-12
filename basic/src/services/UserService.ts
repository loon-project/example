import {Service} from "typed-framework";

@Service()
export class UserService {

    public findById(id: number) {
        if (id === 1) {
            return {
                name: "tester"
            };
        } else {
            throw new Error("not found");
        }
    }
}