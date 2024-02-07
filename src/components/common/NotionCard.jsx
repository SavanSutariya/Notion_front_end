import { Link } from "react-router-dom";
import "./css/NotionCard.css";

function NotionCard({ title, created_by, tags, notion_id }) {
  return (
    <div className="card notion-card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">{created_by}</h6>
        <div className="mb-2 tags">
          {tags.map((tag) => (
            <span className="badge text-bg-info me-1" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <Link to={"notion/" + notion_id} className="btn btn-primary">
          Open
        </Link>
      </div>
    </div>
  );
}
export default NotionCard;
