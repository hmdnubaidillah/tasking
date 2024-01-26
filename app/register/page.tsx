import FormContainer from "@/components/forms/FormContainer";
import RegisterForm from "@/components/forms/RegisterForm";

export const metadata = {
  title: "Tasking | Register",
};

export default function page() {
  return (
    <FormContainer title="Register">
      <RegisterForm />
    </FormContainer>
  );
}
