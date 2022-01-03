import React from 'react';

import PreviewProperty from "./PreviewProperty";
import DataEntry from "./DataEntry";
import Intro from "./Intro";
import fbFuncApi from "./api/fbFuncApi";
// export default function App() {

//   return (
//     <div id="main">

//       <Intro />
//       <br></br>
//       <PreviewProperty />
//       <br />
//       <DataEntry />
//       <br />
//     </div>
//   );
// }

class App extends React.Component {

  state = {
    urlAddress: "",
    onePost: undefined
  }

  setOnePostData = (submittedUrl) => {
    this.setState({ urlAddress: submittedUrl })
  }

  setOnePostDataOnSubmit = (event) => {
    const postHeaders = { url: this.state.urlAddress };

    const resp = fbFuncApi
      .post(
        "oneHome", postHeaders
      )
      .then((resp) => {

        this.setState({ onePost: resp.data })
        console.log("STATE");
        console.log(this.state);

        if (resp.data.houseType == "terr") {
          let dbName = ''
        }
      })
      .catch((err) => {
        console.error("err for some reason");
      });
    event.preventDefault();
  }

  render() {
    return (
      <div id="main">

        <Intro />
        <br></br>
        <PreviewProperty onePageDetails={this.state} />
        <br />
        <DataEntry setOnePostData={this.setOnePostData} setOnePostDataOnSubmit={this.setOnePostDataOnSubmit} stateObj={this.state} />
        <br />
        { }
        {/* https://www.myhome.ie/residential/brochure/27-clonlara-kerry-pike-cork/4543437 */}
      </div>
    )
  }
}
export default App