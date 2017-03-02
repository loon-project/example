import {
    Get,
    TypedContext,
    BeforeAction,
    Request,
    Controller,
    QueryParam,
    ViewAndModel, Pagable, Inject, PathParam, CookieParam
} from "typed-framework";
import UserService from "../../services/UserService";
import NotificationService from "../../services/NotificationService";
import SessionService from "../../services/SessionService";
import GalleryService from "../../services/GalleryService";
import IRequest from "../../interfaces/IRequest";
import {CurrentUser} from "../../middlewares/CurrentUser";
const assets = require('../../../public/assets.json');

@Controller("")
@BeforeAction(CurrentUser)
export class HomeController {

    private logger = TypedContext.getLogger();

    constructor(private notificationService: NotificationService,
                private sessionService: SessionService,
                private galleryService: GalleryService,
                private userService: UserService) {
    }

    @Get("/")
    public async indexAction(
        @Request() request: IRequest,
        @QueryParam('page') page: number,
        @QueryParam('size') size: number,
    ): Promise<any> {

        const currentUser = request.currentUser;

        const unreadNotificationCount = await this.notificationService.getUnreadNotificationCount(currentUser);
        const unreadNotifications = await this.notificationService.getUnreadNotifications(currentUser);

        const pagable = new Pagable(page, size);
        const galleries = await this.galleryService.findAll(pagable);

        return new ViewAndModel("home/index", {
            title: 'this | 博客',
            createdAt: Date.now(),
            category: "技术",
            commentsCount: 120,
            readCount: 200,
            content: galleries,
            assets: assets.main,
            currentUser: currentUser,
            unreadNotificationCount: unreadNotificationCount > 0 ? unreadNotificationCount : false,
            unreadNotifications: unreadNotifications
        });
    }
}