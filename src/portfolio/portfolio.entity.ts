import { Ticker } from "./../ticker/ticker.entity";
import { User } from "../user/user.entity";
import { Category } from "../categories/categories.entity";

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, OneToMany } from "typeorm";

@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  public created_at: Date;

  @OneToMany(() => Category, (category) => category.portfolio)
  categories: Category[];
}
