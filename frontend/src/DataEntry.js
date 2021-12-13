import React from 'react';
import SearchBar from "./SearchBar";
import fbFuncApi from "./api/fbFuncApi";
import { Button } from '@material-ui/core';

class DataEntry extends React.Component {

  render() {
    let { urlAddress, onePost } = this.props.stateObj;
    let { setOnePostData, setOnePostDataOnSubmit } = this.props;

    return (
      <div>
        <SearchBar setOnePostData={setOnePostData} setOnePostDataOnSubmit={setOnePostDataOnSubmit} urlAddress={urlAddress} />
        <br />
        {onePost ? <Button variant="outlined">Analyse</Button> : null}

      </div>
    )
  }
}
export default DataEntry