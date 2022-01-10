
import './App.css';
import pic from './assets/ssd.jpeg'
import { useRef, useEffect, useState, createRef } from 'react'
import { socket } from './socket'

function App() {
  let toogleRef = useRef([])
  const [y, setY] = useState(0)
  const [x, setX] = useState(0)
  var data = []
  var datax = []
  const fulldata = {}
  const deneme = {}
  const [point, setPoint] = useState({});
  var elementsRef
  const points = []




  function addRef(e){
    if(e!= null) toogleRef.current.push(e)
    toogleRef.current = [...new Set(toogleRef.current)]
  }
  useEffect(() => {
    Object.keys(point).map(e=>{
      if(point[e].near !== null && point[e].near=='8030DCC74F9A'){
        let c = toogleRef.current.find(s=>s.id ==e)
        c.style.left='220px'
      }if(point[e].near !== null && point[e].near=='606405B2341B'){
        let c = toogleRef.current.find(s=>s.id ==e)
        c.style.left='120px'
      }
    })
  }, [point])
  useEffect(() => {
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

    //   function calcXY(x1,y1,r1,x2,y2,r2,x3,y3,r3){
    //     let A = 2*x2 - 2*x1
    //     let B = 2*y2 - 2*y1
    //     let C = r1**2 - r2**2 - x1**2 + x2**2 - y1**2 + y2**2
    //     let D = 2*x3 - 2*x2
    //     let E = 2*y3 - 2*y2
    //     let F = r2**2 - r3**2 - x2**2 + x3**2 - y2**2 + y3**2
    //     let x = (C*E - F*B) / (E*A - B*D)
    //     let y = (C*D - A*F) / (B*D - A*E)
    //     return {x,y}

    //   }

    //   function calcPosition(data){
    //     console.log(data)
    //     let x1 = data['D43639AEA1AA'].x
    //     let y1 = data['D43639AEA1AA'].y
    //     let r1 = data['D43639AEA1AA'].r

    //     let x2 = data['606405B2341B'].x
    //     let y2 = data['606405B2341B'].y
    //     let r2 = data['606405B2341B'].r

    //     let x3 = data['8030DCC74F9A'].x
    //     let y3 = data['8030DCC74F9A'].y
    //     let r3 = data['8030DCC74F9A'].r
    //     let res = calcXY(x1,y1,r1,x2,y2,r2,x3,y3,r3)
    //     setPoint(()=>res)


    //   }

    //   socket.on('data', (data) => {
    //     if(data.Mac in fulldata){
    //       if(data.id in fulldata[data.Mac] ){
    //         fulldata[data.Mac][data.id]= {x:data.x,y:data.y,r:data.r}
    //       }else{
    //         fulldata[data.Mac][data.id] = {x:data.x,y:data.y,r:data.r}
    //       }
    //       if(Object.keys(fulldata[data.Mac]).length  >=3  ){
    //         calcPosition(fulldata[data.Mac])
    //       }
    //     }else{
    //       fulldata[data.Mac] = {}
    //       fulldata[data.Mac][data.id] = {x:data.x,y:data.y, r:data.r}
    //     }

    // })

    socket.on('data', (data) => {
      data[Object.keys(data)[0]].forEach(element => {
        if (element.Mac in deneme) {
          deneme[element.Mac][element.id] = element
          if (element.Mac['near']?.distance < element.distance || element.Mac['near']?.distance == undefined) {
            deneme[element.Mac]['near'] = element.id
            
          }
        } else {
          deneme[element.Mac] = {}
          deneme[element.Mac]['near'] = {}
          deneme[element.Mac][element.id] = element
        }
      });
        console.log(deneme);
      // fulldata[Object.keys(data)[0]] = data[Object.keys(data)[0]]
      // console.log(fulldata)
      setPoint((e) => e = { ...deneme });
    })
  }, [])
  //  useEffect(() => {
  //   ref.current.style.top=`${y}px`
  //    ref.current.style.left=` ${x}px`

  //  }, [y,x])

  return (
    <div className="App">
      <div className='conteiner'>
        {/* <div className='point' ref={ref}>
          <div className='point-id'>
            <div>ONUR</div>
          </div>
        </div> */}
        <div className='area' />

        {point && Object.keys(point).map((element, i) => {
          return <div key={i} ref={(e)=>addRef(e)} id={element} className={`area1`} />
        })}
        {/* <div className='area1' /> */}


        <img className='bgpic' src={pic} alt={'denem'}></img>
      </div>
    </div>
  );
}

export default App;
