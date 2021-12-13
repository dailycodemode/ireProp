// import Auth from "./Auth.js";
import PreviewProperty from "./PreviewProperty";
import DataEntry from "./DataEntry";
import Intro from "./Intro";

export default function App() {

  return (
    <div id="main">

      <Intro />
      <br></br>
      <PreviewProperty />
      <br />
      <DataEntry />
      <br />
    </div>
  );
}