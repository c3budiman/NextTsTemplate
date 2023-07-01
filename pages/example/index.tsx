import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { Row, Col, Card, Form, Button, Table } from 'antd';
import Head from 'next/head';
import { handleSessions } from "../../Utils/Helpers/GetSession";
import useWindowSize from "../../Utils/Helpers/ReactHelper";
import TestComponent from "../../Components/TestComponent";


const Example = (session: { session: any }) => {
    const [loading, setLoading] = useState(false);
    // plz use dynamic import from your editor for this one :
    const { isMobile } = useWindowSize();
    

    const renderCount = useRef(0);

    useEffect(() => {
        renderCount.current = renderCount.current + 1;
        console.log(`Rendered ${renderCount.current} times`);
    });

    // useEffect(() => {
    //     setCount(1)
    // }, [])
    const tesfunc = () => {
        console.log('apa saya ikut ke render juga?')
    }

    tesfunc()
    
    return (
        <>
            <TestComponent 
                onChange={(data) => {console.log({data})}} 
            />
        </>
    )
}
export async function getServerSideProps(context: any) {
    let checkSessions = await handleSessions(context);
    return checkSessions;
}

export default Example;