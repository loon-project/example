import {User} from "./User";
import {Gallery} from "./Gallery";
import {Like} from "./Like";
import {Comment} from './Comment';
import {Table, Column, TypedModel} from "typed-framework";

export enum NotificationType {
    Like,
    RelationShip,
    Comment,
    Unknown
}

@Table("notifications")
export class Notification {

    @Column()
    id: number;

    @Column("created_at")
    createdAt: Date;

    @Column("updated_at")
    updatedAt: Date;

    @Column("user_id")
    userId: number;

    @Column("notifyable_id")
    notifiableId: number;

    @Column("notifyable_type")
    notifiableType: string;

    @Column("read")
    isRead: boolean;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column("connect_user_id")
    actorId: number;

    actor: User;

    gallery: Gallery;

    comment: Comment;

    follower: User;

    like: Like;


    public type(): NotificationType {

        switch (this.notifiableType) {
            case 'Like':
                return NotificationType.Like;
            case 'Comment':
                return NotificationType.Comment;
            case 'Relationship':
                return NotificationType.RelationShip;
            default:
                return NotificationType.Unknown;
        }
    }
}
