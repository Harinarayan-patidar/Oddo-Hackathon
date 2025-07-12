import Template from "../components/core/Auth/Template";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Template
        title="Welcome Back"
        description1="Login to your account to continue exploring our platform."
        description2="If you don't have an account, you can sign up."
        // image={loginImg}
        formType="login"
      />
    </div>
  );
}

export default Login;