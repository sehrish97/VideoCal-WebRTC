
import { MeetingRoom } from '@mui/icons-material';
import {  BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import SearchBar from './components/SearchBar';
import Home from './screens/Home';
import JoinMeeting from './screens/JoinMeeting';
import MeetingScreen from './screens/MeetingScreen';

function App() {
  return (
    <div className="App">
      {/* <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="SearchBar" element={<SearchBar />} />
      <Route path="JoinMeeting" element={<JoinMeeting />} />
      
      </Routes>
      </BrowserRouter> */}
      <MeetingScreen />
    </div>
  );
}

export default App;
