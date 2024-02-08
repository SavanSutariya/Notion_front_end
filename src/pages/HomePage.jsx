import { useEffect, useState } from "react";
import UserLayout from "../components/layout/UserLayout";
import "./css/HomePage.css";
import NotionCard from "../components/common/NotionCard";
import axios from "axios";
function HomePage() {
  const [notions, setNotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchNotions = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:4000/notion");
        setNotions(response.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchNotions();
  }, []);

  return (
    <>
      <UserLayout>
        <div className="container">
          {loading && <h2>Loading...</h2>}
          {error && <h2>Error: {error.message}</h2>}
          {notions.length === 0 && !loading ? (
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
