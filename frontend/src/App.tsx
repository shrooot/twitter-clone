import Layout from "./components/Layout";
import Feed from './components/Feed';
import { Route, Routes } from "react-router-dom";
import UserTweets from "./components/UserTweets";
import Explore from "./components/Explore";
import CreateTweet from "./components/CreateTweet";
import Login from "./components/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout> <Feed /> </Layout>} />
        <Route path="/user-tweets" element={<Layout> <UserTweets /> </Layout>} />
        <Route path="/explore" element={<Layout> <Explore /> </Layout>} />
        <Route path="/create-tweet" element={<Layout> <CreateTweet /> </Layout>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
