import { Box} from '@mui/system'
import { Button,TextField ,IconButton, paperClasses} from '@mui/material'
import AssignmentIcon from '@mui/icons-material/Assignment';
import PhoneIcon from "@mui/icons-material/Phone"
import React, { useEffect, useState,useRef } from 'react'
import JoinMeeting from './JoinMeeting'
import io from 'socket.io-client';
// import Peer from "simple-peer";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { PieChart, VerticalAlignBottom } from '@mui/icons-material';
import { json } from 'react-router-dom';

const socket = io('/webRTCPeers',{path: '/webrtc'} )
const MeetingScreen = () => {
  //   const [roomId, setroomId] = useState();
  //   const [userName, setuserName] = useState()

     const [myName, setmyName] = useState("");
  //   const [ stream, setStream ] = useState()
	// const [ receivingCall, setReceivingCall ] = useState(false)
	// const [ caller, setCaller ] = useState("")
	// const [ callerSignal, setCallerSignal ] = useState()
	// const [ callAccepted, setCallAccepted ] = useState(false)
	// const [ idToCall, setIdToCall ] = useState("")
	// const [ callEnded, setCallEnded] = useState(false)
	// const [ name, setName ] = useState("")
	const myVideo = useRef()
	const userVideo = useRef()
	const connectionRef= useRef(new RTCPeerConnection(null));
  
  const textRef = useRef();
  // const candidates = useRef([])
  const [offerVisible ,setOfferVisible]= useState(true);
  const [answevisible ,setAnswerVisible]= useState(false);
  const [status, setstatus] = useState("Make a call now");



  useEffect(() => {
    socket.on('connection-success',success=>{
      console.log(success);
    })
    socket.on('sdp',data=>{
      console.log(data.stream );
      connectionRef.current.setRemoteDescription(new RTCSessionDescription(data.stream))
      textRef.current.value= JSON.stringify(data.stream);
      if(data.stream.type=="offer"){
        setOfferVisible(false);
        setAnswerVisible(true);
        setstatus("Incoming Call ....")
      }
      else{
        setstatus('Call establshed ')
      }
    })
    socket.on('candidate', candidate=>{
      console.log(candidate);
      // candidates.current = [...candidates.current,candidate]
      connectionRef.current.addIceCandidate(new RTCIceCandidate(candidate))
    })

    const constraints ={
      Audio:true,
      video:true
    }
    navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
      myVideo.current.srcObject = stream;
      stream.getTracks().forEach(track=>{
        _pc.addTrack(track,stream)
      })
      console.log('Got MediaStream:', stream.id);
  })
  .catch(error => {
      console.error('Error accessing media devices.', error);
  });
  
  const _pc = new RTCPeerConnection(null);
  _pc.onicecandidate = (e)=>{
    if(e.candidate){
      console.log(JSON.stringify(e.candidate));
      sendToPeer('candidate',e.candidate);
    }

  }
  _pc.oniceconnectionstatechange =(e)=>{
    console.log(e,"iceconnection");
  }
  _pc.ontrack = (e)=>{
    console.log(e);
    userVideo.current.srcObject =e.streams[0]
    
  }
  connectionRef.current =_pc;

  }, [])

  const sendToPeer = (eventType, playLoad)=>{
    socket.emit(eventType,playLoad)

  }

  const processSDP= (stream)=>{
    console.log(JSON.stringify(stream));
      connectionRef.current.setLocalDescription(stream);
    sendToPeer('sdp',{stream})

  }
  const createOffer = ()=>{
    connectionRef.current.createOffer({
      offerToReceiveAudio:true,
      offerToReceiveVideo:true,
    }).then(stream=>{
      processSDP(stream);
      setOfferVisible(false);
      setstatus("Callong ....");

    }).catch(e=>console.log(e))
  }

  const createAnswer = () => {
    connectionRef.current.createAnswer({
      offerToReceiveAudio:true,
      offerToReceiveVideo:true,
    }).then(stream=>{
      processSDP(stream);
     setAnswerVisible(false)
     setstatus("Call established")

    }).catch(e=>console.log(e,"tttttttttttttttttttttttttttttttttttttttttttt"))
  }

  const showHideButton = ()=>{
    if(offerVisible){
      return(
        <div>
          <button onClick={createOffer}>Call</button>
        </div>
      )
      
    }else if(answevisible){
      return(
        <div>
          <button onClick={createAnswer}>Answer</button>
        </div>
      )
    }
  }





  // const setRemoteDescription = ()=>{
  //   const sdp = JSON.parse(textRef.current.value)
  //   console.log(sdp);

  //   connectionRef.current.setRemoteDescription(new RTCSessionDescription(sdp))
  // }
  // const addCondidate = ()=>{
  //   // const candidate = JSON.parse(textRef.current.value);
  //   // console.log("adding candidate .......", candidate);
  //   candidates.current.forEach(candidate =>{
  //     console.log(candidate);
  //     connectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
  //   })

    
  // }

  

  

  

 // const getUserMedia = ()=>{
  //   const constraints ={
  //     Audio:true,
  //     video:true
  //   }
  //   navigator.mediaDevices.getUserMedia(constraints)
  //   .then(stream => {
  //     myVideo.current.srcObject = stream;
  //     console.log('Got MediaStream:', stream);
  // })
  // .catch(error => {
  //     console.error('Error accessing media devices.', error);
  // })
  //}
    //useEffect(()=>{
    //   socket.on('connection-success',success=>{
    //     console.log(success);
    //   })
    //   const getUserMedia=()={
    //   const constraints = {
    //     'video': true,
    //     'audio': true
    // }
    //  navigator.mediaDevices.getUserMedia(constraints)
    //  .then((stream)=>{
    //   // setStream(stream)
    //    myVideo.current.srcObject= stream;
    //   console.log(stream,"Got mediaStream");
       
    //  })
    //  .catch((error)=>{
    //   console.log(error);
    //  })
    // //  socket.on("me",(id)=>{
    // //   setmyName(id)
    // //  })
     
    // //  socket.on("callUser",(data)=>{
    // //   setReceivingCall(true)
    // //   setCaller(data.from)
    // //   setName(data.name)
    // //   setCallerSignal(data.signal)
    // //  })
    // }
    // },[]);

  //   const callUser = (id)=>{
  //     const peer = new Peer({
  //       initiator: true,
  //       trickle:false,
  //       stream:stream
  //     })
  //     peer.on("signal",(data)=>{
  //       socket.emit("callUser",{
  //         userToCall:id,
  //         signalData:data,
  //         from:myName,
  //         name:name
  //       })
  //     })
  //     peer.on("stream",(stream)=>{
  //       userVideo.srcObject=stream;

  //     })
  //     socket.on("callAccepted",(signal)=>{
  //       setCallAccepted(true);
  //       peer.signal(signal);
  //     })
  //     connectionRef.current = peer;

  //  }
  //  const answerCall = ()=>{
  //   setCallAccepted(true);
  //   const peer = new Peer({
  //     initiator:false,
  //     trickle:false,
  //     stream: stream
  //   })
  //   peer.on("signal", (data)=>{
  //     socket.emit("answerCall",{signal:data, to:caller})
  //   })
  //   peer.on("stream",(stream)=>{
  //     userVideo.srcObject=stream;

  //   })
  //   connectionRef.current = peer;
  //  }
  //  const leaveCall=()=>{
  //   setCallEnded(true)
  //   connectionRef.current.destroy()
  //  }




  return (
    <>
        {/* <JoinMeeting
        name={userName} setuserName={setuserName} 
        roomID={roomId} setroomId={setroomId}
        /> */}

<Box>
		
    <h1 >sehrish</h1>
				<div>
        <video   ref={myVideo} autoPlay={true} style={{ width: "300px",border:"1px solid" }} />
        <video ref={userVideo} autoPlay={true} style={{ width: "300px",border:"1px solid" }} />
        <br />
        {/* <button onClick={createOffer}>Create Offer</button>
        <button onClick={createAnswer}>Create Answer</button> */}
        {/* <br /> */}

        {showHideButton()}
        <div>{status}</div>
        <textarea  ref={textRef}></textarea>
        <br />
        {/* <button onClick={setRemoteDescription}>Set Remote Discription</button>
        <button onClick={addCondidate}>Add Candidates</button> */}

        </div>
       </Box>
    </>
  )
}

export default MeetingScreen