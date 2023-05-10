import PositionTile from './PositionTile'

function MemberRow({ member, votes, shades, setFilter, filter, controlOptions, colorLookup }){

    const highlightRow = filter?.member?.id === member.id

    const positionTiles = member?.positions.positions?.map((positionObj, i) => {

        return <PositionTile 
                key={positionObj.id} 
                position={positionObj} 
                vote={votes?.at(i)} 
                shade={shades.at(i)} 
                member={member} 
                idx={i}
                highlightRow={highlightRow? 'highlightRow': ''}
                highlightCol={filter.voteFilter === i ? 'highlightCol': ''}
                setFilter={setFilter}
                controlOptions={controlOptions}
                colorLookup={colorLookup}
            />
    })

    //const highlightRow = true ? 'highlightRow' : "none"
    return(
        <div className={`memberRow ${highlightRow ? 'highlightRow': ''}`}>
            <div className='memberRowLabel'>
                    
                    <div className='memberNameLabel'>
                        {`${member.first_name} ${member.last_name} (${member.party})`}
                    </div>

                    <div className='memberStateLabel'>
                        {`${member.state}${member.district && member.district !== 'At-Large' ? `-${member.district}`: ''}`}
                    </div>


            </div>
            
            <div className="tileRow">
                {positionTiles}
            </div>
        </div>
    )
}
export default MemberRow