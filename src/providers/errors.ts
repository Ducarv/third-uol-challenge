export class SignUpError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "SignUpError"
    }
}

export class InternalServerError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InternalServerError"
    }
}

export class ConfirmPasswordError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ConfirmPasswordError"
    }
}