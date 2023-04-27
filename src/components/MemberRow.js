import PositionTile from './PositionTile'

function MemberRow({ member, votes, shades, setFilter, controlOptions }){

    const positionTiles = member?.positions.positions?.map((positionObj, i) => {
        return <PositionTile 
                key={positionObj.id} 
                position={positionObj} 
                vote={votes?.at(i)} 
                shade={shades.at(i)} 
                member={member} 
                idx={i}
                setFilter={setFilter}
                controlOptions={controlOptions}
                />
    })

    return(
        <div className='memberRow'>
            <div className='memberRowLabel'>
                    
                    <div className='memberNameLabel'>
                        {`${member.first_name} ${member.last_name} (${member.party})`}
                    </div>

                    <div className='memberStateLabel'>
                        {`${member.state}${member.district ? `-${member.district}`: ''}`}
                    </div>


            </div>
            
            <div className="tileRow">
                {positionTiles}
            </div>
        </div>
    )
}
export default MemberRow