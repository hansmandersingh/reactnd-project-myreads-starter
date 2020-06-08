import React from "react";
import * as BooksAPI from "./BooksAPI";

export default class Book extends React.Component {
  state = {
    optionValue: "none",
  }

  handleChange = (e) => {
    this.setState({optionValue: e.target.value}, () => this.props.updateBook(this.props.book, this.state.optionValue))
  }

  render = () => {
    let bookUrl;

    if (this.props.book.imageLinks !== undefined) {
      bookUrl = this.props.book.imageLinks.thumbnail;
    }
    
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${bookUrl})`,
              }}
            />
            <div className={this.props.bookShelfChanger}>
              <select value={this.props.book.shelf} onChange={this.handleChange}>
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          {this.props.book.authors !== undefined ? (
            this.props.book.authors.map((author) => (
              <div
                key={this.props.book.authors.indexOf(author)}
                className="book-authors"
              >
                {author}
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </li>
    );
  };
}
