
// Using fetch API (promise)
fetch('https://jsonplaceholder.typicode.com/users')
.then(response => response.json())
.then(data =>{
    const allTableData = document.getElementById('tableData').getElementsByTagName('tbody')[0];
           const Api = data.map(item => {
                return `<tr>
                        <td>${item.id}</td> 
                        <td>${item.name}</td>
                        <td>${item.username}</td>
                        <td>${item.email}</td>
                        </tr>`;
            });
            allTableData.innerHTML = Api.join('');
})
.catch(error => console.error('Error fetching data',error));


//<td><img src=${item.url} ></td>


// XML HTTPRequest(xhr)
// let xhr = new XMLHttpRequest();
// xhr.open("Get",'https://jsonplaceholder.typicode.com/users',"true");

// xhr.onload = function(){
//    if(xhr.status == 200){       //200 for resolve & 404 for rejected
//        console.log(JSON.parse(xhr.responseText));
//    }
//    else{
//     console.error("error");
//    }
// }
// xhr.send();








