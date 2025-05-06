import { postgresErrorCodes } from "../errors";
import { UserError, ServerError } from "../../../app/utils/CustumErrors";

export function getCustomError (error : any) {
    const errorHandlers : Partial<Record<postgresErrorCodes,{message : string, statusCode : number}>> = {
        [postgresErrorCodes.NOT_NULL_VIOLATION]: {
            message:`Missing required field: ${error.column || 'unknown field'}`,
            statusCode: 400,
        },
        [postgresErrorCodes.FOREIGN_KEY_VIOLATION]: {
            message: "The referenced prison does not exist",
            statusCode: 400,
        },
        [postgresErrorCodes.UNIQUE_VIOLATION]: {
            message: "Officer already exists",
            statusCode: 409,
        },
        [postgresErrorCodes.CHECK_VIOLATION]: {
            message: `Invalid value for field: ${error.column || 'unknown field'}`,
            statusCode: 400,
        }
    }
    const handler = errorHandlers[error.code as postgresErrorCodes];

    if (handler) {
        return new UserError(handler.message , handler.statusCode);
    }else {
        return new ServerError(error.message , 500);
    }
}


