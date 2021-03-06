import React from 'react';
import { TextField } from '@material-ui/core';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { compAddress: '' };

    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.props.setOnePostData(event.target.value);
    // this.setState({ compAddress: event.target.value });
  }

  render() {
    return (
      <div className="ui segment">
        <form onSubmit={this.props.setOnePostDataOnSubmit} className="ui form">
          <TextField id="compAddress" label="myhome.ie url" variant="outlined" value={this.props.urlAddress} onChange={this.handleChange} />
        </form>
      </div>
    );
  }
}

export default SearchBar;