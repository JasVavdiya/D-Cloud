import DStorage from '../abis/DStorage.json'
import React, { Component } from 'react';
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3';
import './App.css';
import detectEthereumProvider from "@metamask/detect-provider";

//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

class App extends Component {

  async componentDidMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
    await window.ethereum.on('accountsChanged', (accounts)=> {
      window.location.reload(false);
    })
  }

  async loadWeb3() {
    const provider = await detectEthereumProvider();

    if (provider) {
      // setAccountListener(provider);
      window.web3 = new Web3(provider)
      provider.request({ method: "eth_requestAccounts" });

      
    } else {
      console.error("Please install MetaMask!");
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = DStorage.networks[networkId]
    if(networkData) {
      const dcloud = new web3.eth.Contract(DStorage.abi, networkData.address)
      this.setState({ dcloud })
      const fileCount = await dcloud.methods.fileCount().call()
      this.setState({ fileCount })

      // Load files
      for (var i = 1; i <= fileCount; i++) {
        const file = await dcloud.methods.files(i).call()
        console.log(file)
        this.setState({
          files: [...this.state.files, file]
        })
      }
      this.setState({ loading: false})
    } else {
      window.alert('d-cloud contract not deployed to detected network.')
    }

  }

  // Get file from user
  captureFile = event => {

    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend = () => {
      this.setState({ 
        buffer: Buffer(reader.result),
        type: file.type,
        name: file.name

       })
      console.log('buffer', this.state.buffer)
    }

  }


  //Upload File
  uploadFile = description => {
    console.log("Submitting file to ipfs...")

    //adding file to the IPFS
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('Ipfs result', result)
      if(error) {
        console.error(error)
        return
      }

        this.setState({ loading: true });
        
        if(this.state.type === ''){
          this.setState({type : 'none'});
        }

        this.state.dcloud.methods.uploadFile(result[0].hash, result[0].size, this.state.type, this.state.name, description).send({ from: this.state.account }).on('transactionHash', (hash) => {
          this.setState({
           loading: false,
           type: null,
           name: null
         })
         window.location.reload()
        }).on('error', (e) =>{
          window.alert('Error')
          this.setState({loading: false})
        })
      })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      dcloud: null,
      files: [],
      loading: true,
      type : null,
      name: null
    }

    this.uploadFile = this.uploadFile.bind(this)
    this.captureFile = this.captureFile.bind(this)
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
              files={this.state.files}
              captureFile={this.captureFile}
              uploadFile={this.uploadFile}
            />
        }
      </div>
    );
  }
}

export default App;