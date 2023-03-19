import { ChangeEvent, FormEvent, ReactElement, useState } from "react";

export interface Credentials {
  userName: string;
  password: string;
}

export default function LoginPage(): ReactElement {
  const [cred, setCred] = useState({} as Credentials);

  function handleChange({ target: { value, name } }: ChangeEvent<HTMLInputElement>): void {
    setCred({ ...cred, [name]: value });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const d = await (
      await fetch("/api/auth/login", { method: "post", body: JSON.stringify(cred) })
    ).json();
    console.log(d);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="email" onChange={handleChange} name="userName" />
        <input type="password" placeholder="password" onChange={handleChange} name="password" />
        <button>Send</button>
      </form>
    </>
  );
}
