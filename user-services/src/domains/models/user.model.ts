import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class UserM {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  name: string;

  @Index({ unique: true })
  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar')
  prof_pict: string;
}
