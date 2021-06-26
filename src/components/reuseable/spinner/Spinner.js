import ClipLoader from '@bit/davidhu2000.react-spinners.clip-loader';

const Spinner = () => {

    const spinner = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
    }

    return (
        <div style={spinner}>
            <ClipLoader/>
        </div>

    )
}

export default Spinner;