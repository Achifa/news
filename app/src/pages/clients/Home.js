import Category from "../../components/clients/Category";
import Header from "../../components/clients/Header";
import Navigation from "../../components/clients/Navigation";
import NewsFeed from "../../components/clients/NewsFeed";

const Home = () => {
    return ( 
        <>
            <Header />
            <Category />
            <NewsFeed />
            <Navigation />
        </>
     );
}
 
export default Home;