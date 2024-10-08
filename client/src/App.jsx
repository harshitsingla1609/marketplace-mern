import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import PrivtaeRoute from './components/PrivtaeRoute';
import About from './pages/About';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import CreateListing from './pages/CreateListing';
import Listing from './pages/Listing';
import Search from './pages/Search'

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/sign-in" element={<SignIn />} />
				<Route path="/sign-up" element={<SignUp />} />
				<Route path="/about" element={<About />} />
				<Route path='/listing/:listingId' element={<Listing />} />
				<Route path='/search' element={<Search />} />

				<Route element={<PrivtaeRoute />}>
					<Route path="/profile" element={<Profile />} />
					<Route path='/create-listing' element={<CreateListing />} />
					<Route
            path='/update-listing/:listingId'
            element={<CreateListing />}
          />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
