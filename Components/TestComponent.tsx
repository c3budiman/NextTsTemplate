import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Row, Col, Card, Form, Button, Table } from 'antd';
import Head from 'next/head';


const TestComponent = ({
    onChange
}: {
    onChange?: (data: number) => void
}) => {
    const [count, setCount] = useState<number>(0)
    return (
        <>
            <h1>{count}</h1>
            <Button onClick={() => {
                if (onChange) onChange(count + 1);
                setCount(count + 1);
            }}>
                Plus 1
            </Button>Ï
        </>
    )
}
export default TestComponent;