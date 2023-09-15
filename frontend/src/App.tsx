import Layout from "./components/Layout";
import Feed from './components/Feed';
import { Route, Routes } from "react-router-dom";
import UserTweets from "./components/UserTweets";
import Explore from "./components/Explore";
import CreateTweet from "./components/CreateTweet";
import Login from "./components/Login";
import Signup from "./components/Signup";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import Following from "./components/Following";
import EditTweet from "./components/EditTweet";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout> <Feed /> </Layout>} />
        <Route path="/user-tweets" element={<Layout> <UserTweets /> </Layout>} />
        <Route path="/explore" element={<Layout> <Explore /> </Layout>} />
        <Route path="/following" element={<Layout> <Following /> </Layout>} />
        <Route path="/create-tweet" element={<Layout> <CreateTweet /> </Layout>} />
        <Route path="/edit-tweet/:tweetId" element={<Layout> <EditTweet /> </Layout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
