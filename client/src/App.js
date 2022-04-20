import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'

import './App.css'
import Vote from './components/Vote/Vote'
import Register from './components/Register/Register'
import VoteCount from './components/VoteCount/VoteCount'

function App() {
    // componentDidMount = async () => {
    //     try {
    //         // Get network provider and web3 instance.
    //         const web3 = await getWeb3()

    //         // Use web3 to get the user's accounts.
    //         const accounts = await web3.eth.getAccounts()

    //         // Get the contract instance.
    //         const networkId = await web3.eth.net.getId()
    //         const deployedNetwork = Voting.networks[networkId]
    //         const instance = new web3.eth.Contract(
    //             Voting.abi,
    //             deployedNetwork && deployedNetwork.address
    //         )

    //         // Set web3, accounts, and contract to the state, and then proceed with an
    //         // example of interacting with the contract's methods.
    //     } catch (error) {
    //         // Catch any errors for any of the above operations.
    //         alert(
    //             `Failed to load web3, accounts, or contract. Check console for details.`
    //         )
    //         console.error(error)
    //     }
    // }

    // runExample = async () => {
    //   const { accounts, contract } = this.state;

    //   // Stores a given value, 5 by default.
    //   await contract.methods.set(5).send({ from: accounts[0] });

    //   // Get the value from the contract to prove it worked.
    //   const response = await contract.methods.get().call();

    //   // Update state with the result.
    //   this.setState({ storageValue: response });
    // };
    return (
        <BrowserRouter>
            <Navbar bg='primary' variant='dark'>
                <Container>
                    <Navbar.Brand>E-Voting</Navbar.Brand>
                    <Nav className='me-auto'>
                        <Nav.Link href='/'>
                                Vote
                        </Nav.Link>
                        <Nav.Link href='/register'>
                                Register Candidates
                        </Nav.Link>
                        <Nav.Link href='/voteCount'>
                                Vote Count
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Container>
                <Routes>
                    <Route path='/' element={<Vote />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/voteCount' element={<VoteCount />} />
                </Routes>
            </Container>
        </BrowserRouter>
    )
}

export default App
