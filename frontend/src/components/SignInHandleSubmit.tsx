import { FormEvent } from "react";

const SignInHandleSubmit = async (e: FormEvent, setUser: Function, setPassword: Function, 
setError: Function, setErrorUser: Function, setErrorPassword: Function, user: string, password: string, router: any) => {
  // Set Default
    e.preventDefault();
    setError(false);
    setErrorUser(0);
    setErrorPassword(0);

  // Check User Input
  if (user === "") {
    setErrorUser(1);
    setError(true);
    setPassword("");
    console.log("Error: Please fill in your phone number or email address");
  } 
  // Check Password Input
  else if (password === "") {
    setErrorPassword(1);
    setError(true);
    setPassword("");
    console.log("Error: Please fill in your password");
  } 
  // Check User That Gmail Or Phone Number Format?
  else if (user.length < 10 || user.slice(-10) !== "@gmail.com" || (user.length === 10 && user[0] === '0' && !isNaN(Number(user)))) {
    setErrorUser(2);
    setError(true);
    setPassword("");
    console.log("Error: Not a phone number or email address format");
  } 
  else {
    // Your authentication logic here
    // For example, you can use the signIn function from next-auth/react
    // and handle the redirect or error accordingly

    // try {
    //   const res = await signIn("credentials", {
    //     user,
    //     password,
    //     redirect: false
    //   });
    //   if (res?.error) {
    //     setError(res?.error);
    //     return;
    //   }
    //   router.replace('/');
    //   // I don't know how to fix this one but this works
    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 1000);
    // } catch (error) {
    //   setError("Sign in failed. Account isn't existed.");
    // }
  }
};

export default SignInHandleSubmit;