import { BarLoader, PuffLoader } from "react-spinners"

function Loading(){
    return (
        <div style={{height: '100vh', width: '100vw', position: 'relative'}}>
            <div className='loaderContainer'>
                <PuffLoader color='purple' size='10rem' />
            </div>
        </div>
    )    
}

export default Loading