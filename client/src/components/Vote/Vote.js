import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import getWeb3 from '../../getWeb3'
import Voting from '../../contracts/Voting.json'

function Vote() {
    const [msg, setMsg] = useState('')
    const [value, setValue] = useState({
        contract: null,
        web3: null,
        accounts: null,
    })
    const [candidateList, setCandidateList] = useState([])
    const [selectedCandidate, setSelectedCandidate] = useState(0)
    const [aadhar, setAadhar] = useState('')

    async function loadValues() {
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3()

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts()

            // Get the contract instance.
            const networkId = 5777
            const deployedNetwork = Voting.networks[networkId]
            const instance = new web3.eth.Contract(
                Voting.abi,
                deployedNetwork && deployedNetwork.address
            )
            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            setValue({ web3, accounts, contract: instance })
            const response = await instance.methods
                .getNoOfVotes()
                .send({ from: accounts[0] })
            // console.log(response.events.CandidateList.returnValues[0].length)
            const details = response.events.CandidateList.returnValues[0]
            const arr = []
            for (let i = 0; i < details.length; i++) {
                arr.push({
                    candidate: details[i].candidate,
                    name: details[i].name,
                    no_of_votes: details[i].no_of_votes,
                })
            }
            setCandidateList(arr)
            setSelectedCandidate(arr[0].candidate)
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`
            )
            console.error(error)
        }
    }

    useEffect(() => {
        loadValues()
    }, [])

    const changeSelectedCandidate = (e) => {
        setSelectedCandidate(e.target.value)
        console.log(e.target.value)
    }

    const listOfCandidates = () => {
        const listItems = candidateList.map((candidate) => {
            return (
                <option value={candidate.candidate} key={candidate.candidate}>
                    {candidate.name}
                </option>
            )
        })
        return listItems
    }

    const vote = async(e) => {
        e.preventDefault()
        const response = await value.contract.methods
            .vote(Number(aadhar), Number(selectedCandidate))
            .send({ from: value.accounts[0] })
        setMsg(response.events.Success.returnValues.msg)
    }
    return (
        <>
            <h1>{msg}</h1>

            <Form onSubmit={(e) => vote(e)}>
                <Form.Group className='mb-3'>
                    <Form.Label>Aadhar Number</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Enter your Aadhar Number'
                        onKeyUp={(e) => setAadhar(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>Select Candidate</Form.Label>
                    <Form.Select
                        controlId='selectedCandidate'
                        onChange={(e) => changeSelectedCandidate(e)}
                    >
                        {listOfCandidates()}
                    </Form.Select>
                </Form.Group>

                <Button
                    variant='primary'
                    type='submit'
                    onClick={(e) => vote(e)}
                >
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default Vote
