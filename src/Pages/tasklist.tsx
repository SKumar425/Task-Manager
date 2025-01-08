/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn, setUserData } from "../store/authSlice";
import ToDOTask from "../components/todo";
import InProgressTask from "../components/inprogress";
import CompletedTask from "../components/completed";
import TodoBoard from "../components/todoBoard";
import InProgressBoard from "../components/inprogressBoard";
import CompleteBoardfrom from "../components/completeBoard";

const tasklist: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  //@ts-ignore
  const userData = useSelector((state) => state.auth.userData);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(setIsLoggedIn(false));
        dispatch(setUserData({}));
        navigate("/");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  const tabOptions = [
    {
      title: "List",
    },
    {
      title: "Board",
    },
  ];

  return (
    <>
      <div className="w-full bg-[#FFF9F9] py-[61px] px-5 md:px-[32px] flex flex-col gap-5">
        <div className="w-full flex flex-col-reverse gap-3 md:flex-row justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <svg
                width="29"
                height="29"
                viewBox="0 0 29 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.66536 26.5837H19.332C21.9904 26.5837 24.1654 24.4087 24.1654 21.7503V8.45866C24.1654 6.04199 22.4737 4.10866 20.1779 3.74616C19.6945 2.90033 18.8487 2.41699 17.882 2.41699H11.1154C10.1487 2.41699 9.30287 2.90033 8.81953 3.74616C6.5237 4.10866 4.83203 6.04199 4.83203 8.45866V21.7503C4.83203 24.4087 7.00703 26.5837 9.66536 26.5837ZM10.8737 4.95449C10.8737 4.95449 10.9945 4.83366 11.1154 4.83366H18.0029L18.1237 4.95449V5.80033C18.1237 5.92116 18.0029 6.04199 17.882 6.04199H11.1154C10.9945 6.04199 10.8737 5.92116 10.8737 5.80033V4.95449ZM7.2487 8.45866C7.2487 7.49199 7.73203 6.76699 8.45703 6.28366V6.40449C8.45703 6.52533 8.57786 6.64616 8.57786 6.76699C8.57786 6.76699 8.57786 6.88783 8.6987 6.88783C8.6987 7.00866 8.81953 7.12949 8.81953 7.12949L8.94036 7.25033C8.94036 7.37116 9.0612 7.37116 9.18203 7.49199L9.30286 7.61283L9.54453 7.85449L9.66536 7.97533C9.7862 7.97533 9.7862 8.09616 9.90703 8.09616C9.90703 8.09616 10.0279 8.09616 10.0279 8.21699C10.1487 8.21699 10.2695 8.33783 10.3904 8.33783H10.5112C10.7529 8.45866 10.8737 8.45866 11.1154 8.45866H18.607C18.7279 8.45866 18.8487 8.45866 18.9695 8.33783C18.9695 8.33783 19.0904 8.33783 19.0904 8.21699C19.2112 8.21699 19.2112 8.09616 19.332 8.09616L19.4529 7.97533C19.5737 7.97533 19.5737 7.85449 19.6945 7.73366L19.8154 7.61283L20.057 7.37116L20.1779 7.25033C20.1779 7.12949 20.2987 7.12949 20.2987 7.00866C20.2987 7.00866 20.2987 6.88783 20.4195 6.88783C20.4195 6.76699 20.5404 6.64616 20.5404 6.52533V6.40449C21.2654 6.76699 21.7487 7.61282 21.7487 8.57949V21.8712C21.7487 23.2003 20.6612 24.2878 19.332 24.2878H9.66536C8.3362 24.2878 7.2487 23.2003 7.2487 21.8712V8.45866Z"
                  fill="#2F2F2F"
                />
                <path
                  d="M10.8763 19.333H13.293C14.018 19.333 14.5013 18.8497 14.5013 18.1247C14.5013 17.3997 14.018 16.9163 13.293 16.9163H10.8763C10.1513 16.9163 9.66797 17.3997 9.66797 18.1247C9.66797 18.8497 10.1513 19.333 10.8763 19.333ZM10.8763 14.4997H18.1263C18.8513 14.4997 19.3346 14.0163 19.3346 13.2913C19.3346 12.5663 18.8513 12.083 18.1263 12.083H10.8763C10.1513 12.083 9.66797 12.5663 9.66797 13.2913C9.66797 14.0163 10.1513 14.4997 10.8763 14.4997Z"
                  fill="#2F2F2F"
                />
              </svg>

              <h1 className="text-[24px] font-[600] leading-[33px] text-[#2F2F2F]">
                TaskBuddy
              </h1>
            </div>
            <div className="flex gap-5">
              {tabOptions?.map((item, index) => (
                <div
                  key={index}
                  className={`w-max text-lg font-[600] cursor-pointer  ${
                    tabIndex === index
                      ? "text-[#000000] border-b-2 border-black"
                      : " text-[#231F20D1]"
                  }`}
                  onClick={() => setTabIndex(index)}
                >
                  <div>{item.title}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <div className="w-[36px] h-[36px] rounded-full">
                <img
                  src={userData?.photo}
                  alt="photo"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div className="text-[16px] font-[700] leading-[22px] text-[#00000099]">
                {userData?.name || "User"}
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-[108px] h-[40px] bg-[#7B198426] rounded-[10px] text-[#000000] font-[600] text-xs leading-[16px] flex gap-2 justify-center items-center"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.40055 8.20313H10.5467C10.935 8.20313 11.2498 7.88832 11.2498 7.50001C11.2498 7.1117 10.935 6.79689 10.5467 6.79689H2.40055L3.30964 5.8878C3.58423 5.61321 3.58423 5.16804 3.30964 4.89344C3.03509 4.61885 2.58987 4.61885 2.31528 4.89344L0.206014 7.00276C0.189561 7.01921 0.173999 7.03646 0.15928 7.05446C0.152858 7.06229 0.14728 7.07059 0.141233 7.0786C0.133499 7.08891 0.12553 7.09899 0.118359 7.10973C0.111796 7.11952 0.106124 7.1297 0.100124 7.13973C0.0943588 7.14938 0.0883119 7.15881 0.0830151 7.16874C0.0774839 7.17906 0.0728433 7.18965 0.0678746 7.20015C0.0629996 7.21041 0.0578903 7.22054 0.0535309 7.23104C0.0493122 7.2413 0.0458435 7.25176 0.0421404 7.26216C0.0380623 7.27341 0.0337498 7.28452 0.0302811 7.29601C0.0271405 7.30641 0.0248436 7.31696 0.0222186 7.32751C0.0192655 7.33918 0.0159843 7.3508 0.0136405 7.36271C0.0112499 7.37485 0.00979681 7.38713 0.00806245 7.39937C0.00656246 7.40982 0.00454685 7.42013 0.0035156 7.43072C0.00126562 7.45341 9.37494e-05 7.47624 4.68747e-05 7.49902C4.68747e-05 7.49935 0 7.49972 0 7.50005C0 7.50038 4.68747e-05 7.50076 4.68747e-05 7.50108C9.37494e-05 7.52391 0.00126562 7.54669 0.0035156 7.56943C0.00454685 7.57988 0.00651558 7.59005 0.0079687 7.60041C0.00974994 7.61279 0.0112031 7.62516 0.0136405 7.63744C0.0159843 7.64926 0.0192186 7.66069 0.0221717 7.67227C0.0248436 7.68291 0.0271873 7.69365 0.0303748 7.70419C0.0337967 7.71549 0.0380623 7.72641 0.0419997 7.73747C0.0457966 7.74807 0.0492653 7.75871 0.0535778 7.76911C0.0578434 7.77943 0.062859 7.78932 0.0676402 7.79939C0.0727027 7.81013 0.0774839 7.82096 0.0831088 7.8315C0.0882651 7.84111 0.0941244 7.85025 0.0997025 7.85958C0.105843 7.86994 0.111702 7.88039 0.118452 7.89047C0.125296 7.90074 0.132937 7.91035 0.140296 7.92024C0.146671 7.92872 0.152577 7.93749 0.159374 7.94574C0.17339 7.9628 0.188249 7.97916 0.203764 7.99486C0.204514 7.99561 0.205124 7.99646 0.205874 7.99721L2.31524 10.1066C2.45258 10.2439 2.63248 10.3126 2.81244 10.3126C2.99234 10.3125 3.17234 10.2439 3.30959 10.1067C3.58418 9.83207 3.58418 9.3869 3.30964 9.11231L2.40055 8.20313Z"
                  fill="black"
                />
                <path
                  d="M14.2968 1.17188H5.39062C5.00231 1.17188 4.6875 1.48669 4.6875 1.875V4.68748C4.6875 5.07579 5.00231 5.3906 5.39062 5.3906C5.77893 5.3906 6.09374 5.07579 6.09374 4.68748V2.57812H13.5937V12.4219H6.09374V10.3124C6.09374 9.92413 5.77893 9.60932 5.39062 9.60932C5.00231 9.60932 4.6875 9.92413 4.6875 10.3124V13.125C4.6875 13.5133 5.00231 13.8281 5.39062 13.8281H14.2968C14.6851 13.8281 14.9999 13.5133 14.9999 13.125V1.875C14.9999 1.48669 14.6851 1.17188 14.2968 1.17188Z"
                  fill="black"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>

        <div className="w-full flex items-center border-2 border-gray-300 rounded-full">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2" // Added left margin to create space between the icon and the input
          >
            <g opacity="0.6">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.75 8.25C3.75 5.76825 5.76825 3.75 8.25 3.75C10.7318 3.75 12.75 5.76825 12.75 8.25C12.75 10.7318 10.7318 12.75 8.25 12.75C5.76825 12.75 3.75 10.7318 3.75 8.25ZM15.5303 14.4697L12.984 11.9228C13.7738 10.9073 14.25 9.6345 14.25 8.25C14.25 4.94175 11.5582 2.25 8.25 2.25C4.94175 2.25 2.25 4.94175 2.25 8.25C2.25 11.5582 4.94175 14.25 8.25 14.25C9.6345 14.25 10.9073 13.7738 11.9228 12.984L14.4697 15.5303C14.616 15.6765 14.808 15.75 15 15.75C15.192 15.75 15.384 15.6765 15.5303 15.5303C15.8235 15.237 15.8235 14.763 15.5303 14.4697Z"
                fill="black"
              />
            </g>
          </svg>

          <input
            type="text"
            className="w-full p-2 rounded-full bg-transparent" // Adjust padding to make space for the icon
            placeholder="Search by task name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {tabIndex == 0 && (
          <div className=" w-full flex flex-col gap-5">
            <ToDOTask searchTerm={searchTerm} />
            <InProgressTask searchTerm={searchTerm} />
            <CompletedTask searchTerm={searchTerm} />
          </div>
        )}

        {tabIndex == 1 && (
          <div className="w-full flex flex-wrap gap-5">
            <TodoBoard searchTerm={searchTerm} />
            <InProgressBoard searchTerm={searchTerm} />
            <CompleteBoardfrom searchTerm={searchTerm} />
          </div>
        )}
      </div>
    </>
  );
};

export default tasklist;
