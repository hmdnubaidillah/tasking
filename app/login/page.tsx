import LoginForm from "@/components/forms/LoginForm";
import FormContainer from "@/components/forms/FormContainer";

export const metadata = {
  title: "Tasking | Login",
};

export default function page() {
  return (
    <FormContainer title="Login">
      <LoginForm />
    </FormContainer>
  );
}
