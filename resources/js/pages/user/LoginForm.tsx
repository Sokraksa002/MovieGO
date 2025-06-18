import { FcGoogle } from "react-icons/fc";

const LoginForm = () => {
  const handleGoogleLogin = () => {
    window.location.href = "/auth/google/redirect";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-zinc-800">Sign in with Google</h1>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-black text-white rounded-md hover:bg-blue-700 transition-all duration-200"
        >
          <FcGoogle className="w-5 h-5" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LoginForm;