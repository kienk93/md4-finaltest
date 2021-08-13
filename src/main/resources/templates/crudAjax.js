function showlist() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/cities",
        success: function (data) {
            let content = `<table class="table table-striped table-hover">
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Country</th>
            <th scope="col">Area</th>
            <th scope="col">Population</th>
            <th scope="col">Description</th>
            <th scope="col">GDP</th>
            <th scope="col" colspan="3">Action</th>
        </tr>
        </thead>`
            for (let i = 0; i < data.length; i++) {
                content += getListCity(data[i])

            }
            document.getElementById('city_list').innerHTML = content;
        }
    })
}

function getListCity(data) {
    return `<tr>
                      <th scope="row">${data.id}</th>
                      <td>${data.name}</td>
                      <td>${data.country.name}</td>
                      <td>${data.area}</td>
                      <td>${data.population}</td>
                      <td>${data.description}</td>
                      <td>${data.gdp}</td>
                      <td>
                 <button style="margin-right: 20px" onclick="editCity(${data.id})" type="button" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#modalEdit">
                    Edit
                </button>
                <button style=" margin-left: 20px" onclick="deleteCity(${data.id})"  type="button" class="btn btn-danger" >
                    Delete
                </button>
                <button style=" margin-left: 20px" onclick="viewCity(${data.id})"  type="button" class="btn btn-info" >
                    View
                </button>
                </td>
                </tr>
                `
}

function loadModalCity() {
    let content = `<!--Modal create-->
<div class="modal fade" id="modalCreate" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Add New Playlist</h5>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <a><label class="form-label">Name</label>
                        <input type="email" class="form-control" id="modalCreate__name" aria-describedby="emailHelp"></a>

                </div>
                <div class="mb-3">
                    <label class="form-label" >Country</label>
                    <label>
                        <select id="modalCreate__country">

                        </select>
                    </label>
                </div>
                <div class="mb-3">
                    <label class="form-label">Area</label>
                    <input type="text" class="form-control" id="modalCreate__area">
                </div>
                <div class="mb-3">
                    <label class="form-label">Population</label>
                    <input type="text" class="form-control" id="modalCreate__population">
                </div>
                <div class="mb-3">
                    <label class="form-label">GDP</label>
                    <input type="text" class="form-control" id="modalCreate__GDP">
                </div>
                <div class="mb-3">
                    <label class="form-label">description</label>
                    <input type="text" class="form-control" id="modalCreate__description">
                </div>
                
                
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" onclick="createCity()" id="createButton" class="btn btn-primary" data-bs-dismiss="modal">Create
                </button>
            </div>
        </div>
    </div>
</div>

<!--Modal edit-->
<div class="modal fade" id="modalEdit" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Edit City</h5>
            </div>
            <div class="modal-body">
                <form>
                    <input type="text" id="modalEdit__id" hidden>
                     <div class="mb-3">
                    <a><label class="form-label">Name</label>
                        <input type="email" class="form-control" id="modalEdit__name" aria-describedby="emailHelp"></a>

                </div>
                <div class="mb-3">
                    <label class="form-label" >Country</label>
                    <label>
                        <select id="modalEdit__country">

                        </select>
                    </label>
                </div>
                <div class="mb-3">
                    <label class="form-label">Area</label>
                    <input type="text" class="form-control" id="modalEdit__area">
                </div>
                <div class="mb-3">
                    <label class="form-label">Population</label>
                    <input type="text" class="form-control" id="modalEdit__population">
                </div>
                <div class="mb-3">
                    <label class="form-label">GDP</label>
                    <input type="text" class="form-control" id="modalEdit__GDP">
                </div>
                <div class="mb-3">
                    <label class="form-label">description</label>
                    <input type="text" class="form-control" id="modalEdit__description">
                </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" id="updateButton" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
            </div>
        </div>
    </div>
</div>`
    document.getElementById('modal').innerHTML = content;
}

