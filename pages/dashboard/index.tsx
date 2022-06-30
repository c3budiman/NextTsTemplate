import { useEffect } from "react";
import Head from "next/head";
import { handleSessions } from "../../Utils/Helpers/GetSession";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { changeSidebarKey, InsertBreadcrumb } from "../../Redux/layout/action";
import returnStoreAndPersistor from "../../Redux/store";
import { Sessions } from "../../Types/Session";

function Dashboard(session: Sessions) {
  const { store } = returnStoreAndPersistor();

  useEffect(() => {
    store.dispatch(changeSidebarKey(["dashboard"]));
    store.dispatch(InsertBreadcrumb([{ name: "Dashboard", url: "/dashboard" }]));
    return () => {
      store.dispatch(InsertBreadcrumb([]));
    };
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
