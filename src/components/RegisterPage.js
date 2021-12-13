import HeaderLayout from "./HeaderLayout";

const RegisterPage = () => {
    return (
		<HeaderLayout>
			<div className="container">
				<form className="form-signin" method="post" action="/api/users">
					<h2 className="form-signin-heading">Sign-up Form</h2>
					<p>
						<label for="name" className="sr-only">Full name</label> <input
							type="text" id="name" name="name" class="form-control"
							placeholder="Full name" required="" autofocus="" />
					</p>
					<p>
						<label for="username" className="sr-only">Username</label> <input
							type="text" id="username" name="username" class="form-control"
							placeholder="Username" required="" autofocus="" />
					</p>
					<p>
						<label for="password" className="sr-only">Password</label> <input
							type="password" id="password" name="password" class="form-control"
							placeholder="Password" required="" />
					</p>
					<button className="btn btn-lg btn-primary btn-block" type="submit">Sign
						up</button>
				</form>
			<center><p>Already registered? <a href="/">Log In</a></p></center>
		</div>
	</HeaderLayout>
    );
}

export default RegisterPage;