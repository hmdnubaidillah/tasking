import LoginForm from "@/components/forms/LoginForm";
import FormContainer from "@/components/forms/FormContainer";

export const metadata = {
  title: "Tasking | Login",
};

export default function Login() {
  return (
    <FormContainer title="Login">
      <LoginForm />
    </FormContainer>
  );
}
