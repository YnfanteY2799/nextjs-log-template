import { ReactElement, useState } from "react";
import { useRouter } from "next/router";

export default function DashboardPage(): ReactElement {
  const { push } = useRouter();
  const [usr, setUsr] = useState({});

  async function getProfileData() {
    const res = await (await fetch("/api/getProf")).json();
    setUsr(res);
  }

  async function logOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    push("/login");
  }

  return (
    <>
      <button onClick={getProfileData}>Get Data</button>
      <button onClick={logOut}>LogOut</button>

      <pre>{JSON.stringify(usr)}</pre>
    </>
  );
}
