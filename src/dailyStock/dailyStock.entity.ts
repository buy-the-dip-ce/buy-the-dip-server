import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from "typeorm"

@Entity()
export class DailyStock {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 10 })
    ticker: string

    @Column({ type: "float" })
    close: number

    @CreateDateColumn()
    date: Date
}
