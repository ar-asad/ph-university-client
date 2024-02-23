import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser } from "../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      userId: "A-0001",
      password: "admin123",
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { data, error }] = useLoginMutation();
  console.log(data);

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");
    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken);
      console.log(res);
      dispatch(
        setUser({
          user: user,
          token: res.data.accessToken,
        })
      );
      toast.success("Logged in", { id: toastId, duration: 2000 });
      navigate("/admin/dashboard");
    } catch (err) {
      toast.error("Something went wrong", {
        id: toastId,
        duration: 2000,
      });
      // console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">ID:</label>
        <input type="text" id="id" {...register("userId")}></input>
      </div>
      <div>
        <label htmlFor="password">ID:</label>
        <input type="text" id="password" {...register("password")}></input>
      </div>
      <Button htmlType="submit">Login</Button>
    </form>
  );
};

export default Login;
