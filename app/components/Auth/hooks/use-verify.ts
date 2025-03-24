import { useEffect } from 'react';
import { useAppDispatch } from '@/app/redux/features/auth/hooks';
import { setAuth, finishInitialLoad } from '@/app/redux/features/auth/authSlice';
import { useVerifyMutation } from '@/app/redux/features/auth/authApiSlice';

export default function useVerify() {
	const dispatch = useAppDispatch();

	const [verify] = useVerifyMutation();

	useEffect(() => {
		verify(undefined)
			.unwrap()
			.then(() => {
				dispatch(setAuth());
			})
			.finally(() => {
				dispatch(finishInitialLoad());
			});
	}, []);
}
