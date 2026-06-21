"use client";

import { useState, useMemo } from "react";
import { useAuthStore } from "@/stores/authStore";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { signInImage } from "@/images";

const SignUpPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirectTo = searchParams.get("redirectTo");
  const { signUp } = useAuthStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!agreeToTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }

    setLoading(true);

    try {
      await signUp(email, password, name);
      // Redirect to sign-in page after successful signup
      router.push(
        `/sign-in${
          redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
        }`
      );
    } catch (err: any) {
      setError(err.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  // Check if all required fields are filled - recalculates when dependencies change
  const isFormValid = useMemo(
    () =>
      name.trim() !== "" &&
      email.trim() !== "" &&
      password.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      agreeToTerms &&
      password === confirmPassword &&
      password.length >= 6,
    [name, email, password, confirmPassword, agreeToTerms]
  );


  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gofarm-white">
      <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 rounded-md bg-white">
        <div className="md:max-w-md w-full px-4 py-4">
          <form onSubmit={handleEmailSignUp}>
            <div className="mb-12">
              <Link href="/" className="inline-block mb-6">
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  width={120}
                  height={40}
                  className="cursor-pointer"
                />
              </Link>
              <h1 className="text-gofarm-black text-3xl font-bold">
                Create Account
              </h1>
              <p className="text-[15px] mt-6 text-gofarm-gray">
                Already have an account?{" "}
                <Link
                  href={`/sign-in${
                    redirectTo
                      ? `?redirectTo=${encodeURIComponent(redirectTo)}`
                      : ""
                  }`}
                  className="text-gofarm-green font-medium hover:underline ml-1 whitespace-nowrap"
                >
                  Sign in here
                </Link>
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg text-sm font-medium">
                {error}
              </div>
            )}

            <div>
              <label className="text-gofarm-black text-[13px] font-medium block mb-2">
                Full Name
              </label>
              <div className="relative flex items-center">
                <input
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-gofarm-black text-sm border-b border-gofarm-gray/30 focus:border-gofarm-green pl-2 pr-8 py-3 outline-none transition-colors"
                  placeholder="Enter your full name"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#6b7280"
                  className="w-[18px] h-[18px] absolute right-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            </div>

            <div className="mt-8">
              <label className="text-gofarm-black text-[13px] font-medium block mb-2">
                Email
              </label>
              <div className="relative flex items-center">
                <input
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-gofarm-black text-sm border-b border-gofarm-gray/30 focus:border-gofarm-green pl-2 pr-8 py-3 outline-none transition-colors"
                  placeholder="Enter email"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#6b7280"
                  stroke="#6b7280"
                  className="w-[18px] h-[18px] absolute right-2"
                  viewBox="0 0 682.667 682.667"
                >
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g
                    clipPath="url(#a)"
                    transform="matrix(1.33 0 0 -1.33 0 682.667)"
                  >
                    <path
                      fill="none"
                      strokeMiterlimit="10"
                      strokeWidth="40"
                      d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                      data-original="#000000"
                    ></path>
                    <path
                      d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                      data-original="#000000"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>

            <div className="mt-8">
              <label className="text-gofarm-black text-[13px] font-medium block mb-2">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-gofarm-black text-sm border-b border-gofarm-gray/30 focus:border-gofarm-green pl-2 pr-8 py-3 outline-none transition-colors"
                  placeholder="At least 6 characters"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#6b7280"
                  stroke="#6b7280"
                  className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                  viewBox="0 0 128 128"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <path
                    d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
            </div>

            <div className="mt-8">
              <label className="text-gofarm-black text-[13px] font-medium block mb-2">
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full text-gofarm-black text-sm border-b border-gofarm-gray/30 focus:border-gofarm-green pl-2 pr-8 py-3 outline-none transition-colors"
                  placeholder="Confirm your password"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#6b7280"
                  stroke="#6b7280"
                  className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                  viewBox="0 0 128 128"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <path
                    d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
            </div>

            <div className="flex items-center mt-8">
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="h-4 w-4 shrink-0 text-gofarm-green focus:ring-gofarm-green border-gofarm-gray/30 rounded-sm accent-gofarm-green"
              />
              <label
                htmlFor="agree-terms"
                className="ml-3 block text-sm text-gofarm-black"
              >
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-gofarm-green font-medium hover:underline"
                >
                  Terms and Conditions
                </Link>
              </label>
            </div>

            <div className="mt-12">
              <button
                type="submit"
                disabled={loading || !isFormValid}
                className="w-full shadow-xl py-2.5 px-4 text-sm font-medium tracking-wide rounded-md text-white bg-gofarm-green hover:bg-gofarm-light-green focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </div>


          </form>
        </div>

        <div className="w-full h-full flex items-center">
          <Image
            src={signInImage}
            alt="signup-image"
            width={500}
            height={500}
            className="w-full aspect-square object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
