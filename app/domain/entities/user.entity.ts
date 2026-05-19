import { UserRoles } from "../vo/user_roles";

export class UserEntity {
    private constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly passwordHash: string,
        public readonly role: UserRoles
    ) {}
}
