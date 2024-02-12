import { useParams } from "react-router-dom";
import UserLayout from "../components/layout/UserLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import MDEditor from "@uiw/react-md-editor";

function NotionPage() {
  let params = useParams();
  const [notion, setNotion] = useState({});
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchNotion = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:4000/notion/${params.notion_id}`
        );
        setNotion(response.data);
        setContent(response.data.content);
        setCategory(response.data.category);
        setTitle(response.data.title);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchNotion();
  }, []);
  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:4000/notion/${params.notion_id}`, {
        title,
        content,
        category,
      });
      setNotion({ ...notion, title, content, category });
    } catch (err) {
      setError(err);
    }
  };
  //
  return (
    <>
      <UserLayout>
        <div className="container">
          {error && error.message}
          <div className="card my-3">
            <div className="card-header">
              <h1>
                {loading ? (
                  <span class="placeholder col-4"></span>
                ) : (
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{
                      border: "none",
                      background: "none",
                      width: "100%",
                    }}
                  />
                )}
              </h1>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-4">Created by:</div>
                <div className="col-8">
                  {loading ? (
                    <span class="placeholder col-12"></span>
                  ) : (
                    notion.user.username
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-4">Category:</div>
                <div className="col-8">
                  {loading ? (
                    <span class="placeholder col-12"></span>
                  ) : (
                    // invisible input field
                    <input
                      type="text"
                      value={category}
                      style={{
                        border: "none",
                        background: "none",
                        width: "100%",
                      }}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-4">tags</div>
                <div className="col-8">
                  {loading ? (
                    <span className="placeholder col-12"></span>
                  ) : (
                    notion.tags.map((tag) => (
                      <span className="badge text-bg-info me-1">{tag}</span>
                    ))
                  )}
                </div>
              </div>
            </div>
            <div className="card-footer text-body-secondary">
              {notion.created_at}
            </div>
          </div>
          <hr />
          {loading ? (
            <span className="placeholder col-12"></span>
          ) : (
            <>
              {preview ? (
                <button
                  onClick={() => setPreview(false)}
                  className="btn btn-primary"
                >
                  Edit
                </button>
              ) : (
                <button
                  onClick={() => setPreview(true)}
                  className="btn btn-primary"
                >
                  Preview
                </button>
              )}
              {content === notion.content &&
              title === notion.title &&
              category === notion.category ? (
                ""
              ) : (
                <button onClick={handleSave} className="btn btn-primary mx-2">
                  Save
                </button>
              )}
              {preview ? (
                <MDEditor.Markdown source={content} />
              ) : (
                <MDEditor
                  value={content}
                  height={"100vh"}
                  hideToolbar={true}
                  preview="edit"
                  onChange={(value) => setContent(value)}
                />
              )}
            </>
          )}
        </div>
      </UserLayout>
    </>
  );
}
export default NotionPage;
