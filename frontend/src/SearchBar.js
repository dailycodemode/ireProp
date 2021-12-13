import React from 'react';
import { TextField } from '@material-ui/core';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { compAddress: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (event) => {
    console.log(this.state.compAddress)
    event.preventDefault();
  }

  handleChange(event) {
    this.props.parentCallback(event.target.value);
    this.setState({ compAddress: event.target.value });
  }

  render() {
    return (
      <div className="ui segment">
        <form onSubmit={this.handleSubmit} className="ui form">
          <TextField id="compAddress" label="myhome.ie url" variant="outlined" value={this.state.compAddress} onChange={this.handleChange} />
        </form>
      </div>
    );
  }
}

export default SearchBar;