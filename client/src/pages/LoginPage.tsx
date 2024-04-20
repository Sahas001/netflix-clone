import { createContext, useState } from "react";
import Input from "../components/Input";
import NavBar from "../components/NavBar";
import {
  FieldErrors,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from "react-hook-form";

export type Inputs = {
  email: string;
  password: string;
  name: string;
};

type AuthFormContextType = {
  register: UseFormRegister<Inputs> | null;
  errors: FieldErrors<Inputs>;
};

enum Variant {
  SIGN_UP,
  LOG_IN,
}

export const AuthFormContext = createContext<AuthFormContextType>({
  register: null,
  errors: {},
});

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<
    Inputs
  >();
  const [variant, setVariant] = useState(Variant.LOG_IN);

  console.log(errors);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <div className="relative bg-black h-screen w-screen bg-opacity-50">
      <NavBar />
      <div className="flex justify-center items-center h-full">
        <div className="bg-black bg-opacity-70 p-16 self-center mt-2 w-full max-w-md rounded-md">
          <h2 className="text-white text-4xl mb-8 font-semibold">
            {variant == Variant.SIGN_UP ? "Sign up" : "Log in"}
          </h2>

          <AuthFormContext.Provider value={{ register, errors }}>
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              {variant === Variant.SIGN_UP && (
                <Input id="username" type="text" label="Username" name="name" />
              )}
              <Input
                id="email"
                type="email"
                label="Email Address"
                name="email"
              />
              <Input
                id="password"
                type="password"
                label="Password"
                name="password"
                validate={variant === Variant.SIGN_UP
                  ? () => {
                    const password = getValues("password");
                    if (password.length < 8) {
                      return "Password must be greater than 8 characters";
                    }
                    if (!/[A-Z]/.test(password)) {
                      return "Password must have at least one uppercase and lowercase letter";
                    }
                    if (!/[a-z]/.test(password)) {
                      return "Password must have at least one uppercase and lowecase letter";
                    }
                    if (!/\d/.test(password)) {
                      return "Password must have a number";
                    }
                    return true;
                  }
                  : undefined}
              />
              <input
                type="submit"
                className="bg-red-400 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700"
              />
            </form>
          </AuthFormContext.Provider>

          {variant === Variant.LOG_IN
            ? (
              <p
                className="text-neutral-500 mt-12"
                onClick={() => setVariant(Variant.SIGN_UP)}
              >
                <span className="text-white ml-1 hover:underline cursor-pointer">
                  First time using Netflix?
                </span>
              </p>
            )
            : (
              <p
                className="text-neutral-500 mt-12"
                onClick={() => setVariant(Variant.LOG_IN)}
              >
                <span className="text-white ml-1 hover:underline cursor-pointer">
                  Already have an account?
                </span>
              </p>
            )}
        </div>
      </div>
    </div>
  );
}
