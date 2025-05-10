import React, { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";

const SignupPage = () => {
  const [signupData, setSignupData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  // const queryClient = useQueryClient();
  // const {
  //   mutate: signupMutation,
  //   isPending,
  //   error,
  // } = useMutation({
  //   mutationFn: signup,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  // });
  const {signupMutation, isPending,error,}=useSignup()
  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };
  console.log("error", error);
  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-8 md:p-8"
      data-theme="forest"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* SIGNUP FROM - LEFT SIDE */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* logo */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <ShipWheelIcon className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Streamify
            </span>
          </div>
          {/* error message if any */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>
            </div>
          )}
          {/* error message if any */}
          <div className="w-full">
            <form onSubmit={handleSignup}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Create an Account</h2>
                  <p className="text-sm opacity-70">
                    Join Streamify and start your language learning adventure !
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="form-control w-full ">
                    <label className="label">
                      <span className="label-text pb-2">Full Name</span>
                    </label>

                    <input
                      type="text"
                      placeholder="John Doe"
                      className="input input-bordered w-full "
                      value={signupData.fullname}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          fullname: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-control w-full ">
                    <label className="label">
                      <span className="label-text pb-2">Email</span>
                    </label>

                    <input
                      type="text"
                      placeholder="JohnDoe@gmail.com"
                      className="input input-bordered w-full "
                      value={signupData.email}
                      onChange={(e) =>
                        setSignupData({ ...signupData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-control w-full ">
                    <label className="label">
                      <span className="label-text pb-2">Password</span>
                    </label>

                    <input
                      type="password"
                      placeholder="John Doe"
                      className="input input-bordered w-full "
                      value={signupData.password}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          password: e.target.value,
                        })
                      }
                      required
                    />
                    <p className="text-xs opacity-70 mt-1">
                      Password must be at least 6 characters long
                    </p>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input
                        type="checkbox"
                        className="checkbox checked-sm"
                        required
                      />
                      <span className="text-xs leading-tight">
                        I agree to the
                        <span className="text-primary hover:underline">
                          {" "}
                          terms of service
                        </span>{" "}
                        and
                        <span className="text-primary hover:underline">
                          {" "}
                          Privacy policy
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
                <button className="btn btn-primary w-full" type="submit">
                  {isPending ? (<><span className="loading loading-spinner loading-xs"></span>Loading...</>) : "Create Account"}
                </button>
                <div className="text-center mt-4">
                  <p className="text-sm">
                    Already have an account ?
                    <Link to="/login" className="text-primary hover:underline">
                      {" "}
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* singup from right side */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                src="/i.png"
                alt="language connection illustaration"
                className="w-full h-full"
              />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">
                Connect with language partners worldwide
              </h2>
              <p className="opacity-70">
                Practice conversations, make friends and improve Your language
                Skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
