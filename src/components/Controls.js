import { useState } from "react"
import { Button, Form, Row, Col, InputGroup } from 'react-bootstrap'

function Controls({ votes, members, controlOptions, setControlOptions, disabled }){
    const voteTypes = votes?.reduce((acc, elem) => acc.includes(elem.votable_type) ? acc : [...acc, elem.votable_type], [])
    const questionTypes = votes?.reduce((acc, elem) => acc.includes(elem.question) ? acc : [...acc, elem.question], [])
    const parties = members?.reduce((acc, elem) => acc.includes(elem.party) ? acc : [...acc, elem.party], [])
    const states = members?.reduce((acc, elem) => acc.includes(elem.state) ? acc : [...acc, elem.state], []).sort((a,b)=> a.localeCompare(b))
    
    console.log('controlOptions', controlOptions.party)
    const [formData, setFormData]=useState({})

    function handleChange(e){
        setControlOptions({...controlOptions, [e.target.name]: e.target.value})
    }
    
    // const questions= votes && votes.length >0 ? votes?.map(vote=> vote.question) : []
    // const questions= votes && votes.length >0 ? 'ok' : 'null' 

    return(
        <>
            <Row>
                <Form.Group as={Col} xs={2}>
                    <Form.Label>Party</Form.Label>       
                    <Form.Select name='party' value={controlOptions.party || ''} onChange={handleChange}>
                        <option value=''>(Select)</option>
                        {parties.map(type => {
                            return <option value={type} key={type}>{type}</option>
                        })}
                    </Form.Select>
                </Form.Group> 
                <Form.Group as={Col} xs={2}>
                    <Form.Label>State</Form.Label>         
                    <Form.Select name='state' value={controlOptions.state || ''} onChange={handleChange}>
                        <option value=''>(Select)</option>
                        {states.map(type => {
                            return <option value={type} key={type}>{type}</option>
                        })}
                    </Form.Select>
                </Form.Group>
                <Col xs={8}> 
                <InputGroup >
                    <Form.Control name='searchMember' type='text' value={formData.searchMember} onChange={(e)=>setFormData({searchMember: e.target.value})}></Form.Control>
                    <Button onClick={()=>setControlOptions({...controlOptions, searchMember: formData.searchMember})}>Search</Button>
                </InputGroup>
                </Col> 
            </Row>
            <Row>
                <Form.Group as={Col}>
                    <Form.Label>Vote Type</Form.Label>
                    <Form.Select disabled={disabled} name='voteType' value={controlOptions.voteType || ''} onChange={handleChange}>
                        <option value=''>(Select)</option>
                        {voteTypes.map(type => {
                            return <option value={type} key={type}>{type}</option>
                        })}
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Question Type</Form.Label>       
                    <Form.Select disabled={disabled} name='questionType' value={controlOptions.questionType || ''} onChange={handleChange}>
                        <option value=''>(Select)</option>
                        {questionTypes.map(type => {
                            return <option value={type} key={type}>{type}</option>
                        })}
                    </Form.Select>
                </Form.Group> 
            </Row>
            

            

            <Form.Group>
                <Form.Label>Highlight by Alignment</Form.Label>            
                <Form.Select name='alignment' value={controlOptions.alignment} onChange={handleChange}>
                    <option value=''>(Select)</option>
                    <option value='alignmentWithParty'>Party Alignment</option>
                    <option value='nonAlignmentWithParty'>Party Non-alignment</option>
                    <option value='alignmentWithChamber'>Chamber Alignment</option>
                    <option value='nonAlignmentWithChamber'>Chamber Non-alignment</option>
                </Form.Select>
            </Form.Group>   
            
            
        </>
    )
}
export default Controls;