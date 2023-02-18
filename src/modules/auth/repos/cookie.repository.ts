import Cookie from "js-cookie";

export const CookieKeys = {
	refreshToken: "AUTH_REFRESH_TOKEN",
} as const;

type Keys = (typeof CookieKeys)[keyof typeof CookieKeys];

export interface CookieRepository {
	save: <Value>(key: Keys, value: Value) => void;
	find: <T extends string>(key: Keys) => T | undefined;
	remove: (key: Keys) => void;
}

export const CookieRepository: CookieRepository = {
	save: <Value>(key: Keys, value: Value): void => {
		const _value: string =
			typeof value !== "string" ? JSON.stringify(value) : value;

		Cookie.set(key, _value, {
			expires: 1,
			path: "/",
			sameSite: "strict",
			secure: true,
		});
	},

	find: <T extends string>(key: Keys): T | undefined => {
		const value = Cookie.get(key);

		return value as T;
	},

	remove: (key) => {
		Cookie.remove(key);
	},
};
