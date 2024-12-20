import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../store/useAuth";
import { BiLoaderAlt } from "react-icons/bi";

interface FieldsInterface {
  email: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fields, setFields] = useState<FieldsInterface>({
    email: "",
    password: "",
  });

  const { login, user } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/tokens", {
        method: "POST",
        body: JSON.stringify({
          email: fields.email,
          password: fields.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      login(data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center h-screen mx-auto relative">
      {isLoading && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-50">
          <BiLoaderAlt className="animate-spin" size={36} />
        </div>
      )}
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-hray-900 md:text-2xl">
            Log in to your account
          </h1>
          <form className="space-y-4 md:space-y-4">
            <Input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <Button className="w-full" type="submit" onClick={handleSubmit}>
              Log in
            </Button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?{" "}
              <Link
                className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
                to="/register"
              >
                Register
              </Link>
            </p>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
