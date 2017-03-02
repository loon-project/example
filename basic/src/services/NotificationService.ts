import UserService from "./UserService";
import LikeService from "./LikeService";
import GalleryService from "./GalleryService";
import CommentService from "./CommentService";
import {User} from "../models/User";
import {Comment} from "../models/Comment";
import {Notification, NotificationType} from "../models/Notification";
import {Like} from "../models/Like";
import {Gallery} from "../models/Gallery";
import {TypedContext, Service, EntityManager} from "typed-framework";

const connection = TypedContext.getConnection();
const logger = TypedContext.getLogger();

@Service()
export default class NotificationService {

    private notificationEntity = EntityManager.getEntity(Notification);
    private userEntity = EntityManager.getEntity(User);
    private likeEntity = EntityManager.getEntity(Like);
    private galleryEntity = EntityManager.getEntity(Gallery);
    private commentEntity = EntityManager.getEntity(Comment);

    constructor(private userService: UserService,
                private likeService: LikeService,
                private galleryService: GalleryService,
                private commentService: CommentService) {
    }

    public async getUnreadNotificationCount(user: User): Promise<number> {

        logger.info(`[NotificationService#getUnreadNotificationCount]`);

        const result = await connection
            .count()
            .from(this.notificationEntity.table())
            .where(this.notificationEntity.column('userId'), user.id)
            .where(this.notificationEntity.column('isRead'), false)
            .limit(1);

        if (result.length > 0) {
            return result[0]['count(*)'];
        }

        logger.info("ERROR: can't fetch the unread notification count");

        return 0;
    }

    public async getUnreadNotifications(user: User): Promise<Notification[]> {

        const result = await connection
            .select(this.notificationEntity.columns())
            .from(this.notificationEntity.table())
            .where(this.notificationEntity.column('userId'), user.id)
            .where('read', false)
            .limit(6);

        if (result.length > 0) {

            const data: Notification[] = result
                .map(item => this.notificationEntity.from(item))
                .map(this.getFullNotification.bind(this));

            return Promise.all(data);
        }

        return;
    }

    public async getFullNotification(notification: Notification): Promise<Notification> {


        let query;

        if (notification.type() === NotificationType.Like) {

            logger.info('[NotificationService#getFullNotification] type: Like');

            query = connection
                .select([
                    ...this.notificationEntity.columns(),
                    ...this.likeEntity.columns(),
                    ...this.galleryEntity.columns(),
                    ...this.userEntity.columns()
                ])
                .from(this.notificationEntity.table())
                .leftJoin(this.likeEntity.table(), this.notificationEntity.column('notifiableId'), this.likeEntity.column('id'))
                .leftJoin(this.galleryEntity.table(), this.likeEntity.column('likableId'), this.galleryEntity.column('id'))
                .leftJoin(this.userEntity.table(), this.notificationEntity.column('actorId'), this.userEntity.column('id'))
                .where(this.notificationEntity.column('id'), notification.id);


        }

        if (notification.type() === NotificationType.Comment) {

            logger.info('[NotificationService#getFullNotification] type: Comment');

            query = connection
                .select([
                    ...this.notificationEntity.columns(),
                    ...this.galleryEntity.columns(),
                    ...this.userEntity.columns(),
                    ...this.commentEntity.columns()
                ])
                .from(this.notificationEntity.table())
                .leftJoin(this.commentEntity.table(), this.notificationEntity.column('notifiableId'), this.commentEntity.column('id'))
                .leftJoin(this.galleryEntity.table(), this.commentEntity.column('galleryId'), this.galleryEntity.column('id'))
                .leftJoin(this.userEntity.table(), this.notificationEntity.column('actorId'), this.userEntity.column('id'))
                .where(this.notificationEntity.column('id'), notification.id);
        }


        if (notification.type() === NotificationType.RelationShip) {

            logger.info('[NotificationService#getFullNotification] type: Relationship');

            query = connection
                .select([
                    ...this.notificationEntity.columns(),
                    ...this.userEntity.columns()
                ])
                .from(this.notificationEntity.table())
                .leftJoin(this.userEntity.table(), this.notificationEntity.column('actorId'), this.userEntity.column('id'))
                .where(this.notificationEntity.column('id'), notification.id);
        }

        if (typeof query !== 'undefined') {

            logger.info(`[NotificationService#getFullNotification] ${query.toString()}`);

            const result = await query;

            if (result.length > 0) {

                const data = result[0];

                const like = this.likeEntity.from(data);
                const gallery = this.galleryEntity.from(data);
                const actor = this.userEntity.from(data);
                const comment = this.commentEntity.from(data);

                notification.like = like;
                notification.gallery = gallery;
                notification.actor = actor;
                notification.comment = comment;

                return notification;
            }

            return;
        }

        return;
    }
}