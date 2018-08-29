export default class Maybe<T> {
    private readonly value: T;

    private constructor(value: T) {
        this.value = value;
    }

    public static of<T>(value: T): Maybe<T> {
        return new Maybe(value);
    }

    public isNothing(): boolean {
        return this.value === undefined || this.value === null;
    }

    public map<U>(f: (value: T) => U): Maybe<U | null> {
        if (this.isNothing()) {
            return Maybe.of(null);
        }

        return Maybe.of(f(this.value));
    }

    public join(): T {
        return this.value;
    }

    public chain<U>(f: (value: T) => U) {
        return this.map(f).join();
    }

    public orElse<U>(value: U): Maybe<T | U> {
        if (this.isNothing()) {
            return Maybe.of(value);
        }

        return this;
    }

    public apply(f: any): any {
        return f.map(this.value);
    }
}
