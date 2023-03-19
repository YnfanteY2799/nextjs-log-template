import { ChangeEvent, FormEvent, ReactElement, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import type { Status } from "../api/auth/login";
import GetSvg from "@/components/Svgs";
import "./login.module.css";

export interface Credentials {
  userName: string;
  password: string;
}

export default function LoginPage(): ReactElement {
  const { push } = useRouter();

  const [cred, setCred] = useState({} as Credentials);

  function handleChange({ target: { value, name } }: ChangeEvent<HTMLInputElement>): void {
    setCred({ ...cred, [name]: value });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const d: Status = await (
      await fetch("/api/auth/login", { method: "post", body: JSON.stringify(cred) })
    ).json();
    const { valid } = d;
    if (valid) push("/Dboard");
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="h-screen flex">
        <div className="hidden lg:flex w-full lg:w-1/2 justify-around items-center bg-black">
          <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
            <h1 className="text-white font-bold text-4xl font-sans">Simple App</h1>
            <p className="text-white mt-1">The simplest app to use</p>
            <div className="flex justify-center lg:justify-start mt-6">
              {/* <a
                href="#"
                className="hover:bg-indigo-700 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-indigo-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2"
              >
                Get Started
              </a> */}
            </div>
          </div>
        </div>

        <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
          <div className="w-full px-8 md:px-32 lg:px-24">
            <form
              className="bg-white rounded-md shadow-2xl p-5 border-black  border-2"
              onSubmit={handleSubmit}
            >
              <h1 className="text-gray-800 font-bold text-2xl mb-1 text-center">Hello Again!</h1>
              <p className="text-sm font-normal text-gray-600 mb-8 text-center">Welcome Back</p>

              <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                <GetSvg className="h-5 w-5 text-gray-400" type="email" />
                <input
                  className="pl-2 w-full outline-none border-none"
                  type="email"
                  name="userName"
                  placeholder="Email Address"
                  onBlur={handleChange}
                />
              </div>
              <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
                <GetSvg className="h-5 w-5 text-gray-400" type="password" />
                <input
                  className="pl-2 w-full outline-none border-none"
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Password"
                  onBlur={handleChange}
                />
              </div>
              <button
                type="submit"
                className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
              >
                Login
              </button>
              {/* <div className="flex justify-between mt-4">
                  <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">
                    Forgot Password ?
                  </span>

                  <a
                    href="#"
                    className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
                  >
                    Don't have an account yet?
                  </a>
                </div> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
