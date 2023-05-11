import Popover from 'react-bootstrap/Popover';
import { Button, Overlay } from 'react-bootstrap';
import { useState, useRef } from 'react'

function PositionTile({ position, vote, shade, member, idx, setFilter, controlOptions, highlightRow, highlightCol, colorLookup }){
    
    const positionClass = position.vote_position.replaceAll(' ','')
    const partySummary = vote?.summary[member.party]
    const alignmentWithParty = partySummary[position.vote_position]/partySummary.Total
    const alignmentWithChamber = vote?.summary.Total[position.vote_position]/vote.summary.Total.Total
    const [showPopover, setShowPopover] = useState(false);
    const target = useRef(null);


    const opacityLookup = {
        '': 1,
        alignmentWithParty,
        alignmentWithChamber,
        nonAlignmentWithParty: 1-alignmentWithParty,
        nonAlignmentWithChamber: 1-alignmentWithChamber
    }

    const opacity = !controlOptions.alignment ? 1 : opacityLookup[controlOptions.alignment]
    
    const blankTileQuestion = !controlOptions.questionType || controlOptions.questionType == '' || controlOptions.questionType == vote.question ? '' : 'blankTile'
    const blankTileVotable = !controlOptions.voteType || controlOptions.voteType == '' || controlOptions.voteType == vote.votable_type ? '' : 'blankTile'

    const handlePopoverClick = () => {
        console.log('handlePopoverClick triggered')
        setShowPopover(true);
    };

    const handlePopoverClose = () => {
        setShowPopover(false);
    };

    const voteDate = new Date(Date.parse(vote.date))
    const dateString = voteDate.toLocaleDateString('en-US',{month: 'long', day: 'numeric', year: 'numeric'})

    return(
        <>
        <div className={`shade${shade} ${highlightRow} ${highlightCol}`}>
            <div ref={target}
                onMouseEnter={handlePopoverClick} 
                onMouseLeave={handlePopoverClose} 
                className={`positionTile Fill${positionClass} ${blankTileVotable} ${blankTileQuestion}`} 
                style={colorLookup[position.vote_position] ? {opacity: opacity, backgroundColor: colorLookup[position.vote_position]} : {opacity: opacity}}>
            </div>
        </div>    


        <Overlay target={target.current} show={showPopover} flip='true' placement="top" >
            <Popover className='popover-placement-top' onMouseLeave={handlePopoverClose} onMouseEnter={handlePopoverClick}>
                {/* <Popover.Header>{`${member.first_name} ${member.last_name}'s ${position.vote_position} on ${vote?.votable_id?.toUpperCase()}`}</Popover.Header> */}
                <Popover.Header>
                    <div style={{fontSize: '.8rem'}}>{dateString}</div>
                    <div style={{fontSize: '1.5rem'}}>{ `${vote?.votable_id?.toUpperCase() || vote.question}`}</div>
                    <div style={{fontSize: '.8rem'}}>{`${vote.question}`}</div>
                </Popover.Header>
                <Popover.Body>
                    <div>                        
                        <strong>Position</strong>
                        <div>{`${member.short_title} ${member.first_name} ${member.last_name} : ${position.vote_position}`}</div>
                    </div>

                    <div>
                        <strong>Alignment</strong>
                        <div style={{display: 'flex'}}>
                            <span style={{marginRight: '1rem'}}>{`Party: ${Math.round(alignmentWithParty*100)}%`}</span>
                            <span>{`Chamber: ${Math.round(alignmentWithChamber*100)}%`}</span>
                        </div> 
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                        <Button className="mt-2"variant="primary" onClick={() => {
                            setFilter({positionFilter: [position.vote_position], partyFilter: [member.party], voteFilter: idx, member: member})}}
                        >
                            See similar votes
                        </Button>
                    </div>
                    
                    <hr/>
                    <div>
                        <strong>{vote.votable_type}</strong>
                        <div>{vote?.description}</div>
                    </div>
                    <div>
                        <strong>Result</strong>
                        <div>{vote?.result}</div>
                    </div>
                    {vote.votable?.govtrack_url || vote.votable?.congressdotgov_url ? 
                        <div>
                            <strong>More details</strong>
                            <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                                {vote.votable?.govtrack_url ? <a href={vote.votable?.govtrack_url}>Govtrack</a>: null}
                                {vote.votable?.congressdotgov_url ? <a href={vote.votable?.congressdotgov_url}>Congress.gov</a>: null}
                            </div> 
                        </div> 
                    : null}
                    
                </Popover.Body>
            </Popover>
      </Overlay>
        
        
    </>
    )
}

export default PositionTile