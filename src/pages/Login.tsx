import { useState } from "react";
import {
  MessageCircle,
  Phone,
  User,
} from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";

type LoginFormInputs = {
  name: string;
  phoneNumber: string;
};

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    mode: "onChange",
    defaultValues: {
      name: "",
      phoneNumber: "",
    },
  });

  const phoneRegex =
    /^\+?[0-9]{1,4}[-\s.]?[0-9]{3,4}[-\s.]?[0-9]{3,9}$/;

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      console.log("Login data:", data);

      // Replace with your actual API request
      await new Promise((resolve) => setTimeout(resolve, 1500));

      
      const response = await fetch(`${import.meta.env.BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Unable to continue. Please try again.");
      }

      const result = await response.json();
      console.log(result);
     
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to continue. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070b14] text-white">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.12),transparent_35%)]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-md">

          {/* Brand */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-violet-600 shadow-lg shadow-blue-500/20">
              <MessageCircle
                className="h-7 w-7 text-white"
                strokeWidth={2.2}
              />
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              Enter your details to continue chatting
            </p>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-white/8 bg-white/4.5 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">

            {/* Error */}
            {submitError && (
              <div
                role="alert"
                className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
              >
                {submitError}
              </div>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-5"
            >

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Your name
                </label>

                <div className="relative">
                  <User
                    className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="John Doe"
                    {...register("name", {
                      required: "Your name is required",

                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },

                      maxLength: {
                        value: 100,
                        message: "Name cannot exceed 100 characters",
                      },

                      pattern: {
                        value: /^[a-zA-Z\s'-]+$/,
                        message:
                          "Name can only contain letters, spaces, hyphens, and apostrophes",
                      },
                    })}
                    className={`w-full rounded-xl border bg-slate-950/50 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:ring-2 ${
                      errors.name
                        ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/10"
                        : "border-white/10 focus:border-blue-500/60 focus:ring-blue-500/10"
                    }`}
                  />
                </div>

                {errors.name && (
                  <p className="mt-2 text-xs font-medium text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Phone number
                </label>

                <div className="relative">
                  <Phone
                    className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    id="phoneNumber"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+880 1712 345678"
                    {...register("phoneNumber", {
                      required: "Phone number is required",

                      pattern: {
                        value: phoneRegex,
                        message:
                          "Please enter a valid phone number",
                      },
                    })}
                    className={`w-full rounded-xl border bg-slate-950/50 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:ring-2 ${
                      errors.phoneNumber
                        ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/10"
                        : "border-white/10 focus:border-blue-500/60 focus:ring-blue-500/10"
                    }`}
                  />
                </div>

                {errors.phoneNumber && (
                  <p className="mt-2 text-xs font-medium text-red-400">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-linear-to-r from-blue-600 to-violet-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:scale-[1.01] hover:from-blue-500 hover:to-violet-500 hover:shadow-blue-600/30 disabled:cursor-not-allowed disabled:scale-100 disabled:opacity-60"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      Connecting...
                    </>
                  ) : (
                    <>
                      Continue to Chat

                      <MessageCircle className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* Info */}
            <div className="mt-7 rounded-xl border border-blue-500/10 bg-blue-500/5 p-4">
              <p className="text-center text-xs leading-relaxed text-slate-400">
                Your name and phone number help us identify your account
                and keep your conversations connected.
              </p>
            </div>

            {/* Register */}
            <p className="mt-7 text-center text-sm text-slate-500">
              New to Chat Application?{" "}
              <a
                href="/register"
                className="font-semibold text-blue-400 transition hover:text-blue-300"
              >
                Create an account
              </a>
            </p>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-slate-600">
            Your conversations are private and secure.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;