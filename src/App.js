import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Search from "./Search";
import Book from "./Book";
import { Route, Link, Switch } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  componentDidMount = () => {
    BooksAPI.getAll().then((data) => {
      this.setState({books: data})
    });
  };

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(data => {
      book.shelf = shelf;

      this.setState(prevState => ({
        books: prevState.books.filter(books => books.id !== book.id).concat(book)
      }))
    })
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/search" render={() => <Search updateBook={this.updateBook}/>} />
          <Route
            exact
            path="/"
            render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    <div className="bookshelf">
                      <h2 className="bookshelf-title">Currently Reading</h2>
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                          {this.state.books.map(book => (
                            book.shelf === "currentlyReading" ? <Book key={book.id} book={book} updateBook={this.updateBook} bookShelfChanger="book-shelf-changer currentlyReading"/> : ""
                          ))}
                        </ol>
                      </div>
                    </div>
                    <div className="bookshelf">
                      <h2 className="bookshelf-title">Want to Read</h2>
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                        {this.state.books.map(book => (
                            book.shelf === "wantToRead" ? <Book key={book.id} book={book} updateBook={this.updateBook} bookShelfChanger="book-shelf-changer wantToRead"/> : ""
                          ))}
                        </ol>
                      </div>
                    </div>
                    <div className="bookshelf">
                      <h2 className="bookshelf-title">Read</h2>
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                        {this.state.books.map(book => (
                            book.shelf === "read" ? <Book key={book.id} book={book} updateBook={this.updateBook} bookShelfChanger="book-shelf-changer read"/> : ""
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="open-search">
                  <Link to="/search">Add a book</Link>
                </div>
              </div>
            )}
          />
          )}
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
