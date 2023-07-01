import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Row, Col, Card, Form, Button, Table, Input } from 'antd';
import Head from 'next/head';
import { handleSessions } from "../../Utils/Helpers/GetSession";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { Sessions } from "../../Types/Session";
import { changeSidebarKey, InsertBreadcrumb } from "../../Redux/layout/action";
import returnStoreAndPersistor from "../../Redux/store";

const BlogCreate = (session: Sessions) => {
    console.log(session.token)
    const { store } = returnStoreAndPersistor();

    useEffect(() => {
        store.dispatch(changeSidebarKey(["blog/create"]));
        store.dispatch(InsertBreadcrumb([{ name: "Blog", url: "/blog/create" }]));
        return () => {
        store.dispatch(InsertBreadcrumb([]));
        };
    }, [store]);

    const [formantd] = Form.useForm()

    const onSubmit = () => {
        formantd.validateFields().then((d) => {
            console.log(d)
        })
    }

    return (
        <>
            <Head>
                 <title>
                   Blog Create | {process.env.NEXT_PUBLIC_APPNAME}
                 </title>
            </Head>
             <DashboardLayout session={session}>
                <Form form={formantd} layout="vertical">
                    <Form.Item
                        name="nama"
                        label="Nama"
                        required
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        required
                    >
                        <Input />
                    </Form.Item>
                </Form>

                <Button onClick={onSubmit} type="primary">Submit</Button>
             </DashboardLayout>
        </>
    )
}
export async function getServerSideProps(context: any) {
    let checkSessions = await handleSessions(context);
    return checkSessions;
}

export default BlogCreate;