import React from 'react';
import SearchBar from "./SearchBar";
import fbFuncApi from "./api/fbFuncApi";

class DataEntry extends React.Component {

  render() {
    // const { urlAddress } = this.props.state;
    return (
      <div>
        <SearchBar setOnePostData={this.props.setOnePostData} urlAddress={this.props.urlAddress}/>
        {this.props.urlAddress}
      </div>
    )
  }
}
export default DataEntry