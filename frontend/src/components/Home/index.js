import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import splashimage from '../../assets/online_events.svg'
import groupsImage from '../../assets/placeimg_320_200_arch.jpg'
import './Home.css'

function HomePage() {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='splash-message'>
      {sessionUser && <h2>Welcome, {sessionUser.firstName} 👋</h2>}
      <div className='content'>
        <div>
          <h1>Celebrating 1 Week of real connections on MeetBees</h1>
          <p>Whatever you're looking to do this year, MeetBees can help. For 1 Week, people have turned to MeetBees to meet people, make friends, find support, grow a business, and explore their interests. Tens of events are happening every day—join the fun.</p>
        </div>
        <img className='splash-image' src={splashimage}></img>
      </div>
      <div className='home-cards-container'>
        <NavLink className='home-cards' exact to='/groups'>
            <img className='card-image' src={groupsImage}></img>
            <h4>Find Groups</h4>
        </NavLink>
        <NavLink className='home-cards' to='/events'>
            <img className='card-image' src={groupsImage}></img>
            <h4>Find Events</h4>
        </NavLink>
      </div>
    </div>
  )
}

export default HomePage;
