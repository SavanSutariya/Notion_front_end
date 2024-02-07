import { useParams } from "react-router-dom";
import UserLayout from "../components/layout/UserLayout";

function NotionPage() {
  let params = useParams();
  return (
    <>
      <UserLayout>Notion: {params.page_id}</UserLayout>
    </>
  );
}
export default NotionPage;
