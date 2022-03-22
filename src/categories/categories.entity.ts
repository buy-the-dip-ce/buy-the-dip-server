import { Portfolio } from "../portfolio/portfolio.entity";
import { User } from "../user/user.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity()
export class Categories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string;

  @Column("simple-array")
  ticker_arr: string[];

  @ManyToOne(() => Portfolio, (portfolio) => portfolio.categories)
  portfolio: Portfolio;
}
