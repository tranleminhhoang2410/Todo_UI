import './AuthForm.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons'

function AuthFrom({ type, onSubmit }) {
    return (
        <form action="" id={`${type}-form`} onSubmit={onSubmit}>
            <h2 className="title">{type}</h2>
            <div className="input-group">
                <label>Username</label>
                <input type="text" placeholder="Enter your username" />
            </div>
            {type === 'signup' ? (
                <div className="input-group">
                    <label>Email</label>
                    <input type="email" placeholder="Enter your email" />
                </div>
            ) : <></>}
            <div className="input-group">
                <label>Password</label>
                <input type="password" placeholder="Enter your password" />
            </div>
            {type === 'signup' ? (
                <div className="input-group">
                    <label>Confirm Password</label>
                    <input type="password" placeholder="Confirm your password" />
                </div>
            ) : <></>}
            <div id="button" className="input-group">
                <button type="submit" className="submit-btn">{type === 'signup' ? 'Sign up' : 'Log in'}</button>
            </div>
            {type === 'login' ? (
                <div id="alternativeLogin">
                    <label>Or sign in with:</label>
                    <div className="icon-group">
                        <a href="/" className="icon-link"><FontAwesomeIcon id="facebook" icon={faFacebook} /></a>
                        <a href="/" className="icon-link"><FontAwesomeIcon id="twitter" icon={faTwitter} /></a>
                        <a href="/" className="icon-link"><FontAwesomeIcon id="google" icon={faGoogle} /></a>
                    </div>
                </div>
            ) : <></>}
        </form>
    );
}

export default AuthFrom;