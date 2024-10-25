<?php
// Kết nối tới MySQL trên InfinityFree
$servername = "sql304.infinityfree.com"; // Địa chỉ server của bạn (có trong trang quản lý của InfinityFree)
$username = "if0_37315331"; // Tên người dùng MySQL của bạn
$password = "sieuvip417"; // Mật khẩu MySQL của bạn
$dbname = "if0_37315331_user_0"; // Tên cơ sở dữ liệu của bạn

// Tạo kết nối
$conn = new mysqli($servername, $username, $password, $dbname);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}

// Lấy dữ liệu từ form
$name = $_POST['name'];
$age = $_POST['age'];

// Chèn dữ liệu vào bảng
$sql = "INSERT INTO users (name, age) VALUES ('$name', '$age')";

if ($conn->query($sql) === TRUE) {
    echo "Dữ liệu đã được lưu thành công!";
} else {
    echo "Lỗi: " . $sql . "<br>" . $conn->error;
}

// Đóng kết nối
$conn->close();
?>
