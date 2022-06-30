import { useEffect } from "react";
import Head from "next/head";
import { handleSessions } from "../../Utils/Helpers/GetSession";
import DashboardLayout from "../../Layouts/DashboardLayout";
import returnStoreAndPersistor from "../../Redux/store";
import { changeSidebarKey, InsertBreadcrumb } from "../../Redux/layout/action";
import { Sessions } from "../../Types/Session";

function Reports(session: Sessions) {
  const { store } = returnStoreAndPersistor();

  useEffect(() => {
    store.dispatch(changeSidebarKey(["reports"]));
    store.dispatch(InsertBreadcrumb([{ name: "Reports", url: "/reports" }, { name: "Uwow", url: "#" }]));

    return () => {
      store.dispatch(InsertBreadcrumb([]));
    };
  }, [store]);

  return (
    <>
      <Head>
        <title>Report Page</title>
      </Head>
      <DashboardLayout session={session}>
        <p>Report Page...</p>
      </DashboardLayout>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const checkSessions = await handleSessions(context);
  return checkSessions;
}

export default Reports;
