import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Row, Col, Card, Form, Button, Table } from 'antd';
import Head from 'next/head';
import { handleSessions } from "../../Utils/Helpers/GetSession";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { Sessions } from "../../Types/Session";
import { changeSidebarKey, InsertBreadcrumb } from "../../Redux/layout/action";
import returnStoreAndPersistor from "../../Redux/store";

const BlogIndex = (session: Sessions) => {
    const { store } = returnStoreAndPersistor();

    useEffect(() => {
        store.dispatch(changeSidebarKey(["blog"]));
        store.dispatch(InsertBreadcrumb([{ name: "Blog", url: "/blog/list" }]));
        return () => {
        store.dispatch(InsertBreadcrumb([]));
        };
    }, [store]);

    return (
        <>
            <Head>
                 <title>
                   Blog Create | {process.env.NEXT_PUBLIC_APPNAME}
                 </title>
            </Head>
             <DashboardLayout session={session}>
                <h3>tes</h3>
             </DashboardLayout>
        </>
    )
}
export async function getServerSideProps(context: any) {
    let checkSessions = await handleSessions(context);
    return checkSessions;
}

export default BlogIndex;