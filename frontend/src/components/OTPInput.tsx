import * as React from "react";
import { Input as BaseInput } from "@mui/base/Input";
import { Box, styled } from "@mui/system";
import verifyOTP from "@/libs/verifyOTP";
import sendOTP from "@/libs/sendOTP";
import { useRouter } from "next/navigation";
import LoadingLine from "./LoadingLine";

function OTP({
  separator,
  length,
  value,
  onChange,
}: {
  separator: React.ReactNode;
  length: number;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}) {
  const inputRefs = React.useRef<HTMLInputElement[]>(
    new Array(length).fill(null)
  );

  const focusInput = (targetIndex: number) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.focus();
  };

  const selectInput = (targetIndex: number) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.select();
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    currentIndex: number
  ) => {
    switch (event.key) {
      case "ArrowUp":
      case "ArrowDown":
      case " ":
        event.preventDefault();
        break;
      case "ArrowLeft":
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }
        break;
      case "ArrowRight":
        event.preventDefault();
        if (currentIndex < length - 1) {
          focusInput(currentIndex + 1);
          selectInput(currentIndex + 1);
        }
        break;
      case "Delete":
        event.preventDefault();
        onChange((prevOtp) => {
          const otp =
            prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
          return otp;
        });

        break;
      case "Backspace":
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }

        onChange((prevOtp) => {
          const otp =
            prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
          return otp;
        });
        break;

      default:
        break;
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    currentIndex: number
  ) => {
    let currentValue = event.target.value;

    // Filter out non-digit characters
    currentValue = currentValue.replace(/\D/g, "");

    let indexToEnter = 0;

    while (indexToEnter <= currentIndex) {
      if (
        inputRefs.current[indexToEnter].value &&
        indexToEnter < currentIndex
      ) {
        indexToEnter += 1;
      } else {
        break;
      }
    }
    onChange((prev) => {
      const otpArray = prev.split("");
      const lastValue = currentValue[currentValue.length - 1] || "";
      otpArray[indexToEnter] = lastValue;
      return otpArray.join("");
    });
    if (currentValue !== "") {
      if (currentIndex < length - 1) {
        focusInput(currentIndex + 1);
      }
    }
  };

  const handleClick = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>,
    currentIndex: number
  ) => {
    selectInput(currentIndex);
  };

  const handlePaste = (
    event: React.ClipboardEvent<HTMLInputElement>,
    currentIndex: number
  ) => {
    event.preventDefault();
    const clipboardData = event.clipboardData;

    // Check if there is text data in the clipboard
    if (clipboardData.types.includes("text/plain")) {
      let pastedText = clipboardData.getData("text/plain");
      pastedText = pastedText.substring(0, length).trim();
      let indexToEnter = 0;

      while (indexToEnter <= currentIndex) {
        if (
          inputRefs.current[indexToEnter].value &&
          indexToEnter < currentIndex
        ) {
          indexToEnter += 1;
        } else {
          break;
        }
      }

      const otpArray = value.split("");

      for (let i = indexToEnter; i < length; i += 1) {
        const lastValue = pastedText[i - indexToEnter] ?? " ";
        otpArray[i] = lastValue;
      }

      onChange(otpArray.join(""));
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      {new Array(length).fill(null).map((_, index) => (
        <React.Fragment key={index}>
          <BaseInput
            slots={{
              input: InputElement,
            }}
            aria-label={`Digit ${index + 1} of OTP`}
            slotProps={{
              input: {
                ref: (ele) => {
                  inputRefs.current[index] = ele!;
                },
                onKeyDown: (event) => handleKeyDown(event, index),
                onChange: (event) => handleChange(event, index),
                onClick: (event) => handleClick(event, index),
                onPaste: (event) => handlePaste(event, index),
                value: value[index] ?? "",
              },
            }}
          />
          {index === length - 1 ? null : separator}
        </React.Fragment>
      ))}
    </Box>
  );
}

interface Props {
  user_id: string;
  email: string;
  openModal: () => void;
  closeModal: () => void;
  successModal: boolean;
  setSuccessModal: (value: boolean) => void;
}

export default function OTPInput({
  user_id,
  email,
  openModal,
  closeModal,
  successModal,
  setSuccessModal,
}: Props) {
  const [isLoading, setIsLoading] = React.useState(false);

  const [otp, setOtp] = React.useState("");

  if (otp.length == 6) {
    console.log("Confirm OTP!");
  }

  const resendOtp = async () => {
    setIsLoading(true);
    try {
      await sendOTP(email, user_id);
      setIsLoading(false);
    } catch (err) {
      setError("send verify fail!");
      console.log("Err: ", err);
      setIsLoading(false);
    }
  };

  const router = useRouter();

  const [error, setError] = React.useState<string>("");

  const [formIsError, setFormIsError] = React.useState(true);

  const handleSubmitClick = async () => {
    console.log("click submit");
    setIsLoading(true);
    if (otp.length == 6) {
      try {
        const response = await verifyOTP(otp, user_id);
        if (response.verified) {
          console.log("OTP is verified:", response.verified);
          setFormIsError(true);
          closeModal();
          setTimeout(() => {
            setSuccessModal(true);
          }, 500);
          setTimeout(() => {
            setSuccessModal(false);
            router.refresh();
          }, 4000);
          setIsLoading(false);
        } else {
          console.log("OTP verification failed:", response.verified);
          setFormIsError(false);
          setIsLoading(false);
          setOtp("");
        }
      } catch (err) {
        setError("send verify fail!");
        console.log("Err: ", err);
        setFormIsError(false);
        setIsLoading(false);
        setOtp("");
      }
    } else {
      // FILL IN WRONG !
      setFormIsError(false);
      setIsLoading(false);
      setOtp("");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <div className="flex flex-col justify-center items-center">
        <OTP
          separator={<span>-</span>}
          value={otp}
          onChange={setOtp}
          length={6}
        />
      </div>
      <div className="mt-4 ml-6">
        <p>Enter the OTP sent to your email by Mai-Roi-Ra</p>
      </div>
      <div className="mt-2 ml-6 flex">
        <p>Didn't receive a code? </p>
        <button
          className="text-sky-500 ml-2 hover:underline"
          onClick={resendOtp}
        >
          Resend OTP
        </button>
      </div>
      {isLoading && (
        <div className="mx-6 mt-4">
          <LoadingLine></LoadingLine>
        </div>
      )}
      <div className="flex flex-col justify-center items-center space-y-2 mt-4">
        {!formIsError && (
          <div className="mb-2">
            <p className="text-red-500">Code is invalid !</p>
          </div>
        )}

        <button
          className="bg-[#F2D22E] hover:bg-yellow-500 rounded-lg text-white py-2 px-16"
          onClick={handleSubmitClick}
        >
          Verify Code
        </button>
      </div>
    </Box>
  );
}

const blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const InputElement = styled("input")(
  ({ theme }) => `
  width: 40px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 0px;
  border-radius: 8px;
  text-align: center;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
  };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[600] : blue[200]
    };
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);
