import {Component} from 'react'

import './App.css'

import {v4 as uuidv4} from 'uuid'
import PasswordItem from './components/PasswordItem'

class App extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    count: 0,
    passwordsList: [],
    showPassword: false,
    searchInput: '',
  }

  onChangeWebsiteInput = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsernameInput = event => {
    this.setState({username: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({password: event.target.value})
  }

  onClickAddBtn = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const newPAssword = {
      id: uuidv4(),
      website,
      username,
      password,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPAssword],
      count: prevState.count + 1,
      website: '',
      username: '',
      password: '',
    }))
  }

  onChangeShowPassowrdInput = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  onClickDeleteBtn = id => {
    this.setState(prevState => {
      const {passwordsList} = this.state
      const updatedList = passwordsList.filter(
        eachPassword => eachPassword.id !== id,
      )

      return {
        passwordsList: updatedList,
        count: prevState.count - 1,
      }
    })
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {
      website,
      username,
      password,
      passwordsList,
      count,
      showPassword,
      searchInput,
    } = this.state

    const isAlphabetical = input => {
      const regex = /^[A-Za-z]+$/
      return regex.test(input)
    }
    let filteredList

    if (isAlphabetical(searchInput)) {
      // check if the given search value is string like searching for the password item with website name.
      filteredList = passwordsList.filter(eachPassword =>
        eachPassword.website
          .toLocaleLowerCase()
          .includes(searchInput.toLocaleLowerCase()),
      )
    } else {
      // checking the password item with password in search input.
      filteredList = passwordsList.filter(eachPassword =>
        eachPassword.password.includes(searchInput),
      )
    }

    return (
      <div className="password-manager-container">
        <div className="password-manager-logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="logo"
          />
        </div>
        <div className="add-new-password-container">
          <form className="add-new-password" onSubmit={this.onClickAddBtn}>
            <h1 className="add-new-password-heading">Add New Password</h1>

            <div className="website-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png "
                alt="website"
                className="website-logo"
              />
              <div className="seperator" />
              <input
                type="text"
                placeholder="Enter Website"
                className="input-website"
                onChange={this.onChangeWebsiteInput}
                value={website}
              />
            </div>

            <div className="website-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                alt="username"
                className="website-logo"
              />
              <div className="seperator" />
              <input
                type="text"
                placeholder="Enter Username"
                className="input-website"
                onChange={this.onChangeUsernameInput}
                value={username}
              />
            </div>

            <div className="website-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                alt="password"
                className="website-logo"
              />
              <div className="seperator" />
              <input
                type="password"
                placeholder="Enter Password"
                className="input-website"
                onChange={this.onChangePasswordInput}
                value={password}
              />
            </div>

            <div className="button-container">
              <button className="add-btn" type="submit">
                Add
              </button>
            </div>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png "
            alt="password manager"
            className="password-logo"
          />
        </div>
        <div className="your-password-container">
          <div className="your-passwords-search-container">
            <div className="your-passwords">
              <h1 className="your-passwords-heading">Your Passwords</h1>
              <p className="passwords-count">{count}</p>
            </div>
            <div className="search-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-logo"
              />
              <div className="seperator search-seperator-height" />
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <hr className="horizontal-line" />
          <div className="show-password-container">
            <input
              type="checkbox"
              id="checkbox"
              className="input-checkbox"
              onChange={this.onChangeShowPassowrdInput}
            />
            <label htmlFor="checkbox" className="label-checkbox">
              Show Passwords
            </label>
          </div>
          <div className="all-passwords-container">
            {filteredList.length === 0 ? (
              <div className="password-image-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="no-passwords-image"
                />
                <p className="no-passwords">No Passwords</p>
              </div>
            ) : (
              <ul className="passwords-container">
                {filteredList.map(eachPassword => (
                  <PasswordItem
                    details={eachPassword}
                    key={eachPassword.id}
                    hidePassword={showPassword}
                    onClickDeleteBtn={this.onClickDeleteBtn}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
