const Promesa = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve({id:1,red:"Face", like : "AWS"})       
    },1000)
})

const Promesa2 = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve({id:1,red:"Twitter", like : "AWS"})       
    },2000)
})


Promise.all([Promesa, Promesa2]).then(result => console.log(result))

Promise.race([Promesa, Promesa2]).then(result => console.log(result))

