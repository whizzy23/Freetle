import { Link } from 'react-router-dom';
import error from '../assets/error.jpeg';

const NotFound = () => {
  return (
    <div className="container text-center d-flex align-items-center">
      <div className="row justify-content-center align-items-center w-100">
        <div className="col-md-6 mb-4 mb-md-0">
          <h1 className="display-1 pt-3 fw-bold">Oops!</h1>
          <p className="lead fw-semibold">Looks like you've hit a dead end.</p>
          <p className='lead fw-semibold fst-italic '>This page is as lost as Pluto.</p>
          <p className='lead fw-normal'>But hey, don't worry, you can always go back.</p>
          <Link to="/" className="btn btn-secondary border border-1 border-dark">Take me home</Link>
        </div>
        <div className="col-md-6 pt-md-5">
          <img src={error} alt="404" className="img-fluid rounded-circle w-75 p-2" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
