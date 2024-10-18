import { useState, useEffect } from "react";
import { ItemsList } from "../../components/ItemsList/ItemsList";
import ItemServices from '../../services/Item.js';
import { Link } from "react-router-dom";
import './Home.css';
import inventory from './inventory.jpg';
import cart from './shopping-cart.png';
import search from './search.png';
import { useAuth0 } from "@auth0/auth0-react";


const Home = ({ items, setItems }) => {
	const [search, setSearch] = useState('');
	const [showAll, setShowAll] = useState(true);

	const [item, setItem] = useState({});
    const { user } = useAuth0();
	console.log("USER NAME" + user.name);

	// console.log("USER NAME" + user.);
	const handleSearch = (e) => {
		e.preventDefault();
		const searchData = search;
		setSearch(searchData);
		// fixes bug i had where hitting enter would sometimes show all instead of filter results
		showAll ? setShowAll(!showAll) : setShowAll(showAll);
	};

	const itemsToShow = showAll
    ? items
    : items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

	const showBtn = () => {
		setShowAll(true);
	};

	async function fetchItems() {
		try {
			const items = await ItemServices.getItems();
			setItems(items)
		}
		catch (error) {
			console.log(error.message)
		}
	}

	useEffect(() => {
		fetchItems();
	}, []);

    return (
    <main>
		<header>
			<a href="#" class="logo">
			<h1>CELC Inc.</h1></a>
		<ul class="navbar">
			<li><a href="#home" class="active">Home</a></li>
			{ user.email === 'emattroberson@gmail.com' && <li><Link to="/login" class= "active">Admin</Link></li> }
			{ user.email === 'emattroberson@gmail.com' && <li><Link to="/cart" class= "active">Cart</Link></li>}
		</ul>

		<div class="icons">
			
			<a href="#">search</a>
			<form onSubmit={handleSearch}>
				<input value={search} onChange={(e) => setSearch(e.target.value)} />
				<div>
				<button type="submit">Search</button>
				</div>
			</form>
			<button onClick={showBtn}>Show All</button>
		
			<a href="#">cart</a>
		</div>
		</header>
		<body>
		<section class="home">
		  <div class="home-text">
        	<h2>All Items:</h2>
		  </div>
		  <div class ="home-img">
			<img src={inventory}/>
		  </div>
		</section>
		<Link to='/newItem' class = "btn">Post New Item</Link>
        <ItemsList items={itemsToShow} />
		</body>
    </main>
    )
};

export default Home;