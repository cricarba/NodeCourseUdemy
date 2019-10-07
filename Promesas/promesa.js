function getCar(id){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve({id:1,model:"Leon", company : "AWS"})             
        },4000)
    })
}

function getModel(model){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve({speed:100,seat: 5, company : "AWS"})             
        },4000)
    })
}

//sin asyc await
const promesa = getCar(23);
promesa.then(resolve => {console.log(resolve)})

promesa.then(model => getModel(model.model))
.then(data => {console.log(data)})

//async
async function showModel(){
    try{
        const car = await getCar(3)
        const model = await getModel(car.model)
        console.log(car)
        console.log(model)
    }
    catch(err){

    }
    
}
showModel()