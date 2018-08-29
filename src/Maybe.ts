export default class Maybe {
    private readonly value: any;

    private constructor(value: any) {
        this.value = value;
    }

    public static of(value: any): Maybe {
        return new Maybe(value);
    }

    public isNothing() {
        return this.value === undefined || this.value === null;
    }

    public map(f: (value: any) => any): any {
        if (this.isNothing()) {
            return Maybe.of(null);
        }

        return Maybe.of(f(this.value));
    }

    public join() {
        return this.value;
    }

    public chain(f: () => any) {
        return this.map(f).join();
    }

    public orElse(value: any): Maybe {
        if (this.isNothing()) {
            return Maybe.of(value);
        }

        return this;
    }


    public apply(f: Maybe) {
        return f.map(this.value);
    }
}
