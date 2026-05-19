import { UserRoles } from "../vo/user_roles";

export class UserEntity {
    private constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly passwordHash: string,
        public readonly role: UserRoles,
        public readonly createdAt: Date
    ) {}

    static create(params: {
        username: string,
        passwordHash: string,
        role: UserRoles
    }) {
        const now = new Date();

        return new UserEntity(
            crypto.randomUUID(),
            params.username,
            params.passwordHash,
            params.role,
            now
        )
    }
}
