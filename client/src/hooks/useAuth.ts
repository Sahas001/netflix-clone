import axios from "axios";
import { useDispatch } from "react-redux";
import Cookie from "universal-cookie";
import { clearUser, setUser } from "../features/userSlice";

const cookie = new Cookie();

export default function useAuth() {
  const dispatch = useDispatch();
  const login = async (
    { email, password }: { email: string; password: string },
  ) => {
    const response = await axios.post("http://localhost:8080/auth/login", {
      email,
      password,
    });
    const { user, token } = response.data;
    cookie.set("session-token", token);
    dispatch(
      setUser({
        email: user.email,
        username: user.username,
      }),
    );
    return response.data;
  };
  const signup = async (
    { email, password, username }: {
      email: string;
      password: string;
      username: string;
    },
  ) => {
    const response = await axios.post("http://localhost:8080/auth/signup", {
      email,
      password,
      username,
    });
    const { user, token } = response.data;
    cookie.set("session-token", token);
    dispatch(
      setUser({
        email: user.email,
        username: user.username,
      }),
    );
    return response.data;
  };

  const fetchUser = async () => {
    const sessionToken = cookie.get("session_token");
    try {
      const response = await axios.get("http://localhost:8080/auth/me", {
        headers: {
          ...sessionToken ? { Authorization: `Bearer ${sessionToken}` } : null,
        },
      });
      const user = response.data;
      if (!user) {
        return dispatch(clearUser());
      }
      dispatch(
        setUser({
          email: user.email,
          username: user.username,
        }),
      );
    } catch (error) {
      return dispatch(clearUser());
    }
  };

  return { signup, login, fetchUser };
}
