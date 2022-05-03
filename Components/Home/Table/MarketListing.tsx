/* eslint-disable react/jsx-one-expression-per-line */
import { SearchOutlined } from "@ant-design/icons";
import { Result, Row, Table, Input, List, Card, Col, Button } from "antd";
import Head from "next/head";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import FadeIn from "react-fade-in";
import { MarketTabs } from "../../../Configs/MarketsTab";
import { themeColor } from "../../../Configs/themeColor";
import { AllCrytoTabDataType, USDValueDataType } from "../../../Types/MarketTabs/AllCryptoType";
import { convertToInternationalCurrencySystem } from "../../../Utils/Helpers/NumberHelper";
import useWindowSize from "../../../Utils/Helpers/ReactHelper";

type MarketListingType = {
  errorState: boolean;
  loadingState: boolean;
  readyState: boolean;
  data: AllCrytoTabDataType;
  setData: Dispatch<SetStateAction<AllCrytoTabDataType>>;
};

function MarketListing({
  errorState,
  loadingState,
  readyState,
  data,
  // eslint-disable-next-line no-unused-vars
  setData,
}: MarketListingType) {
  // eslint-disable-next-line no-unused-vars
  // const [dataClone, setDataClone] = useState<AllCrytoTabDataType>([]);
  const { isMobile } = useWindowSize();
  const [paginationTable1, setPaginationTable1] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchKey, setSearchKey] = useState("");
  const [selectedTabs, setSelectedTabs] = useState<string | undefined>();
  // eslint-disable-next-line no-unused-vars
  const handleChangeTable1 = async (paginationA: any, filtersA: any, sorterA: any) => {
    const pager = { ...paginationTable1 };
    pager.current = paginationA.current;
    setPaginationTable1(pager);
    // console.log(sorterA);
  };
  const handleChangeTab = (tab: any) => {
    if (tab.id === selectedTabs) {
      setSelectedTabs(undefined);
    } else {
      setSelectedTabs(tab.id);
    }
  };
  useEffect(() => {
    if (readyState) {
      setPaginationTable1({ ...paginationTable1, total: (data?.length ?? 0) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readyState, data]);

  const symbolStyle = { fontSize: "16px", color: themeColor.fontSecondary, fontWeight: "600", margin: 0 };
  const nameStyle = { fontSize: "14px", color: themeColor.fontGrayish, fontWeight: "400", margin: 0, marginLeft: "10px" };
  const priceStyle = { fontSize: "16px", color: themeColor.priceColorSecondary, fontWeight: "400", margin: 0 };

  let FilteredData = data?.filter(
    // eslint-disable-next-line max-len
    (a: USDValueDataType) => a.name.toLocaleLowerCase().includes(searchKey) || a.symbol.toLocaleLowerCase().includes(searchKey)
  );
  if (selectedTabs) {
    FilteredData = FilteredData?.filter((a: USDValueDataType) => a.tags.includes(selectedTabs ?? ""));
  }
  const PaginationOnFilter = { ...paginationTable1, total: FilteredData?.length };
  const getColorOfPercentage = (percentageChange: any) => {
    if (percentageChange > 0) {
      return "green";
    }
    if (percentageChange < 0) {
      return "red";
    }
    return themeColor.fontGrayish;
  };
  // console.log('seltabs => ', selectedTabs);
  return (
    <>
      <Head>
        {/* i cant do modular css like next js because of antd table has a lot of class,
          so i override it using this : */}
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/css/table/ListingDesktop.css" />
      </Head>
      {errorState && <Result status="500" title="500" subTitle="Sorry, something went wrong." />}

      {
        readyState && (
          <>
            <div style={{ margin: isMobile ? "0px 20px" : "0" }}>
              {
                isMobile && (
                  <div style={{ height: "10px" }} />
                )
              }
              <h1>Tags :</h1>
            </div>
            <div
              className={isMobile ? "hideScrollBar" : "niceScrollbar"}
              style={{
                overflowX: "auto",
                overflowY: "hidden",
                maxWidth: "100%",
                display: isMobile ? "flex" : "flex",
                marginBottom: "20px",
                padding: isMobile ? "10px 20px" : "0",
              }}
            >
              {
                MarketTabs.allCrypto.data.map((tab) => (
                  <FadeIn key={tab.id}>
                    <Button onClick={() => { handleChangeTab(tab); }} style={{ background: selectedTabs?.includes(tab.id) ? themeColor.success : themeColor.darkBlue, marginRight: "10px", borderColor: "transparent" }}>
                      <p style={{ color: themeColor.white, textAlign: "center" }}>{tab.tab}</p>
                    </Button>
                  </FadeIn>
                ))
              }
            </div>
          </>
        )
      }

      {((readyState || loadingState) && isMobile) && (
        <Card
          style={{
            borderRadius: "5px",
            background: "#fff",
          }}
        >
          {
            readyState && (
              <Input
                placeholder="Search"
                allowClear
                prefix={(
                  <SearchOutlined />
                )}
                onChange={(e) => setSearchKey(e.target.value)}
              />
            )
          }
          <div style={{ height: "20px" }} />
          <List
            id="marketList"
            itemLayout="horizontal"
            dataSource={FilteredData}
            loading={loadingState}
            pagination={{
              pageSize: PaginationOnFilter.pageSize,
              total: PaginationOnFilter.total
            }}
            renderItem={(item: USDValueDataType) => (
              <List.Item>
                <Row style={{ width: "100%" }} align="middle" justify="space-between" gutter={[20, 10]}>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Row style={{ width: "100%" }} align="middle" justify="start" gutter={[20, 10]}>
                      <div className="logoCryptoMobile">
                        <Image alt="logo" height="50px" width="50px" src={item.logoUrl} />
                      </div>
                    </Row>
                    <p style={{ ...symbolStyle, fontSize: "14px" }}>{item?.symbol ?? ""}</p>
                    <p style={{ ...nameStyle, fontSize: "12px", marginLeft: 0 }}>{item?.name ?? ""}</p>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Row justify="end">
                      <p style={{ margin: 0, fontSize: "10px", }}> Price : </p>
                    </Row>
                    <Row justify="end">
                      <p style={{
                        ...priceStyle,
                        // eslint-disable-next-line no-nested-ternary
                        color: item.blinking === "green" ? "green" : item.blinking === "red" ? "red" : themeColor.fontGrayish,
                        fontWeight: item.blinking === "none" ? "400" : "700",
                        fontSize: "12px",
                      }}
                      >
                        {`$${item.priceInUSD}`}
                      </p>
                    </Row>
                    <Row justify="end">
                      <p style={{ margin: 0, fontSize: "10px", }}> 24H Change : </p>
                    </Row>
                    <Row justify="end">
                      <p style={{
                        ...priceStyle,
                        // eslint-disable-next-line no-nested-ternary
                        color: getColorOfPercentage(item.change24hPercentageInUSD),
                        fontWeight: "400",
                        fontSize: "12px",
                      }}
                      >
                        {`${item.change24hPercentageInUSD}%`}
                      </p>
                    </Row>
                    <Row justify="end">
                      <p style={{ margin: 0, fontSize: "10px", }}> Volume : </p>
                    </Row>
                    <Row justify="end">
                      <p style={{ margin: 0, fontSize: "10px", }}> {`$${convertToInternationalCurrencySystem(parseFloat(item.volume24Hour))}`} </p>
                    </Row>
                  </Col>
                </Row>
              </List.Item>
            )}
          />
        </Card>
      )}

      {((readyState || loadingState) && !isMobile) && (
        <>
          {
            readyState && (
              <Input
                style={{ width: "100%", float: "right", marginBottom: "10px" }}
                placeholder="Search"
                allowClear
                prefix={(
                  <SearchOutlined />
                )}
                onChange={(e) => setSearchKey(e.target.value)}
              />
            )
          }

          <Table
            className="components-table-demo-nested"
            id="marketTable"
            // eslint-disable-next-line max-len
            dataSource={FilteredData}
            scroll={{ x: "100%" }}
            onChange={handleChangeTable1}
            pagination={PaginationOnFilter}
            loading={loadingState}
            rowKey={(e) => e.id}
          >
            <Table.Column
              title="Name"
              key="name"
              dataIndex="name"
              width="30%"
              // eslint-disable-next-line max-len
              sorter={(a: USDValueDataType, b: USDValueDataType) => a.symbol.localeCompare(b.symbol)}
              defaultSortOrder="ascend"
              render={(value, item: USDValueDataType) => (
                <Row align="middle" justify="start" gutter={[20, 10]}>
                  <div className="logoCrypto">
                    <Image alt="logo" height="40px" width="40px" src={item.logoUrl} />
                  </div>
                  <p style={symbolStyle}>{item?.symbol ?? ""}</p>
                  <p data-testid="assetName" style={nameStyle}>{item?.name ?? ""}</p>
                </Row>
              )}
            />

            <Table.Column
              title="Last Price"
              key="lastprice"
              dataIndex="priceInUSD"
              width="20%"
              // eslint-disable-next-line arrow-body-style
              sorter={(a: USDValueDataType, b: USDValueDataType) => {
                return parseFloat(a.priceInUSD) - parseFloat(b.priceInUSD);
              }}
              // eslint-disable-next-line no-nested-ternary
              render={(value, item: USDValueDataType) => (
                <p style={{
                  ...priceStyle,
                  // eslint-disable-next-line no-nested-ternary
                  color: item.blinking === "green" ? "green" : item.blinking === "red" ? "red" : themeColor.fontGrayish,
                  fontWeight: item.blinking === "none" ? "400" : "700",
                }}
                >
                  {`$${value}`}
                </p>
              )}
            />

            <Table.Column
              title="24H Change"
              key="change"
              dataIndex="change24hPercentageInUSD"
              width="20%"
              // eslint-disable-next-line max-len
              sorter={(a: USDValueDataType, b: USDValueDataType) => parseFloat(a.change24hPercentageInUSD) - parseFloat(b.change24hPercentageInUSD)}
              render={(value, item: USDValueDataType) => (
                <p style={{
                  ...priceStyle,
                  // eslint-disable-next-line no-nested-ternary
                  color: getColorOfPercentage(item.change24hPercentageInUSD),
                  fontWeight: "400",
                  fontSize: "14px",
                }}
                >
                  {`${item.change24hPercentageInUSD}%`}
                </p>
              )}
            />

            <Table.Column
              title="Volume"
              key="vol"
              dataIndex="volume24Hour"
              // eslint-disable-next-line max-len
              sorter={(a: USDValueDataType, b: USDValueDataType) => parseFloat(a.volume24Hour) - parseFloat(b.volume24Hour)}
              render={(value) => `$${convertToInternationalCurrencySystem(parseFloat(value))}`}
            />
          </Table>
        </>
      )}
    </>
  );
}

export default MarketListing;
