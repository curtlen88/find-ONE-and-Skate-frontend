import FavoritesList from '../FavoritesList'

export default function Profile(props) {
  // const [message, setMessage] = useState('')

  
  return (
    <div>
      <h1>Your Favorites</h1>
      <FavoritesList currentUser={props.currentUser} />
    </div>
  )
}