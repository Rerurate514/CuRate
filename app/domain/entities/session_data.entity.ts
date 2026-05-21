export class SessionDataEntity {
    private constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly expiresAt: Date
    ) {}

    static create(params: { userId: string; expiresInSeconds: number }) {
        const expiresAt = new Date(Date.now() + params.expiresInSeconds * 1000);
        return new SessionDataEntity(
            crypto.randomUUID(),
            params.userId,
            expiresAt
        );
    }

    static reconstruct(params: {
        id: string;
        userId: string;
        expiresAt: string | number | Date;
    }) {
        let date: Date;
        if (typeof params.expiresAt === "number") {
            date = new Date(params.expiresAt * 1000);
        } else if (typeof params.expiresAt === "string") {
            date = new Date(params.expiresAt);
        } else {
            date = params.expiresAt;
        }

        return new SessionDataEntity(params.id, params.userId, date);
    }

    public isExpired(now: Date = new Date()): boolean {
        return now.getTime() > this.expiresAt.getTime();
    }
}
