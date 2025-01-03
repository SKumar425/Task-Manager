import { useEffect, useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  // signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (result) => {
      if (result) {
        const { displayName, email } = result;
        setUserData({ displayName, email });

        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const SignUpUsingGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, email } = result.user;
        setUserData({ displayName, email });

        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  // const Logout = () => {
  //   signOut(auth)
  //     .then(() => {
  //       // Sign-out successful.
  //       setUserData({});
  //       setIsLoggedIn(false);
  //     })
  //     .catch((error) => {
  //       // An error happened.
  //       console.log({ error });
  //     });
  // };

  console.log(isLoggedIn, userData);

  return (
    <>
      <div className="hidden xl:block">
        <div className="w-full h-[100vh] bg-[#FFF9F9] flex gap-3">
          <div className="w-[40%] flex flex-col justify-center px-[80px] gap-3">
            <div className="flex gap-2 items-center">
              <svg
                width="23"
                height="28"
                viewBox="0 0 23 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.65694 27.4429H16.5685C19.5691 27.4429 22.0242 24.9878 22.0242 21.9871V6.98377C22.0242 4.25589 20.1147 2.07358 17.5232 1.6644C16.9776 0.709639 16.0229 0.164062 14.9317 0.164062H7.29367C6.20251 0.164062 5.24775 0.709639 4.70218 1.6644C2.11069 2.07358 0.201172 4.25589 0.201172 6.98377V21.9871C0.201172 24.9878 2.65627 27.4429 5.65694 27.4429ZM7.02088 3.02834C7.02088 3.02834 7.15727 2.89194 7.29367 2.89194H15.0681L15.2045 3.02834V3.9831C15.2045 4.11949 15.0681 4.25589 14.9317 4.25589H7.29367C7.15727 4.25589 7.02088 4.11949 7.02088 3.9831V3.02834ZM2.92905 6.98377C2.92905 5.89261 3.47463 5.07425 4.29299 4.52867V4.66507C4.29299 4.80146 4.42939 4.93786 4.42939 5.07425C4.42939 5.07425 4.42939 5.21064 4.56578 5.21064C4.56578 5.34704 4.70218 5.48343 4.70218 5.48343L4.83857 5.61983C4.83857 5.75622 4.97497 5.75622 5.11136 5.89261L5.24775 6.02901L5.52054 6.3018L5.65694 6.43819C5.79333 6.43819 5.79333 6.57458 5.92972 6.57458C5.92972 6.57458 6.06612 6.57459 6.06612 6.71098C6.20251 6.71098 6.33891 6.84737 6.4753 6.84737H6.61169C6.88448 6.98377 7.02088 6.98377 7.29367 6.98377H15.7501C15.8865 6.98377 16.0229 6.98377 16.1593 6.84737C16.1593 6.84737 16.2957 6.84737 16.2957 6.71098C16.4321 6.71098 16.4321 6.57458 16.5685 6.57458L16.7049 6.43819C16.8413 6.43819 16.8413 6.3018 16.9776 6.1654L17.114 6.02901L17.3868 5.75622L17.5232 5.61983C17.5232 5.48343 17.6596 5.48343 17.6596 5.34704C17.6596 5.34704 17.6596 5.21064 17.796 5.21064C17.796 5.07425 17.9324 4.93786 17.9324 4.80146V4.66507C18.7508 5.07425 19.2963 6.02901 19.2963 7.12016V22.1235C19.2963 23.6238 18.0688 24.8514 16.5685 24.8514H5.65694C4.1566 24.8514 2.92905 23.6238 2.92905 22.1235V6.98377Z"
                  fill="#7B1984"
                />
              </svg>

              <h1 className="text-[#7B1984] text-[26px] font-bold leading-[36px]">
                TaskBuddy
              </h1>
            </div>

            <div className="text-[12px] text-[#000000] leading-[16px] font-[500]">
              Streamline your workflow and track progress effortlessly with our
              all-in-one task management app.
            </div>
            <button
              onClick={SignUpUsingGoogle}
              className="w-[364px] h-[60px] bg-[#292929] rounded-[18px] text-[21px] font-[700] leading-[30px] text-[#FFFFFF] flex justify-center items-center gap-2 mt-5"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_68_3649)">
                  <path
                    d="M21.2088 10.8997C21.2088 10.0457 21.1395 9.42259 20.9895 8.77637H11.2383V12.6306H16.962C16.8467 13.5885 16.2235 15.031 14.8387 16.0003L14.8193 16.1293L17.9024 18.5178L18.1161 18.5391C20.0778 16.7273 21.2088 14.0616 21.2088 10.8997Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M11.2371 21.0554C14.0412 21.0554 16.3954 20.1322 18.1149 18.5397L14.8375 16.0009C13.9605 16.6125 12.7834 17.0395 11.2371 17.0395C8.49061 17.0395 6.15957 15.2278 5.32862 12.7236L5.20682 12.734L2.00091 15.2151L1.95898 15.3316C3.66687 18.7243 7.17501 21.0554 11.2371 21.0554Z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.32704 12.7228C5.10779 12.0766 4.9809 11.3842 4.9809 10.6687C4.9809 9.95322 5.10779 9.26085 5.31551 8.61462L5.3097 8.47699L2.06362 5.95605L1.95741 6.00657C1.25351 7.41446 0.849609 8.99545 0.849609 10.6687C0.849609 12.342 1.25351 13.9229 1.95741 15.3308L5.32704 12.7228Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M11.2371 4.29906C13.1873 4.29906 14.5028 5.14147 15.2529 5.84545L18.1841 2.98354C16.3839 1.31026 14.0412 0.283203 11.2371 0.283203C7.17501 0.283203 3.66687 2.61424 1.95898 6.00695L5.31708 8.615C6.15957 6.11085 8.49061 4.29906 11.2371 4.29906Z"
                    fill="#EB4335"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_68_3649">
                    <rect
                      width="20.3682"
                      height="20.8434"
                      fill="white"
                      transform="translate(0.849609 0.283203)"
                    />
                  </clipPath>
                </defs>
              </svg>
              Continue with Google
            </button>
          </div>
          <div className="w-[60%] h-full relative">
            <img
              src="/images/circles_bg.png"
              alt="circles_bg"
              className="w-full h-full object-contain"
            />

            <img
              src="/images/taskImage.png"
              alt="taskImage"
              className="absolute top-5 right-0"
            />
          </div>
        </div>
      </div>

      <div className="block xl:hidden">
        <div className="w-full h-[100vh] bg-[#FFF9F9] flex gap-3 relative">
          <div className="w-full flex flex-col justify-center items-center px-[80px] gap-3">
            <div className="flex gap-2 items-center">
              <svg
                width="23"
                height="28"
                viewBox="0 0 23 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.65694 27.4429H16.5685C19.5691 27.4429 22.0242 24.9878 22.0242 21.9871V6.98377C22.0242 4.25589 20.1147 2.07358 17.5232 1.6644C16.9776 0.709639 16.0229 0.164062 14.9317 0.164062H7.29367C6.20251 0.164062 5.24775 0.709639 4.70218 1.6644C2.11069 2.07358 0.201172 4.25589 0.201172 6.98377V21.9871C0.201172 24.9878 2.65627 27.4429 5.65694 27.4429ZM7.02088 3.02834C7.02088 3.02834 7.15727 2.89194 7.29367 2.89194H15.0681L15.2045 3.02834V3.9831C15.2045 4.11949 15.0681 4.25589 14.9317 4.25589H7.29367C7.15727 4.25589 7.02088 4.11949 7.02088 3.9831V3.02834ZM2.92905 6.98377C2.92905 5.89261 3.47463 5.07425 4.29299 4.52867V4.66507C4.29299 4.80146 4.42939 4.93786 4.42939 5.07425C4.42939 5.07425 4.42939 5.21064 4.56578 5.21064C4.56578 5.34704 4.70218 5.48343 4.70218 5.48343L4.83857 5.61983C4.83857 5.75622 4.97497 5.75622 5.11136 5.89261L5.24775 6.02901L5.52054 6.3018L5.65694 6.43819C5.79333 6.43819 5.79333 6.57458 5.92972 6.57458C5.92972 6.57458 6.06612 6.57459 6.06612 6.71098C6.20251 6.71098 6.33891 6.84737 6.4753 6.84737H6.61169C6.88448 6.98377 7.02088 6.98377 7.29367 6.98377H15.7501C15.8865 6.98377 16.0229 6.98377 16.1593 6.84737C16.1593 6.84737 16.2957 6.84737 16.2957 6.71098C16.4321 6.71098 16.4321 6.57458 16.5685 6.57458L16.7049 6.43819C16.8413 6.43819 16.8413 6.3018 16.9776 6.1654L17.114 6.02901L17.3868 5.75622L17.5232 5.61983C17.5232 5.48343 17.6596 5.48343 17.6596 5.34704C17.6596 5.34704 17.6596 5.21064 17.796 5.21064C17.796 5.07425 17.9324 4.93786 17.9324 4.80146V4.66507C18.7508 5.07425 19.2963 6.02901 19.2963 7.12016V22.1235C19.2963 23.6238 18.0688 24.8514 16.5685 24.8514H5.65694C4.1566 24.8514 2.92905 23.6238 2.92905 22.1235V6.98377Z"
                  fill="#7B1984"
                />
              </svg>

              <h1 className="text-[#7B1984] text-[26px] font-bold leading-[36px]">
                TaskBuddy
              </h1>
            </div>

            <div className="text-[12px] text-[#000000] leading-[16px] font-[500] text-center">
              Streamline your workflow and track progress effortlessly with our
              all-in-one task management app.
            </div>
            <button
              onClick={SignUpUsingGoogle}
              className="w-[300px] h-[60px] bg-[#292929] rounded-[16px] text-[21px] font-[700] leading-[30px] text-[#FFFFFF] flex justify-center items-center gap-2 mt-5"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_68_3649)">
                  <path
                    d="M21.2088 10.8997C21.2088 10.0457 21.1395 9.42259 20.9895 8.77637H11.2383V12.6306H16.962C16.8467 13.5885 16.2235 15.031 14.8387 16.0003L14.8193 16.1293L17.9024 18.5178L18.1161 18.5391C20.0778 16.7273 21.2088 14.0616 21.2088 10.8997Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M11.2371 21.0554C14.0412 21.0554 16.3954 20.1322 18.1149 18.5397L14.8375 16.0009C13.9605 16.6125 12.7834 17.0395 11.2371 17.0395C8.49061 17.0395 6.15957 15.2278 5.32862 12.7236L5.20682 12.734L2.00091 15.2151L1.95898 15.3316C3.66687 18.7243 7.17501 21.0554 11.2371 21.0554Z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.32704 12.7228C5.10779 12.0766 4.9809 11.3842 4.9809 10.6687C4.9809 9.95322 5.10779 9.26085 5.31551 8.61462L5.3097 8.47699L2.06362 5.95605L1.95741 6.00657C1.25351 7.41446 0.849609 8.99545 0.849609 10.6687C0.849609 12.342 1.25351 13.9229 1.95741 15.3308L5.32704 12.7228Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M11.2371 4.29906C13.1873 4.29906 14.5028 5.14147 15.2529 5.84545L18.1841 2.98354C16.3839 1.31026 14.0412 0.283203 11.2371 0.283203C7.17501 0.283203 3.66687 2.61424 1.95898 6.00695L5.31708 8.615C6.15957 6.11085 8.49061 4.29906 11.2371 4.29906Z"
                    fill="#EB4335"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_68_3649">
                    <rect
                      width="20.3682"
                      height="20.8434"
                      fill="white"
                      transform="translate(0.849609 0.283203)"
                    />
                  </clipPath>
                </defs>
              </svg>
              Continue with Google
            </button>
          </div>

          <div className="w-[177px] h-[177px] absolute top-[20%] left-0">
            <img
              src="/images/circles_bg.png"
              alt="circles_bg"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="w-[177px] h-[177px] absolute top-0 right-0">
            <img
              src="/images/circles_bg.png"
              alt="circles_bg"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="w-[177px] h-[177px] absolute bottom-[10%] right-[50%]">
            <img
              src="/images/circles_bg.png"
              alt="circles_bg"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
