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

export class NotAuthenticated extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NotAuthenticated"
    }
}

export class ConfirmPasswordError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ConfirmPasswordError"
    }
}

export class CannotSignIn extends Error {
    constructor(message: string) {
        super(message);
        this.name = "CannotSignIn"
    }
}

export class SignInError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "SignInError"
    }
}

export class CreateEventError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "CreateEventError"
    }
}

export class GetEventsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "GetEventsError"
    }
}