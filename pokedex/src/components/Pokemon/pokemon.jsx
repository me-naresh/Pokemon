import "./Pokemon.css";
import { Link } from "react-router-dom";

function Pokemon({ name, image, id }) {
  return (
    <div className="pokemon">
      <Link to={`/pokemon/${id}`}>
        <div className="name">{name}</div>
        <div className="">
          <img className="img" src={image} alt="" />
        </div>
      </Link>
    </div>
  );
}
export default Pokemon;
