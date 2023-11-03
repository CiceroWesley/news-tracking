import newsTrackingTitle from '../../assets/newsTrackingTitle.png'

const Navbar = () => {
  return (
    <div className="flex justify-center">
        <img src={newsTrackingTitle} className='h-32' alt="Título do News Tracking" />
    </div>
  )
}

export default Navbar