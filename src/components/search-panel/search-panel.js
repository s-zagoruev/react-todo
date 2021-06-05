import React, {Component} from 'react'

class SearchPanel extends Component {
  state = {
    term: ''
  }

  onSearchChange = (e) => {
    const term = e.target.value;
    this.setState({ term }) // { term } == {term: term}
    this.props.onSearchChange(term)
  }

  render() {
    return (
      <input
        type="text"
        className="form-control search-input"
        placeholder="type to search"
        onChange={this.onSearchChange}
        value={this.state.term}
      />
    );
  }
}

export default SearchPanel
