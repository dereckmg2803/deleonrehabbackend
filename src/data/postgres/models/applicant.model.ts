import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

export enum ApplicantStatus {
    PENDING = 'Pendiente',
    REVIEWED = 'Revisado',
    CONTACTED = 'Contactado',
    REJECTED = 'Rechazado',
    HIRED = 'Contratado',
}

@Entity('applicants')
export class Applicant extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    phone!: string;

    @Column()
    license_type!: string;

    @Column()
    license_number!: string;

    @Column()
    license_state!: string;

    @Column({ type: 'text', nullable: true })
    message?: string;

    @Column()
    cv_url!: string;

    @Column({
        type: 'enum',
        enum: ApplicantStatus,
        default: ApplicantStatus.PENDING,
    })
    status!: ApplicantStatus;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}
