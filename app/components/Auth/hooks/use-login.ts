import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/redux/features/auth/hooks";
import {
  useLoginMutation,
  useRetrieveUserQuery,
} from "@/app/redux/features/auth/authApiSlice";
import { setAuth, setUser } from "@/app/redux/features/auth/authSlice";
import { toast } from "react-toastify";

export default function useLogin() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { refetch } = useRetrieveUserQuery();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await login({ email, password }).unwrap();
      dispatch(setAuth());

      // Fetch user data after successful login
      const result = await refetch().unwrap();

      // Update Redux store with user data
      dispatch(setUser({ user: result }));

      toast.success("Logged in");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Failed to log in");
    }
  };

  return {
    email,
    password,
    isLoading,
    onChange,
    onSubmit,
  };
}
