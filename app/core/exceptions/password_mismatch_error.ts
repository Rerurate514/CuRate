export class PasswordMismatchError extends Error {
    constructor() {
        super("Password mismatch")
    }
}
