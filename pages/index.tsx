import Head from "next/head";
import DashboardLayout from "../Layouts/DashboardLayout";
import { handleSessions } from "../Utils/Helpers/GetSession";

function Home(session: any) {
  return (
    <>
      <Head>
        <title>Next TS Template</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout session={session}>
        tes
      </DashboardLayout>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const checkSessions = await handleSessions(context, false);
  return checkSessions;
}

export default Home;
