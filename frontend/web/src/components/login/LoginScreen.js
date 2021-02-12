import "./LoginScreen.scss"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

function LoginScreen(props) {
    let match = useRouteMatch();

    return (
        <div className="row entry-screen">
            <div className="col-lg-6">
                <h1>Welcome to ExamPortal</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="button" className="btn btn-link">Forgot your password?</button>
                    <button type="button" className="btn btn-primary w-100">Log In</button>
                    <a className="form-text">Don’t have an account?</a>
                    <button type="button" className="btn btn-outline-primary w-100">Sign Up</button>
                    <Link to={`/signup`}>Sign Up</Link>
                </form>
            </div>
        </div>
    );
}

export default LoginScreen;
