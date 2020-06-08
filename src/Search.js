import React from "react";
import Book from "./Book";
import { Link } from "react-router-dom";
import { search } from "./BooksAPI";

class Search extends React.Component {
  state = {
    textField: "",
    serachedBooks: [],
  };

  updateTextField = (e) => {
    this.setState({ textField: e.target.value }, this.searchBook);
  };

  searchBook = () => {
    if (this.state.textField !== "") {
      search(this.state.textField).then((data) => {
        this.setState({ serachedBooks: data });
      });
    } else {
      this.setState({serachedBooks: []});
    }
  };

  render = () => {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>

          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.textField}
              onChange={(e) => this.updateTextField(e)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.serachedBooks.length > 0 ? (
              this.state.serachedBooks.map((book) => (
                <Book
                  key={book.id}
                  book={book}
                  updateBook={this.props.updateBook}
                />
              ))
            ) : (
              <></>
            )}
          </ol>
        </div>
      </div>
    );
  };
}

export default Search;
