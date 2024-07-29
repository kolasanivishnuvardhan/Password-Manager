import './PasswordItem.css'

const PasswordItem = props => {
  const {details, hidePassword, onClickDeleteBtn} = props
  const {id, website, username, password} = details
  const onDeletePassword = () => {
    onClickDeleteBtn(id)
  }
  return (
    <li className="password-item-container">
      <p className="website-name-logo">{website[0].toUpperCase()}</p>
      <div className="password-details-container">
        <p className="website-name">{website}</p>
        <p className="username">{username}</p>
        {hidePassword ? (
          <p className="password">{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="stars-img"
          />
        )}
      </div>
      <button
        className="delete-btn"
        data-testid="delete"
        onClick={onDeletePassword}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-img"
        />
      </button>
    </li>
  )
}

export default PasswordItem
