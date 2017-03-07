import NotificationService from "../../services/NotificationService";
import {RestController, Get} from "typed-framework";


@RestController("/api/notifications")
export class NotificationController {

    constructor(private notificationService: NotificationService) {
    }


    @Get("/unread")
    public async unread(req: IRequest): Promise<Notification> {

        const currentUser = req.currentUser;

        const notifications = await this.notificationService.getUnreadNotifications(currentUser);

        console.log(notifications);

        return notifications;
    }

}

