import { z } from 'zod';

export const CreateApplicantSchema = z.object({
    name: z
        .string({ required_error: 'name is required' })
        .min(3, 'name must be at least 3 characters')
        .max(100),

    email: z
        .string({ required_error: 'email is required' })
        .email('email must be valid'),

    phone: z
        .string({ required_error: 'phone is required' })
        .min(7)
        .max(20),

    license_type: z
        .string({ required_error: 'license_type is required' })
        .min(2)
        .max(50),

    license_number: z
        .string({ required_error: 'license_number is required' })
        .min(2)
        .max(50),

    license_state: z
        .string({ required_error: 'license_state is required' })
        .length(2, 'license_state must be 2 characters'),

    message: z.string().optional()
});

export class CreateApplicantDto {
    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly phone: string,
        public readonly license_type: string,
        public readonly license_number: string,
        public readonly license_state: string,
        public readonly message?: string
    ) { }

    static execute(
        input: { [key: string]: any }
    ): [string?, CreateApplicantDto?] {
        const result = CreateApplicantSchema.safeParse(input);

        if (!result.success) {
            const error = result.error.errors[0]?.message ?? 'Validation failed';
            return [error];
        }

        const {
            name,
            email,
            phone,
            license_type,
            license_number,
            license_state,
            message
        } = result.data;

        return [
            undefined,
            new CreateApplicantDto(
                name,
                email,
                phone,
                license_type,
                license_number,
                license_state,
                message
            )
        ];
    }
}
