import { useEffect, useState } from "react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

const Timer = ({ initial }: { initial: number }) => {
  const [seconds, setSeconds] = useState(initial);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        clearTimeout(timer);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds]);

  const computeValue = () => (seconds / initial) * 100;

  const computeColor = () => {
    if (seconds <= initial / 4) {
      return "red.400";
    } else if (seconds <= initial / 2) {
      return "orange.400";
    } else {
      return "green.400";
    }
  };

  return (
    <CircularProgress
      size="120px"
      thickness="4px"
      value={computeValue()}
      color={computeColor()}
    >
      <CircularProgressLabel>{`${seconds}s`}</CircularProgressLabel>
    </CircularProgress>
  );
};

export default Timer;
