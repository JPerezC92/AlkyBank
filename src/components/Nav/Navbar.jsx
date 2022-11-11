import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from 'src/assets/alkemy_logo.svg';
import avatar from 'src/assets/avatar.svg';
import { ButtonLogout } from 'src/components/ButtonLogout';
import { Heading } from 'src/components/Heading';
import { MobileMenu } from 'src/components/Nav/MobileMenu';
import { Text } from 'src/components/Text';
import { webRoutes } from 'src/utils/web.routes';
import { useSelector } from 'react-redux';
import { Spinner } from '../Spinner';

const Navbar = ({ isVisible, setIsVisible }) => {
	const [isLogged, setIsLogged] = useState(true);
	const [showMenu, setShowMenu] = useState(false);
	const { user } = useSelector((state) => state.auth);

	const handlerShowMenu = () => setShowMenu(!showMenu);
	const handlerLogin = () => {
		setIsLogged(!isLogged);
	};

	return (
		<div className="bg-ct-primary-700">
			<header className="mx-auto flex w-full max-w-screen-xl items-center justify-between p-4 xl:px-0">
				<Link to="/">
					<img src={logo} alt="logo" tabIndex="0" />
				</Link>
				<nav>
					{user && (
						<>
							<ul className="hidden lg:flex ">
								{[
									{ name: 'Carga de saldo', route: webRoutes.deposit },
									{ name: 'Gastos', route: webRoutes.bills },
									{ name: 'Balance', route: webRoutes.balance },
									{ name: 'Movimientos', route: webRoutes.transactions },
									{ name: 'Envio de dinero', route: webRoutes.transfer },
								].map((link) => (
									<li key={link.name} className="flex items-center justify-center">
										<Link
											to={link.route}
											className="mx-4 cursor-pointer px-2 py-1 font-medium text-ct-neutral-dark-100 outline-ct-special1-500 transition-all duration-200 ease-in-out hover:text-ct-special3-200"
										>
											{link.name}
										</Link>
									</li>
								))}

								<li className="ml-8 flex justify-center">
									<img src={avatar} alt="avatar" className="w-10 cursor-pointer" onClick={() => setIsVisible(true)} />
									{isVisible && (
										<div
											data-close={true}
											className="absolute right-0 top-[72px] w-auto flex-col items-center rounded-bl-lg bg-ct-secondary-600 p-4 shadow-xl"
										>
											<Text as="p" className="mb-3 text-center font-bold" data-close={true}>
												{user ? `${user.first_name}  ${user.last_name}` : <Spinner />}
											</Text>
											<ButtonLogout variant="mini" handlerLogin={handlerLogin} close={true} />
										</div>
									)}
								</li>
							</ul>
							<div className="flex items-center gap-4 lg:hidden" onClick={handlerShowMenu}>
								<img src={avatar} alt="menu" className="w-10" />

								<Heading as="h3" size="headline4" className="text-ct-secondary-200 ">
									{user ? `${user.first_name}  ${user.last_name}` : <Spinner />}
								</Heading>
							</div>
							{<MobileMenu showMenu={showMenu} setShowMenu={setShowMenu} handlerLogin={handlerLogin} />}
						</>
					)}
				</nav>
			</header>
		</div>
	);
};

export { Navbar };

