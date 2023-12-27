import { Request, Response } from "express";
import { SignUpUserUseCase } from "../../../domain/useCases/user/signUp";
import { IUser } from "../../../domain/entities/User";
import { omitUserResponse } from "../../../providers/omitUserResponse";
import {
  ConfirmPasswordError,
  InternalServerError,
} from "../../../providers/errors";
import crypto from "node:crypto";
import "dotenv/config";

export class SignUpUserController {
  constructor(private signUpUserUseCase: SignUpUserUseCase) {}

  async handle(request: Request, response: Response) {
    try {
      const data: IUser = request.body;

      if (data.confirmPassword !== data.password) {
        response
          .status(406)
          .json(
            new ConfirmPasswordError(
              "Password and Confirmation should be strict equal."
            ).message
          );
      }

      const hashPassword = crypto
        .createHash("sha256")
        .update(data.password)
        .digest("hex");
      const hashConfirm = crypto
        .createHash("sha256")
        .update(data.confirmPassword)
        .digest("hex");

      const signUpUser = await this.signUpUserUseCase.execute({
        ...data,
        password: hashPassword,
        confirmPassword: hashConfirm,
      });

      const res = omitUserResponse(signUpUser as IUser);

      response.status(201).json({
        data: {
          ...res,
        },
      });
    } catch (error: unknown) {
      if (error instanceof InternalServerError) {
        response.status(500).json(error);
      }
    }
  }
}
