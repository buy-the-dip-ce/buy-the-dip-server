import { Entity, Column, PrimaryColumn, UpdateDateColumn } from "typeorm"
import { Photo } from "../photos/photo.entity"

enum Exchange {
    NYSE = "NYSE",
    NASDAQ = "NASDAQ",
}
@Entity()
export class Ticker {
    @PrimaryColumn({ length: 15 })
    symbol: string

    @Column({ length: 70 })
    name: string

    @Column({ type: "enum", enum: Exchange })
    exchange: Exchange

    @Column({ length: 60, nullable: true })
    country: string

    @Column("decimal", { precision: 5, scale: 2 })
    market_cap: number

    @Column("decimal", { precision: 5, scale: 2 })
    per: number

    @Column("decimal", { precision: 5, scale: 2 })
    high_52: number

    @Column({ length: 20, nullable: true })
    sector: string

    @Column({ length: 20, nullable: true })
    industry: string

    @UpdateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)",
    })
    updated_at: Date
}