function createCity() {
    let name = $('#modalCreate__name').val();
    let country = $('#modalCreate__country').val();
    let area = $('#modalCreate__area').val();
    let population = $('#modalCreate__population').val();
    let gdp = $('#modalCreate__GDP').val();
    let description = $('#modalCreate__description').val();
    let newCity = {
        name: name,
        country: {
            id: country
        },
        area: area,
        population: population,
        gdp: gdp,
        description: description,


    }
    $.ajax({
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "POST",
        url: "http://localhost:8080/cities",
        data: JSON.stringify(newCity),
        success: function (){
            showlist(),
                resetForm()
        }

    })

    event.preventDefault();
}

function getCountry() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/countries",
        success: function (data) {
            let content = ``;
            for (let i = 0; i < data.length; i++) {
                content += `<option value=${data[i].id} >${data[i].name} </option>`;
            }
            document.getElementById('modalCreate__country').innerHTML = content;
            document.getElementById('modalEdit__country').innerHTML = content;
        }
    })
}

function editCity(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/cities/" + id,
        success: function (data) {
            $('#modalEdit__id').val(data.id);
            $('#modalEdit__name').val(data.name);
            $('#modalEdit__country').val(data.country.id);
            $('#modalEdit__area').val(data.area);
            $('#modalEdit__population').val(data.population);
            $('#modalEdit__GDP').val(data.gdp);
            $('#modalEdit__description').val(data.description);
            $('#updateButton').click(function (event) {
                let name = $('#modalEdit__name').val();
                let country = $('#modalEdit__country').val();
                let area = $('#modalEdit__area').val();
                let population = $('#modalEdit__population').val();
                let gdp = $('#modalEdit__GDP').val();
                let description = $('#modalEdit__description').val();
                let newCity = {
                    id:id,
                    name: name,
                    country: {
                        id: country
                    },
                    area: area,
                    population: population,
                    gdp: gdp,
                    description: description,
                }
                $.ajax({
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type:"PUT",
                    url:"http://localhost:8080/cities/" +id,
                    data:JSON.stringify(newCity),
                    success:showlist,
                    error:showlist
                })
                event.preventDefault()
            })
        }
    })
}
function resetForm() {
    document.getElementById('modalCreate__name').value = ""
    document.getElementById('modalCreate__country').value = "1"
    document.getElementById('modalCreate__area').value = ""
    document.getElementById('modalCreate__population').value = ""
    document.getElementById('modalCreate__GDP').value = ""
    document.getElementById('modalCreate__description').value = ""
}
function deleteCity(id){
    $.ajax({
        type:"DELETE",
        url:"http://localhost:8080/cities/" +id,
        success:showlist,

    })
}

function viewCity(id){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/cities/" + id,
        success:function (data) {
            let content = `
                      <h1>${data.name}</h1>
                      <p>Tên:${data.country.name}</p>
                      <p>Diện tích:${data.area}</p>
                      <p>Dân số:${data.population}</p>
                      <p>Mô tả:${data.description}</p>
                     <p>GDP:${data.gdp}</p>
                    `
            document.getElementById('city_view').innerHTML = content;
        }
    })

}
// function search(){
//     let str = $('searchKey').val()
//     $.ajax({
//         type:"GET",
//         url:"http://localhost:8080/cities/search?name=" +str,
//         success: function (data){
//             console.log(data)
//             let content = `<table class="table table-striped table-hover">
//         <thead>
//         <tr>
//             <th scope="col">Id</th>
//             <th scope="col">Name</th>
//             <th scope="col">Country</th>
//             <th scope="col">Area</th>
//             <th scope="col">Population</th>
//             <th scope="col">Description</th>
//             <th scope="col">GDP</th>
//             <th scope="col" colspan="2">Action</th>
//         </tr>
//         </thead>`
//             for (let i = 0; i < data.length; i++) {
//                 content += getListCity(data[i])
//
//             }
//             document.getElementById('city_list').innerHTML = content;
//         },
//         error: showlist
//     })
// }