import { Request, Response } from "express";
import { SignUpUserUseCase } from "../../../domain/useCases/user/signUp";
import { IUser } from "../../../domain/entities/User";
import { omitUserResponse } from "../../../providers/omitUserResponse";
import { ValidatorUserInput } from "../../../providers/validators/userInput";
import {
  ConfirmPasswordError,
  InternalServerError,
  SignUpError,
} from "../../../providers/errors";
import crypto from "node:crypto";
import "dotenv/config";

export class SignUpUserController {
  constructor(private signUpUserUseCase: SignUpUserUseCase) {}

  async handle(request: Request, response: Response) {
    try {
      const data: IUser = request.body;

      let validationResult = ValidatorUserInput.safeParse(data);

      if (!validationResult.success) {
        return response.status(400).json({
          errors: validationResult.error.issues,
        });
      }

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

      let validatedUserInput: IUser = {
        ...validationResult.data,
        password: hashPassword,
        confirmPassword: hashConfirm
      };

      const signUpUser = await this.signUpUserUseCase.execute(validatedUserInput);

      const res = omitUserResponse(signUpUser as IUser);

      response.status(201).json({
        data: {
          ...res,
        },
      });
    } catch (error: unknown) {
      if (error instanceof SignUpError) {
        response.status(409).json(error.message)
      };

      if (error instanceof InternalServerError) {
        response.status(500).json(error);
      }
    }
  }
}
