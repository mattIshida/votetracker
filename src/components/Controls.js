import { useState } from "react"
import { Button, Form, Row, Col, InputGroup } from 'react-bootstrap'

function Controls({ votes, members, controlOptions, setControlOptions, disabled, setFilter }){
    const voteTypes = votes?.reduce((acc, elem) => acc.includes(elem.votable_type) ? acc : [...acc, elem.votable_type], [])
    const questionTypes = votes?.reduce((acc, elem) => acc.includes(elem.question) ? acc : [...acc, elem.question], [])
    const parties = members?.reduce((acc, elem) => acc.includes(elem.party) ? acc : [...acc, elem.party], [])
    const states = members?.reduce((acc, elem) => acc.includes(elem.state) ? acc : [...acc, elem.state], []).sort((a,b)=> a.localeCompare(b))
    
    console.log('controlOptions', controlOptions.party)
    const [formData, setFormData]=useState({})
    const [show, setShow] = useState(false)

    function handleChange(e){
        setControlOptions({...controlOptions, [e.target.name]: e.target.value})
    }
    
    // const questions= votes && votes.length >0 ? votes?.map(vote=> vote.question) : []
    // const questions= votes && votes.length >0 ? 'ok' : 'null' 

    return(
        <>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Button variant={ show ? 'outline-dark' : 'dark'} className='my-3' onClick={()=>{setShow(!show)}}>{show ? 'Hide filters' : 'Show filters'}</Button>
            </div>
            { show ? 
            <>
            <Row className='mb-3'>
                
                <Col xs={6}> 
                <Form.Label>Search by member name</Form.Label>
                <InputGroup >
                    <Form.Control name='searchMember' type='text' value={formData.searchMember} onChange={(e)=>setFormData({searchMember: e.target.value})}></Form.Control>
                    <Button variant='dark' disabled={!formData.searchMember}onClick={()=>setControlOptions({...controlOptions, searchMember: formData.searchMember.toLowerCase()})}>Search</Button>
                </InputGroup>
                </Col> 
                <Form.Group as={Col} xs={3}>
                    <Form.Label>Party</Form.Label>       
                    <Form.Select name='party' value={controlOptions.party || ''} onChange={handleChange}>
                        <option value=''>(Select)</option>
                        {parties.map(type => {
                            return <option value={type} key={type}>{type}</option>
                        })}
                    </Form.Select>
                </Form.Group> 
                <Form.Group as={Col} xs={3}>
                    <Form.Label>State</Form.Label>         
                    <Form.Select name='state' value={controlOptions.state || ''} onChange={handleChange}>
                        <option value=''>(Select)</option>
                        {states.map(type => {
                            return <option value={type} key={type}>{type}</option>
                        })}
                    </Form.Select>
                </Form.Group>
            </Row>
            <Row className='my-3'>
                <Form.Group as={Col} xs={4}>
                    <Form.Label>Vote Type</Form.Label>
                    <Form.Select disabled={disabled} name='voteType' value={controlOptions.voteType || ''} onChange={handleChange}>
                        <option value=''>(Select)</option>
                        {voteTypes.map(type => {
                            return <option value={type} key={type}>{type}</option>
                        })}
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} xs={5}>
                    <Form.Label>Question Type</Form.Label>       
                    <Form.Select disabled={disabled} name='questionType' value={controlOptions.questionType || ''} onChange={handleChange}>
                        <option value=''>(Select)</option>
                        {questionTypes.map(type => {
                            return <option value={type} key={type}>{type}</option>
                        })}
                    </Form.Select>
                </Form.Group> 
                <Col style={{display: 'flex', alignItems: 'flex-end'}}>
                        <Button variant='dark' onClick={()=>{
                            setFilter({partyFilter: [], positionFilter: [], voteFilter: null})
                            setControlOptions({alignment: ''})
                            }}
                        >Reset filters</Button>
                </Col>
            </Row>
            
            
            </> : null }

            {/* <Form.Group>
                <Form.Label>Highlight by Alignment</Form.Label>            
                <Form.Select name='alignment' value={controlOptions.alignment} onChange={e => setControlOptions({...controlOptions, [e.target.name]: e.target.value})}>
                    <option value=''>(Select)</option>
                    <option value='alignmentWithParty'>Party Alignment</option>
                    <option value='nonAlignmentWithParty'>Party Non-alignment</option>
                    <option value='alignmentWithChamber'>Chamber Alignment</option>
                    <option value='nonAlignmentWithChamber'>Chamber Non-alignment</option>
                </Form.Select>
            </Form.Group>    */}
            
            
        </>
    )
}
export default Controls;