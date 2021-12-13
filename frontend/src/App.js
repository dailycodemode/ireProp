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
    onePost : {}
  }

  setOnePostData = (submittedUrl) => {
    this.setState({ urlAddress: submittedUrl })
    const postHeaders = { url: submittedUrl };

    const resp = fbFuncApi
      .post(
        "oneHome", postHeaders
      )
      .then((resp) => {
        this.setState({ onePost: resp.data })
        console.log(this.state);
      })
      .catch((err) => {
        console.error("err for some reason");
      });
  }

  render() {
    return (
      <div id="main">

      <Intro />
      <br></br>
      <PreviewProperty mainImg={this.state.onePost.mainImg}/>
      <br />
      <DataEntry setOnePostData={this.setOnePostData} urlAddress={this.state.urlAddress} />
      <br />
      https://www.myhome.ie/residential/brochure/27-clonlara-kerry-pike-cork/4543437
    </div>
    )
  }
}
export default App