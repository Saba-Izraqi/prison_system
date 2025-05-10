
export class UserError extends Error {
    statusCode: number;

    constructor(message : string, statusCode : number){
        super(message);
        this.statusCode = statusCode; //used for instanceof checks with catch
        this.name = "UserError";
    }
}

export class ServerError extends Error {
    statusCode: number;

    constructor(message : string, statusCode : 500){
        super(message);
        this.statusCode = statusCode; //used for instanceof checks with catch in routes + controllers
    }
}