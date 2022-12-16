import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;

  /*
   * Table & Column Constants
   */

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  username: string;

  @Column({ type: 'varchar', nullable: true })
  email: string;

  @Column({ type: 'varchar', nullable: true, select: false })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  full_name: string;

  @Column({ type: 'timestamp', nullable: true })
  date_of_birth: Date;

  @Column({ type: 'varchar', nullable: true })
  gender: string;
}
