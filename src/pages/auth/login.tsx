import { Button, Checkbox, Label, TextInput } from "flowbite-react";

const LoginView = () => {
	const handleLogin = () => {};
	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<div className="w-96 bg-white p-10 border-2 border-black-200">
				<h1 className="text-center mb-4">Login</h1>
				<form>
					<TextInput type="text" placeholder="Username" className="mt-4" />
					<TextInput type="password" placeholder="Password" className="mt-4" />
					<Button
						onClick={handleLogin}
						className="mt-4 bg-yellow-400 hover:bg-yellow-300"
					>
						Log In
					</Button>
				</form>
			</div>
		</div>
	);
};

export default LoginView;
