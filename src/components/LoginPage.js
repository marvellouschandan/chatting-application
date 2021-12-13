import HeaderLayout from "./HeaderLayout";
import { authenticate, authFailure, authSuccess } from '../redux/authActions';
import { connect } from 'react-redux';
import {useState} from 'react';
import {fetchUserData} from '../api/authenticationService';

const LoginPage = ({error, ...props}) => {
	const [values, setValues] = useState({
		username: '',
		password: ''
	});

	const changeHandler = (e) => {
		e.persist();

		setValues(prevValues => ({
		  ...prevValues,
		  [e.target.name]: e.target.value
		}));
	};

	const submitHandler = (e) => {
		e.preventDefault();

		fetchUserData(values).then((response) =>{
			console.log("response",response);
            if(response.status===200){
                props.setUser(response.data);
                props.history.push('/home');
            }
            else{
               props.loginFailure('Something Wrong!Please Try Again'); 
            }
		}).catch((err) =>{
			console.log(err)
		});
	}

    return (
		<HeaderLayout>
			<div className="container">
				<form className="form-signin" method="post" onSubmit={submitHandler}>
					<h2 className="form-signin-heading">Please sign in</h2>
					<p>
						<label for="username" className="sr-only">Username</label> <input
							type="text" id="username" name="username" class="form-control"
							placeholder="Username" required="" autofocus="" onChange={changeHandler}/>
					</p>
					<p>
						<label for="password" className="sr-only">Password</label> <input
							type="password" id="password" name="password" class="form-control"
							placeholder="Password" required="" onChange={changeHandler}/>
					</p>
					<button className="btn btn-lg btn-primary btn-block" type="submit">Sign
						in</button>
				</form>
			<center><p>New to App? <a href="/signup">Sign up</a></p></center>
		</div>
	</HeaderLayout>
    );
}

const mapStateToProps=({auth})=>{
    console.log("state ",auth)
    return {
        error:auth.error
}}


const mapDispatchToProps=(dispatch)=>{

    return {
        authenticate :()=> dispatch(authenticate()),
        setUser:(data)=> dispatch(authSuccess(data)),
        loginFailure:(message)=>dispatch(authFailure(message))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);