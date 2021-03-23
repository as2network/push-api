import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BaseEntity, DeleteDateColumn, AfterInsert, BeforeInsert } from "typeorm";
import {compareSync, genSaltSync, hashSync } from "bcryptjs";

enum Roles {
  ADMIN = 'admin',
  USER = 'user'
}
@Entity('user')
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  firstname: string;

  @Column({ type: 'varchar' })
  lastname: string;

  @Column({type: 'enum', enum: Roles, default: Roles.USER})
  role: Roles;

  @Column({ type: 'varchar', length: 255})
  password: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;

  hashPassword() {
    const salt = genSaltSync();
    this.password = hashSync(this.password, salt);
  }

  validatePassword(password) {
    return compareSync(password, this.password)
  }

  get fullName(){
    return `${this.lastname}, ${this.firstname}`;
  }

  get userInfo() {
    return {
      id: this.id,
      email: this.email,
      firstname: this.firstname,
      lastname: this.lastname,
    }
  }

}