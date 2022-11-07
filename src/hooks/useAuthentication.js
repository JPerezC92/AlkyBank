import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from 'src/features/auth/authSlice';
import { uiActions } from 'src/features/ui/uiSlice';
import { authQueryKeys } from 'src/models/auth.querykeys';

export const useAuthentication = (authRepository) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);

	const { data: _user, isLoading: isAuthenticating } = useQuery(
		authQueryKeys.validateToken(!!user),
		async ({ signal }) => {
			if (!user) dispatch(uiActions.showSpiner());

			const userInfo = await authRepository(signal).userInfo();
			dispatch(authActions.login({ ...userInfo }));
			return userInfo;
		},
		{
			refetchOnWindowFocus: false,
			retry: false,
			onSuccess: () => {
				dispatch(uiActions.hideSpiner());
			},
			onError: () => {
				dispatch(uiActions.hideSpiner());
				dispatch(authActions.logout({ ...user }));
			},
		},
	);

	return { isAuthenticated: !!_user || !!user, isAuthenticating: isAuthenticating };
};