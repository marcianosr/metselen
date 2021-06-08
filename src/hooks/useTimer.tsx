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

	const startTimer = () =>
		(timerRef.current = window.setTimeout(() => {
			setTimer(timer - 1);
		}, 1000));

	useEffect(() => {
		if (!timerFinished) {
			startTimer();
		}
		if (timer === 0) {
			stopTimer();
			setTimerFinished(true);
		}

		return () => stopTimer();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [timer, timerFinished]);

	return {
		timer,
		stopTimer,
		timerFinished,
		resetTimer,
	};
};

export default useTimer;
