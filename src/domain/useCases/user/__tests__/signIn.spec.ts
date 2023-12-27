import { SignInUserUseCase } from "../signIn"; // Nome do arquivo do caso de uso SignIn
import { IUser } from "../../../entities/User";
import { SignInError } from "../../../../providers/errors";
import { UserRepository } from "../../../../respository/user";

describe("SignIn.ts", () => {
  let mockUser: IUser = {
    firstName: "User",
    lastName: "Mock",
    birthDate: new Date(),
    city: "Toronto",
    country: "Canada",
    email: "user@mail.com",
    password: "123",
    confirmPassword: "123",
    events: [],
  };

  let mockRepository: Pick<UserRepository, "signIn"> = {
    signIn: async (email: string) => {
      if (email === mockUser.email) {
        const { password, confirmPassword, ...mockResponse } = mockUser;
        return mockResponse as Partial<IUser>;
      } else {
        return {} as Partial<IUser>;
      }
    },
  };

  let signIn: SignInUserUseCase;

  beforeEach(() => {
    signIn = new SignInUserUseCase(mockRepository as UserRepository);
  });

  it("should sign a user in successfully", async () => {
    const { password, confirmPassword, ...expectedUser } = mockUser as Partial<IUser>;

    const sut = await signIn.execute(mockUser.email, mockUser.password);
    expect(sut).toEqual(expect.objectContaining(expectedUser));
  });

  it("should handle incorrect email or password correctly", async () => {
    const sut = await signIn.execute('wrongemail@mail.com', 'wrongpassword');
    expect(sut).toEqual({});
  });

  it("should handle SignInError correctly", async () => {
    const error = new SignInError("Error to sign user in.");
    jest.spyOn(mockRepository, "signIn").mockRejectedValueOnce(error);

    try {
      await signIn.execute(mockUser.email, mockUser.password);
      fail("Should throw SignInError");
    } catch (caughtError: unknown) {
      expect(caughtError).toBeInstanceOf(SignInError);
      expect(caughtError).toEqual(error);
    }
  });
});
