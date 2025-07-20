//console.log(axios);
// 1. Lấy danh sách sinh viên và hiển thị lên bảng 
let getAllStaff = async () => {
    let res = await axios({
        url: `https://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien`,
        method: `GET`,
    })
    //console.log(res.data);
    document.querySelector('.card .card-body tbody').innerHTML = renderTableStaff(res.data);
}
getAllStaff();
let renderTableStaff = (arrStaff) => {
    let strHTML = '';
    for (let staff of arrStaff) {
        strHTML += `
            <tr>
                <td>${staff.maNhanVien}</td>
                <td>${staff.tenNhanVien}</td>
                <td>${staff.chucVu}</td>
                <td>${staff.heSoChucVu}</td>
                <td>${staff.luongCoBan}</td>
                <td>${staff.soGioLamTrongThang}</td>
                <td>
                    <button class="btn btn-danger mb-1" onclick="xoaStaff(${staff.maNhanVien})">Xóa</button>
                    <button class="btn btn-primary" onclick="suaStaff(${staff.maNhanVien})">Edit</button>    
                </td>
            </tr>
        `
    }
    return strHTML;
}
// 2. Thêm Nhân viên mới thông qua form , gửi dữ liệu lên API
document.querySelector('#btnThem').onclick = async (e) => {
    e.preventDefault();
    let staff = {};
    let arrInput = document.querySelectorAll('#employeeForm input,#employeeForm select');
    for (let tagInput of arrInput) {
        staff[tagInput.id] = tagInput.value;
    }
    //console.log(staff);
    try {
        let response = await axios({
            url: `https://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien`,
            method: 'POST',
            data:staff
        })
        //console.log('Kết quả',response.data);
        getAllStaff();
        alert('Đã thêm thành công');
    } catch (err) {
        console.log("lỗi",err);
        alert('Đã thêm thất bại');
    }
}
// 3. Sửa thông tin nhân viên: khi bấm nút "Cập nhật", cập nhật dữ liệu lên API.
    window.suaStaff = async (maStaff) =>{
        let res = await axios({
            url : `https://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${maStaff}`,
            method : "GET"
        });
        //console.log(res.data);
        let infoStaff = res.data;
        let arrInput = document.querySelectorAll('#employeeForm input,#employeeForm select ');
        for (let tagInput of arrInput)
            tagInput.value = infoStaff[tagInput.id];
        document.querySelector('#btnCapNhat').onclick = async (e)=>{
            e.preventDefault();
            let arrInput = document.querySelectorAll('#employeeForm input,#employeeForm select');
            let staffUpdate = {};
            for (let tagInput of arrInput){
                staffUpdate[tagInput.id] = tagInput.value;
            }
            //console.log(staffUpdate);
            try{
                let response = await axios({
                url :`https://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${maStaff}`,
                method : "PUT",
                data : staffUpdate
            })
            getAllStaff();
            alert("Đã cập nhật thành công");
            }catch(err){
                console.log("lỗi",err);
                alert("Đã cập nhật thất bại");
            }
        }
    }
// 4. Xóa nhân viên khỏi danh sách bằng API.
    window.xoaStaff = async (maStaff) =>{
        try{
            let response = await axios({
            url : `https://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${maStaff}`,
            method :"DELETE"
        })
        getAllStaff();
        alert("Đã xóa thành công");
        }catch(err){
            console.log("lỗi",err);
        }
    }
// 5. Hiển thị thông báo khi thao tác thành công/thất bại.


