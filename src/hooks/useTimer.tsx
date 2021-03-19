import { useRef, useEffect, useState } from "react";

const useTimer = (amount: number) => {
	const timerRef = useRef<number | null>(null);
	const [timer, setTimer] = useState(amount);
	const [timerFinished, setTimerFinished] = useState(false);

	const resetTimer = () => {
		setTimer(amount);
		setTimerFinished(false);
	};

	const stopTimer = () => window.clearTimeout(timerRef.current || 0);

	useEffect(() => {
		timerRef.current = window.setTimeout(() => {
			setTimer(timer - 1);
		}, 1000);

		if (timer === 0) {
			stopTimer();
			setTimerFinished(true);
		}

		return () => stopTimer();
	}, [timer]);

	return {
		timer,
		stopTimer,
		timerFinished,
		resetTimer,
	};
};

export default useTimer;
