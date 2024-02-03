import FormContainer from "@/components/forms/FormContainer";
import RegisterForm from "@/components/forms/RegisterForm";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const metadata = {
  title: "Tasking | Register",
};

export default function Register() {
  return (
    <FormContainer title="Register">
      <RegisterForm />
    </FormContainer>
  );
}
