import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm"
import { User } from "../user/user.entity"

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 500 })
    name: string

    @Column("text")
    description: string

    @Column()
    filename: string

    @Column("int")
    views: number

    @Column()
    isPublished: boolean

    @ManyToOne((type) => User, (user) => user.photos)
    @JoinColumn({ name: "ref_userId" })
    user: User
}
