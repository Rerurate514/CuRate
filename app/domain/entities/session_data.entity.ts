import { ExpiresAt } from "../vo/expires_at";

export class SessionDataEntity {
    private constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly expiresAt: ExpiresAt
    ) {}

    static create(params: { userId: string; expiresAt: ExpiresAt }) {
        return new SessionDataEntity(
            crypto.randomUUID(),
            params.userId,
            params.expiresAt
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

        return new SessionDataEntity(params.id, params.userId, new ExpiresAt(date));
    }

    public isExpired(): boolean {
        return this.expiresAt.isPast();
    }
}
