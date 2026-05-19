export class UserEntity {
    private constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly passwordHash: string
    ) {}
}
