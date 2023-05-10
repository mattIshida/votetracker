import { useEffect, useState } from 'react'
import NavBar from "../../../../../components/NavBar"
// import Home from "./components/Home"
// import About from "./components/About"
// import LegislatorsPage from "./components/LegislatorsPage"
// import LegislatorDetailPage from "./components/LegislatorDetailPage"
// import BillsPage from "./components/BillsPage"
// import BillDetailPage from "./components/BillDetailPage"
// import UserHome from "./components/UserHome"
// import IssuesPage from "./components/IssuesPage"
import Board from '../../../../../components/Board'
import { Button, Form, Pagination, Alert, Container} from 'react-bootstrap'
import Controls from '../../../../../components/Controls'
import Loading from '../../../../../components/Loading'
import Link from 'next/link'
import { useRouter } from 'next/router'
import chroma from "chroma-js"

const URL = "http://localhost:9292"
//const URL = 'http://backend:9292'

function MyApp({ members, votes, vote_count }) {

  // console.log('votes', votes)
  // console.log('members', members)

  // return <h1>hello world</h1>



  // const [members, setMembers] = useState([])
  // const [votes, setVotes] = useState([])
  const [filter, setFilter]= useState({partyFilter: [], positionFilter: [], voteFilter: null})
  const [controlOptions, setControlOptions] = useState({alignment: ''})
  const [authors, setAuthors] = useState([]);
  const [totalPages, setTotalPages] = useState(members?.at(0).positions?.total_pages);
  const [loading, setLoading] = useState(true)
  const perPage = 25
  const router = useRouter()
  const {chamber, year, month, page} = router.query
  const [currentPage, setCurrentPage] = useState(page);
  const [suffix, setSuffix] = useState(`/${chamber}/${year}/${month}/1`)


  useEffect(()=>{
    setTotalPages(members?.at(0).positions?.total_pages)
    setCurrentPage(page)
  }, [members, page])

  function handlePrevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  function handleSelectMonth(e){
    setSuffix(e.target.value)
    router.push(`/MyApp${e.target.value}`)
  }

  function capitalize(word){
    if (word.length < 2) return word.toUpperCase()
    return word[0].toUpperCase()+word.slice(1).toLowerCase()
  }

  function monthFromNumeral(numeral){
    return new Date(2023, Number(numeral)-1).toLocaleDateString(undefined, {month: 'long'})
  }


  const shades = votes?.map((v, i)=> {
    if(i==0) return 0
    return v.votable_id == votes[i-1].votable_id ? 0 : 1
  }).map((x,i, arr)=> arr.slice(0, i+1).reduce((acc,elem)=>acc+elem, 0)).map(x=> x%2)
 
  const filteredMembers = members?.filter((m) => filter.partyFilter.length==0 || filter.partyFilter.includes(m.party))
  .filter((m)=> filter.voteFilter === null || filter.positionFilter.length==0 || filter.positionFilter.includes(m.positions.positions[filter.voteFilter]?.vote_position))
  .filter(m => !controlOptions.party || controlOptions.party===m.party)
  .filter(m=> !controlOptions.state || controlOptions.state == m.state)
  .filter(m => !controlOptions.searchMember || m.last_name.toLowerCase().includes(controlOptions.searchMember))

  console.log('votes_summary', votes?.map((v)=> v.summary))
  console.log('votes', votes)
  console.log('members', members)
  console.log('total pages', totalPages)
  console.log('currentPage', currentPage)
  console.log('filter',filter)

  const specialVoteCounts = {}
  votes.map(voteObj => voteObj.summary.Total).forEach(summary => {
    for(let key in summary){
      if(['Yes', 'No', 'Not Voting', 'Present', 'Total', 'Speaker'].includes(key)) continue
      if(!specialVoteCounts[key]) specialVoteCounts[key] = 0
      specialVoteCounts[key] += summary[key]
    }
  })
  console.log(specialVoteCounts)

  // const chroma = require('chroma-js');

  const inputColors = ['#FF0000', '#00FF00', '#0000FF'];
  const numColors = Object.keys(specialVoteCounts).length;

  // const baseScale = chroma.scale('sinebow');
  // const palette = [];

  // for (let i = 0; i < numColors; i++) {
  //   const newColor = baseScale(i / (numColors - 1));
  //   palette.push(newColor);
  // }

  const colorScale = chroma.scale(['#fafa6e','#2A4858'])
  .mode('lch').colors(numColors)
  const colorScale2 = []
  for(let i = 0; i < colorScale.length/2 + 1; i++){
    colorScale2.push(colorScale[i])
    if(colorScale.length - i - 1 > i) colorScale2.push(colorScale[colorScale.length-i-1])
  }
  const colorLookup = Object.fromEntries(Object.keys(specialVoteCounts).sort((a,b)=> specialVoteCounts[b] - specialVoteCounts[a]).map((k, i) => [k, colorScale2[i]]))
  console.log('colorLookup', colorLookup)

  const showingSimilar = filter.partyFilter.length>0 || filter.positionFilter.length >0 || filter.voteFilter

  return (
    <>
      {members?.length==0 || votes?.length==0  || members===undefined || votes === undefined ? <Loading/> :
      
      <>

        <Form.Select disabled={showingSimilar} value ={suffix} onChange={handleSelectMonth}>
          {vote_count?.map(countObj => <option 
            key={`${countObj.chamber}/${countObj.year}/${countObj.month}`} 
            value={`/${countObj.chamber}/${countObj.year}/${countObj.month}/1`}>
              {`${capitalize(countObj.chamber)}, ${monthFromNumeral(countObj.month)} ${countObj.year}`}
            </option>) }
        </Form.Select>

        {showingSimilar ? 
        
          <Alert variant='light' style={{borderWidth: '1px', borderColor: 'black'}}>

            <Alert.Heading>{`Showing votes similar to ${filter.member?.first_name} ${filter.member?.last_name}'s ${filter.positionFilter} on ${votes[filter.voteFilter].votable_id.toUpperCase()}` }
            </Alert.Heading>
            <p>{votes[filter.voteFilter].votable.short_title}</p>
            <p>{votes[filter.voteFilter].title}</p>

            <div className="d-flex justify-content-end">

            <Button onClick={()=>{
              setFilter({partyFilter: [], positionFilter: [], voteFilter: null})
              }}>Done
            </Button>
            </div>

          </Alert>
        
        : null}

    
      <Controls votes={votes} 
        members={members} 
        controlOptions={controlOptions} 
        setControlOptions={setControlOptions} 
        disabled={showingSimilar}
      />
    
      <Button onClick={()=>{
        setFilter({partyFilter: [], positionFilter: [], voteFilter: null})
        setControlOptions({alignment: ''})
      }}>Reset filters</Button>


      <Container className='justify-content-center'>
        <Pagination size='sm' >
          {totalPages > 1 ? Array(totalPages).fill().map((x, i)=> i+1).map((n)=> {
            return <Pagination.Item key={n} active={currentPage==n} onClick={()=>{
              setCurrentPage(n)
              router.push(`/MyApp/${chamber}/${year}/${month}/${n}`)}}>{n}</Pagination.Item>
          }): null}
        </Pagination>
      </Container>
      




      <Board 
        members={filteredMembers.slice(0,1000)} 
        votes={votes}
        shades={shades}
        setFilter={setFilter}
        filter={filter}
        controlOptions={controlOptions}
        colorLookup={colorLookup}
      />


      </>
    }
  </>)
}

