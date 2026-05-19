export type Result<T, E extends Error = Error> = Success<T> | Failure<E>;

export class Success<T> {
    readonly success = true;
    constructor(public readonly value?: T) { }
}

export class Failure<E extends Error = Error> {
    readonly success = false;
    constructor(public readonly error: E) { }
}

export const success = <T>(value: T): Success<T> => new Success(value);
export const failure = <E extends Error>(error: E): Failure<E> => new Failure(error);
