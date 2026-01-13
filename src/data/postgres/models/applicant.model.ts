import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';

@Entity('applicants')
export class Applicant {
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

    // Guardas el código: GA, FL, NY, etc.
    @Column({ length: 2 })
    license_state: string;

    // URL o path en GCS
    @Column()
    cv_url: string;

    @Column({ type: 'text', nullable: true })
    message?: string;

    @CreateDateColumn()
    created_at: Date;
}
