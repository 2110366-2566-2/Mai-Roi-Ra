import { signIn } from "next-auth/react";
import { FormEvent } from "react";

const isValidEmail = (email: string): boolean => {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email.toLowerCase());
};

const SignInHandleSubmit = async (
  e: FormEvent,
  setUser: Function,
  setPassword: Function,
  setError: Function,
  setErrorUser: Function,
  setErrorPassword: Function,
  user: string,
  password: string,
  error: boolean,
  router: any,
  setIsLoading: Function
) => {
  // Set Default
  e.preventDefault();
  setError(false);
  setErrorUser(0);
  setErrorPassword(0);

  // Check User That Gmail Or Phone Number Format?
  if (!(isValidEmail(user) || (user.length === 10 && user[0] === "0"))) {
    setErrorUser(2);
    setError(true);
    setPassword("");
    setIsLoading(false);
    console.log("Error: Not a phone number or email address format");
    return;
  }

  // Check User Input
  if (user === "") {
    setErrorUser(1);
    setError(true);
    setPassword("");
    setIsLoading(false);
    console.log("Error: Please fill in your phone number or email address");
    return;
  }

  // Check Password Input
  if (password === "") {
    setErrorPassword(1);
    setError(true);
    setPassword("");
    setIsLoading(false);
    console.log("Error: Please fill in your password");
    return;
  }

  if (password.length < 6) {
    setErrorPassword(2);
    setError(true);
    setPassword("");
    setIsLoading(false);
    console.log("Error: Password too short");
    return;
  }

  // Check Error
  if (error) {
    setIsLoading(false);
    return;
  }

  try {
    const res = await signIn("credentials", {
      email: user,
      password,
      redirect: false,
    });
    if (res?.error) {
      setErrorPassword(2);
      setError(true);
      setPassword("");
      setError(res?.error);
      setIsLoading(false);
      return;
    }
    router.replace("/homepage");
    // I don't know how to fix this one but this works
    // setTimeout(() => {
    //   window.location.reload();
    // }, 1000);
  } catch (error) {
    setIsLoading(false);
    setError("Sign in failed. Account isn't existed.");
  }
  // }
};

export default SignInHandleSubmit;
