import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    BaseEntity
} from 'typeorm';

@Entity('applicants')
export class Applicant extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 150 })
    email: string;

    @Column({ length: 20 })
    phone: string;

    @Column({ length: 50 })
    license_type: string;

    @Column({ length: 50 })
    license_number: string;

    @Column({ length: 2 })
    license_state: string;

    @Column()
    cv_url: string;

    @Column({ type: 'text', nullable: true })
    message?: string;

    @CreateDateColumn()
    created_at: Date;
}
