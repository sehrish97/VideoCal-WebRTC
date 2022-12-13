import { Box} from '@mui/system'
import React, { useEffect, useState,useRef } from 'react'
import io from 'socket.io-client';

const socket = io('/webRTCPeers',{path: '/webrtc'} )
const MeetingScreen = () => {
  
	const myVideo = useRef()
	const userVideo = useRef()
	const connectionRef= useRef(new RTCPeerConnection(null));
  const textRef = useRef();
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


  return (
    <>
      

<Box>
		
    <h1 >sehrish</h1>
				<div>
          {}
        <video   ref={myVideo} autoPlay={true} style={{ width: "300px",border:"1px solid" }} />
        <video ref={userVideo} autoPlay={true} style={{ width: "300px",border:"1px solid" }} />
        <br />
        {/* <br /> */}

        {showHideButton()}
        <div>{status}</div>
        <textarea  ref={textRef}></textarea>
        <br />
        </div>
       </Box>
    </>
  )
}

export default MeetingScreen