import { HttpException, HttpStatus } from "@nestjs/common";

export class NotAuthorized extends HttpException {
    constructor() {
        super('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
}