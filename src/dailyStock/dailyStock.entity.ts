import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class DailyStock {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 10 })
    ticker: string

    @Column({ type: "float" })
    close: number

    @Column({
        type: "date",
    })
    date: string
}
