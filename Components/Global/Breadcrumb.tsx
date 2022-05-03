import { Breadcrumb } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/reducer";
import { isNotDashboard } from "../../Utils/Helpers/Routing";

function BreadcrumbOur() {
  const bread = useSelector((state: RootState) => state.layout.breadcrumb);
  const router = useRouter();
  return (
    <div>
      {(bread?.length > 0 ?? false) && !isNotDashboard(router) ? (
        <Breadcrumb style={{ margin: "16px 0" }}>
          {bread.map((item: any) => (
            <Breadcrumb.Item key={item?.url}>
              <Link href={item?.url ?? ""}>{item?.name ?? ""}</Link>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      ) : (
        <div style={{ height: "32px" }} />
      )}
    </div>
  );
}
export default BreadcrumbOur;