export default MyApp;

export async function getStaticProps({params}){

  const chamber = params.chamber || 'house'
  const year = params.year || '2023'
  const month = params.month || '03'
  const page = params.page || 1


  const res = await fetch(`${URL}/${chamber}/${year}/${month}/members/${page}`)
  const members = await res.json()

  const res_votes = await fetch(`${URL}/${chamber}/${year}/${month}/votes/${page}`)
  const votes = await res_votes.json()

  const res_count = await fetch(`${URL}/vote_count`);
  const vote_count = await res_count.json()

  return {
    props: {
      members,
      votes,
      vote_count
    },
  }
}


export async function getStaticPaths() {
  const res = await fetch(`${URL}/vote_count`);
  const tally = await res.json()
  // console.log(tally)
  // const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  // const paths = Array(totalPages)
  //   .fill()
  //   .map((_, i) => ({ params: { page: `${i + 1}` } }));

  let paths = []

  tally.forEach(({chamber, year, month, count}) => {
    if(count > 0){
    let page = 1
    while (page <= Math.ceil(count/25)){
      paths.push({
        params: 
        {
          chamber,
          year,
          month,
          page: String(page)
        }
      })
      page += 1}
    }
  })
  
  // const paths = [
  //   {params: {chamber: "house", year: '2023', month: '03', page: "1"}},
  //   {params: {chamber: "house", year: '2023', month: '03', page: "2"}},
  //   {params: {chamber: "house", year: '2023', month: '02', page: "1"}}
  // ]

  return {
    // paths: [{params: {chamber: 'senate', year: '2023', month: '02', page: '1'}}],
    paths,
    fallback: true // render fallback page for paths that have not been generated
  }
}