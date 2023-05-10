import MemberRow from './MemberRow'

function Board({ members, votes, shades, setFilter, filter, controlOptions, colorLookup }){

    const memberRows = members?.map((member)=>{
        return <MemberRow 
            member={member} 
            key={member.id} 
            votes={votes} 
            shades={shades} 
            setFilter={setFilter} 
            filter={filter} 
            controlOptions={controlOptions}
            colorLookup={colorLookup}
        />
    })

    return(
        <>                
            {memberRows}
        </>
    )
}
export default Board