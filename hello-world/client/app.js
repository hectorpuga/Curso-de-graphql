async function fetchGreeting(){
  let datos=await  fetch('http://localhost:9000',{
      method:"POST" ,
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        query:'query{greeting}'
      })
    });
    const body=await datos.json();

    console.log(body['data']['greeting']);
     return body['data']['greeting'];
}



texto=document.querySelector('#texto');

 fetchGreeting().then((dato)=>{
    texto.innerText=dato;
 });
