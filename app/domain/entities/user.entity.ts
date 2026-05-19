import { UserRoles } from "../vo/user_roles";

export class UserEntity {
    private constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly passwordHash: string,
        public readonly role: UserRoles,
        public readonly createdAt: Date
    ) {}

    static async create(params: {
        username: string;
        passwordRaw: string;
        role: UserRoles;
    }) {
        const now = new Date();
        const passwordHash = await Bun.password.hash(params.passwordRaw, {
            algorithm: "argon2id"
        });

        return new UserEntity(
            crypto.randomUUID(),
            params.username,
            passwordHash,
            params.role,
            now
        );
    }

    static reconstruct(params: {
        id: string;
        name: string;
        passwordHash: string;
        role: UserRoles;
        createdAt: string | Date;
    }) {
        return new UserEntity(
            params.id,
            params.name,
            params.passwordHash,
            params.role,
            typeof params.createdAt === "string" ? new Date(params.createdAt) : params.createdAt
        );
    }
}
