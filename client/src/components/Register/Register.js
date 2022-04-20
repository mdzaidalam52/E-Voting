import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import getWeb3 from '../../getWeb3'
import Voting from '../../contracts/Voting.json'

function Register() {
    const [name, setName] = useState(0)
    const [aadhar, setAadhar] = useState('')
    const [msg, setMsg] = useState('')
    const [value, setValue] = useState({
        contract: null,
        web3: null,
        accounts: null,
    })

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
            console.log(instance)
            console.log('hey')
            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            setValue({ web3, accounts, contract: instance })
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`
            )
            console.error(error)
        }
    }
    const changeAadhar = (e) => {
        setAadhar(e.target.value)
    }

    const changeName = (e) => {
        setName(e.target.value)
    }

    const register = async (e) => {
        e.preventDefault()
        console.log('hello')
        const response = await value.contract.methods
            .registerCandidate(Number(aadhar), name)
            .send({ from: value.accounts[0] })
        setMsg(response.events.Success.returnValues.msg)
    }

    useEffect(() => {
        loadValues()
    }, [])

    return (
        <>
            <h1>{msg}</h1>
            <Form>
                <Form.Group className='mb-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter your Name'
                        onKeyUp={(e) => changeName(e)}
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Aadhar Number</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Enter your Aadhar Number'
                        onKeyUp={(e) => changeAadhar(e)}
                    />
                </Form.Group>

                <Button
                    variant='primary'
                    type='submit'
                    onClick={(e) => register(e)}
                >
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default Register
