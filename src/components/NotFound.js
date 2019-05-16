import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from '../images/notFound.jpeg';

const NotFound = () => (
	<div>
		<img
			src={PageNotFound}
			alt="Page Not Found"
			style={{
				width: 400,
				height: 400,
				display: 'block',
				margin: 'auto',
				position: 'relative',
			}}
		/>

		<center>
			<Link to="/">Return to Login Page</Link>
		</center>
	</div>
);

export default NotFound;
