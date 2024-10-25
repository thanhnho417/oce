<?php
// Kết nối tới MySQL
$servername = "sql304.infinityfree.com"; // Địa chỉ server của bạn
$username = "if0_37315331"; // Tên người dùng MySQL của bạn
$password = "sieuvip417"; // Mật khẩu MySQL của bạn
$dbname = "if0_37315331_user_0"; // Tên cơ sở dữ liệu của bạn

// Tạo kết nối
$conn = new mysqli($servername, $username, $password, $dbname);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}

// Lấy dữ liệu tìm kiếm từ form
$searchName = $_POST['name'];

// Truy vấn tìm kiếm dữ liệu
$sql = "SELECT * FROM users WHERE name LIKE '%$searchName%'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Hiển thị kết quả tìm kiếm
    echo "<h2>Kết quả tìm kiếm:</h2>";
    echo "<table border='1'>
            <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Tuổi</th>
                <th>Ngày đăng ký</th>
            </tr>";
    
    while($row = $result->fetch_assoc()) {
        echo "<tr>
                <td>" . $row["id"] . "</td>
                <td>" . $row["name"] . "</td>
                <td>" . $row["age"] . "</td>
                <td>" . $row["reg_date"] . "</td>
              </tr>";
    }
    echo "</table>";
} else {
    echo "Không tìm thấy kết quả nào.";
}

// Đóng kết nối
$conn->close();
?>
