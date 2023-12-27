import { IUser } from "../domain/entities/User";

export function omitUserResponse(data: IUser) {
    const { password, confirmPassword, ...omitedUser } = data;
    return omitedUser; 
}