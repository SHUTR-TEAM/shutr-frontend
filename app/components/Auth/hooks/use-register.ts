import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@/app/redux/features/auth/authApiSlice";
// import { toast } from "react-toastify";

export default function useRegister() {
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
    phone_num: "",
    nic: "",
    role: "user",
  });

  const {
    first_name,
    last_name,
    email,
    password,
    re_password,
    phone_num,
    nic,
    role,
  } = formData;

  const setRole = (role: string) => {
    setFormData({ ...formData, role });
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    register({
      first_name,
      last_name,
      email,
      password,
      re_password,
      phone_num,
      nic,
      role,
    })
      .unwrap()
      .then(() => {
        // toast.success("Please check email to verify account");
        router.push("/auth/login");
      })
      .catch(() => {
        console.log("Failed to register account");
        // toast.error("Failed to register account");
      });
  };

  return {
    first_name,
    last_name,
    email,
    password,
    re_password,
    phone_num,
    nic,
    role,
    isLoading,
    onChange,
    onSubmit,
    setRole,
  };
}
