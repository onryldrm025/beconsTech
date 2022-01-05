
import './App.css';
import pic from './assets/ss.png'
import {useRef,useEffect,useState} from 'react'
import { socket } from './socket'

function App() {
  const ref = useRef();
  const [y,setY] = useState(0)
  const [x,setX] = useState(0)
  var data = []
  var datax = []
  

   useEffect(() => {
    socket.emit('sayHello','Web Girdids');
    // socket.on('data', (ds)=>{
    //   // console.log(ds)
    //   //id y
    //   if(ds.id == 'D43639AEA1AA' && ds.Mac =='123B6A1B4452'){
    //     // let c = ds.distance * 150 >= 500 ? 500 : ds.distance * 150
         
    //       if(data.length < 5)
    //       {
    //         data = [...data,ds.distance ]
    //       }else{
    //         let max  = Math.max(...data)
    //         let min = Math.min(...data)
    //         let dd  = data.map((item)=> Math.abs((item-min)/ max-min))
    //         const average = dd.reduce((a, b) => a + b) / dd.length;
    //         console.log( 'y' + average)
    //         setY(average  * 200)
    //         data= [];
    //       }  
    //     //  console.log('y : ' +  ds.distance)
    //   } 
    //   if(ds.id == '8030DCC74F9A' && ds.Mac =='123B6A1B4452'){
    //     if(datax.length < 5)
    //     {
    //       datax = [...data,ds.distance ]
    //     }else{
    //       let max  = Math.max(...datax)
    //       let min = Math.min(...datax)
    //       let dd  = datax.map((item)=> Math.abs((item-min)/ max-min))
    //       const average = dd.reduce((a, b) => a + b) / dd.length;
    //        console.log('x' + average)
    //        setX(((average  * 50) + 50 ))
    //       datax= [];
    //     }  
    //     // let c = ds.distance * 71 >= 500 ? 500 : ds.distance * 25
    //     //  console.log('x : ' +  ds.distance)
    //       // setX(ds.distance)
    //   } 
    // });

    socket.on('data2', (data) => {
      if(data.macAddress=== '12:3B:6A:1B:44:52'){
        ref.current.style.top=`75px`
        ref.current.style.left=` 217px`
        console.log('Femi')
      }
      if(data.macAddress=== '12:3B:6A:1B:44:44'){
        ref.current.style.top=`78px`
        ref.current.style.left=` 404px`
        console.log('Onur')
      }
      if(data.macAddress=== '12:3B:6A:1B:44:56'){
        ref.current.style.top=`279px`
        ref.current.style.left=` 336px`
        console.log('alp')
      }
  })
 
  },[])
   useEffect(() => {
    ref.current.style.top=`${y}px`
     ref.current.style.left=` ${x}px`
    // ref.current.style.left=` $50px`
   }, [y,x])

  return (
    <div className="App">
      <div className='conteiner'>
        <div className='point' ref={ref}>
          <div className='point-id'>
            <div>ONUR</div>
          </div>
        </div>
        <img className='bgpic' src={pic} alt={'denem'}></img>
      </div>
    </div>
  );
}

export default App;
