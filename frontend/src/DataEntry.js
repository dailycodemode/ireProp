import React from 'react';
import SearchBar from "./SearchBar";
import fbFuncApi from "./api/fbFuncApi";

class DataEntry extends React.Component {

  state = {
    urlAddress: "https://www.myhome.ie/residential/brochure/27-clonlara-kerry-pike-cork/4543437",
  }

  handleCallback = (childData) => {
    this.setState({ urlAddress: childData })
    const resp = fbFuncApi
      .get(
        "properties"
      )
      .then((resp) => {
        // setTodos(resp.data);
        // console.log(todos);
        console.log(resp.data);
      })
      .catch((err) => {
        console.error("err for some reason");
      });
  }

  handleSubmit = (event) => {
    console.log("parentHandleSubmit: " + event.target.value);
    event.preventDefault();
  }

  render() {
    const { urlAddress } = this.state;
    return (
      <div>
        <SearchBar parentCallback={this.handleCallback} />
        {urlAddress}
      </div>
    )
  }
}
export default DataEntry