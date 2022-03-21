import { Ticker } from "./../ticker/ticker.entity";
import { User } from "../user/user.entity";
import { Categories } from "../categories/categories.entity";

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";

@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  public created_at: Date;

  @OneToMany(() => Categories, (categories) => categories.portfolio)
  categories: Categories[];
}
