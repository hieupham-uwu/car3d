document.addEventListener("DOMContentLoaded", () => {
  // 1. Lấy thẻ viewer từ HTML
  const viewer = document.querySelector("#car-viewer");
  const statusMsg = document.querySelector("#status-message");

  // 2. Hàm lấy tên model từ URL
  // Ví dụ: website.com/?t=vinfast (t là tên tham số)
  function getModelName() {
    const params = new URLSearchParams(window.location.search);
    // Lấy giá trị sau dấu ?model=...
    return params.get("model");
  }

  const modelName = getModelName();

  if (modelName) {
    // 3. Tạo đường dẫn file
    // Nếu file của bạn là đuôi .gld thì sửa thành: `model/${modelName}.gld`
    const filePath = `model/${modelName}.glb`;

    statusMsg.innerText = `Đang tải: ${modelName}...`;
    console.log("Đang set source:", filePath);

    // 4. Gán đường dẫn vào viewer (ĐÚNG CƠ CHẾ BẠN MUỐN)
    viewer.src = filePath;
  } else {
    statusMsg.innerText = "Lỗi: URL thiếu tên model (ví dụ: ?model=tenxe)";
  }

  // 5. Bắt sự kiện để biết khi nào tải xong hoặc lỗi
  viewer.addEventListener("load", () => {
    statusMsg.innerText = `Đã tải xong: ${modelName}`;
    console.log("Load thành công!");
  });

  viewer.addEventListener("error", (err) => {
    statusMsg.innerText = "Lỗi: Không tìm thấy file hoặc file hỏng.";
    console.error("Lỗi load model:", err);
  });
});
