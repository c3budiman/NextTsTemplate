import { useEffect } from "react";
import Head from "next/head";
import { handleSessions } from "../../Utils/Helpers/GetSession";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { changeSidebarKey } from "../../Redux/layout/action";
import returnStoreAndPersistor from "../../Redux/store";

function Dashboard(session: any) {
  const { store } = returnStoreAndPersistor();

  useEffect(() => {
    store.dispatch(changeSidebarKey(["dashboard"]));
  }, [store]);

  return (
    <>
      <Head>
        <title>Dashboard Page</title>
      </Head>
      <DashboardLayout session={session}>
        <p>Dashboard...</p>
      </DashboardLayout>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const checkSessions = await handleSessions(context);
  return checkSessions;
}

export default Dashboard;
