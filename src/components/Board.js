import { Container } from 'react-bootstrap'
import MemberRow from './MemberRow'
import { useEffect } from 'react'

function Board({ members, votes, shades, setFilter, filter, controlOptions }){

    const memberRows = members?.map((member)=>{
        return <MemberRow member={member} key={member.id} votes={votes} shades={shades} setFilter={setFilter} filter={filter} controlOptions={controlOptions}/>
    })

    useEffect(()=>{
        console.log('component has finished rendering')
    },[])

    return(
        <>
            {/* <Container className="Board sm-col-10 md-col-8 col-lg-5 xl-col-4 my-3"> */}
            <Container>
                {memberRows}
            </Container>
        </>
    )
}
export default Board