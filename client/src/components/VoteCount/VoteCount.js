import React, {useEffect, useState} from 'react'
import { Table } from 'react-bootstrap'
import './style.css'
import getWeb3 from '../../getWeb3'
import Voting from '../../contracts/Voting.json'

function VoteCount() {
    let count = 1
    const [value, setValue] = useState({
        contract: null,
        web3: null,
        accounts: null,
    })
    const [candidateList, setCandidateList] = useState([])
    
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

    const listOfCandidates = () => {
        const listItems = candidateList.map((candidate) => {
            return (
                <tr>
                    <td>{count++}</td>
                    <td>{candidate.name}</td>
                    <td>{candidate.no_of_votes}</td>
                </tr>
            )
        })
        return listItems
    }


    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Name</th>
                        <th>No. of Votes</th>
                    </tr>
                    {listOfCandidates()}
                </thead>
            </Table>
        </>
    )
}

export default VoteCount
