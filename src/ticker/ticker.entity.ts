import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm"
import { Photo } from "../photos/photo.entity"

@Entity()
export class Ticker {
    @PrimaryColumn()
    symbol: number

    @Column()
    name: string

    @Column()
    markey_cap: string

    @Column({ type: "float" })
    per: boolean

    @Column({ type: "float" })
    high_52: number

    @Column()
    sector: string

    @Column()
    industry: string
}
