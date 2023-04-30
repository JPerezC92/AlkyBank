interface IAuthDetailsProps {
	accessToken: string;
	refreshToken: string;
}

export class AuthDetails {
	accessToken: string;
	refreshToken: string;

	constructor(props: IAuthDetailsProps) {
		this.accessToken = props.accessToken;
		this.refreshToken = props.refreshToken;
	}
}
