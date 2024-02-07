import { useEffect, useState } from "react";
import UserLayout from "../components/layout/UserLayout";
import "./css/HomePage.css";
import NotionCard from "../components/common/NotionCard";
import axios from "axios";
function HomePage() {
  const [notions, setNotions] = useState([]);

  return (
    <>
      <UserLayout>
        <div className="container">
          {notions.length === 0 ? (
            <p>No notions available</p>
          ) : (
            <div className="notion-container">
              {notions.map((notion) => (
                <NotionCard
                  key={notion.id}
                  title={notion.title}
                  created_at={notion.user.username}
                  tags={notion.tags}
                  notion_id={notion.id}
                />
              ))}
            </div>
          )}
        </div>
      </UserLayout>
    </>
  );
}
export default HomePage;
