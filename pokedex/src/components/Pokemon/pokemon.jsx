import "./Pokemon.css";
function Pokemon({ name, image }) {
  return (
    <div className="pokemon">
      <div className="name">{name}</div>
      <div className="imgdiv">
        <img className="img" src={image} alt="" />
      </div>
    </div>
  );
}
export default Pokemon;
