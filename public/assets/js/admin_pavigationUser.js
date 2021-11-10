async function render(){
    try {
        let username = $("#search").val();
        const res = await $.ajax({
            url: "/admin/getUser",
            type: "POST",
            data: {
                username: username
            }
        })
        if(res.status == 200){
            const totalPage = Math.ceil(res.data.length / 6);
            $(".listBtn").html("")
            for (let i = 1; i <= totalPage; i++) {
                const btnPage = `
                <button onclick="changePage(${i})">${i}</button>
                `;
                $(".listBtn").append(btnPage)
            }
            const newdata = res.data.slice(0, 6)
            $('tbody').html("") 
            newdata.map((ele, index) =>{
                let item = `
                <tr>
                <td>${index + 1}</td>
                <td>${ele.username}</td>
                <td><span>******</span></td>
                <td>${ele.firstname}</td>
                <td>${ele.lastname}</td>
                <td>${ele.phone}</td>
                <td>${ele.gender}</td>
                <td>${ele.email}</td>
                <td>${ele.birthday}</td>
                <td>${new Date(ele.createdAt).toLocaleDateString()}</td>
                <td>${ele.role}</td>
                <td><a href="#${ele._id}" class="btn_delete" onclick="deleteUser('${ele._id}')">Delete</a></td>
                <td><a href="#${ele._id}" class="btn_user"  onclick="viewsUser('${ele._id}')">Views</a></td>
                <td><a href="#${ele._id}" class="btn_role"  onclick="changeRole('${ele._id}')">Role</a></td>
                <td><a href="/admin/userOrderDetail/${ele._id}" class="btn_order">views</a></td>
              </tr>
                `;

                             
                $('tbody').append(item)               
            })
         
        }
        
    } catch (error) {
        console.log(error);
    }
}

async function changePage(page){
    try {
        let username = $("#search").val();
        const res = await $.ajax({
            url: `/admin/pavigationUser?page=${page}`,
            type: "POST",
            data:{
                username: username
            }
        })
        if(res.status == 200){
            $('tbody').html("") 
            let newdata = res.data
            newdata.map((ele, index) =>{
                let item = `
                <tr>
                <td>${index + 1 + (page - 1)*6}</td>
                <td>${ele.username}</td>
                <td><span>******</span></td>
                <td>${ele.firstname}</td>
                <td>${ele.lastname}</td>
                <td>${ele.phone}</td>
                <td>${ele.gender}</td>
                <td>${ele.email}</td>
                <td>${ele.birthday}</td>
                <td>${new Date(ele.createdAt).toLocaleDateString()}</td>
                <td>${ele.role}</td>
                <td><a href="#${ele._id}" class="btn_delete" onclick="deleteUser('${ele._id}')">Delete</a></td>
                <td><a href="#${ele._id}" class="btn_user"  onclick="viewsUser('${ele._id}')">Views</a></td>
                <td><a href="#${ele._id}" class="btn_role"  onclick="changeRole('${ele._id}')">Role</a></td>
                <td><a href="/admin/userOrderDetail/${ele._id}" class="btn_order">views</a></td>
              </tr>
                `;

                             
                $('tbody').append(item)               
            })
        }
    } catch (error) {
        console.log(error);
    }

}

render()

