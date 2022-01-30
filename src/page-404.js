import { Link, useHistory } from 'react-router-dom'

const Page404 = () => {
    const history = useHistory();

    const previousPage = () => {
        history.goBack();
    }

    return (
        <div className='container'>
            <div className='page-404-container'>
                <h1>Page Not Found!</h1>
                <img src='/404.svg' alt='' />
                <div className='buttons-404'>
                    <button id='previous' onClick={previousPage}>Go Back</button>
                    <Link id='homePage' to="/">Home Page</Link>
                </div>
            </div>
        </div>
    )
}

export default Page404;
