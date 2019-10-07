const Promesa = new Promise((resolve, reject)=>{
        setTimeout(()=>{
            //resolve({id:1,model:"Leon", company : "AWS"})
            reject(new Error('Error en la promesa'))
        },4000)
})

Promesa.then(
result => console.log(result)
).catch(
err => console.log(err.message)
)