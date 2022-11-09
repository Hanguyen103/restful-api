import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class BlogPost {
    @PrimaryGeneratedColumn()
    public readonly id!: number;

    @Column({ type: "varchar" })
    public name!: string;

    @Column({ type: "varchar" })
    public description!: string;

}