import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import splashimage from '../../assets/online_events.svg'

function HomePage() {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div>
        {sessionUser && <h2>Hi {sessionUser.firstName}!</h2>}
      <div>
        <h1>Celebrating 20 years of real connections on Meetup</h1>
        <p>Whatever you're looking to do this year, Meetup can help. For 20 years, people have turned to Meetup to meet people, make friends, find support, grow a business, and explore their interests. Thousands of events are happening every day—join the fun.</p>
        <img src={splashimage}></img>
      </div>
      <NavLink exact to='/groups'>
        <div>Groups</div>
      </NavLink>
      <NavLink to='/events'>
        <div>Events</div>
      </NavLink>
    </div>
  )
}

export default HomePage;
